/* --------------------------------------------------------------------------------------------
 * Copyright (c) Chris Hansen. All rights reserved.
 * Licensed under the MIT License. See License.md in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
const cp = require('child_process')
const https = require('https')
const {AutoLanguageClient} = require('atom-languageclient')

async function checkVersion() {
  async function checkVersionLocal(rec_ver_str="1.7.2") {
    function compareSymantic(ver, rec_ver) {
      for (var index = 0; index < rec_ver.length; ++index) {
        if (parseInt(ver[index]) < parseInt(rec_ver[index])) {
          return true
        } else if (parseInt(ver[index]) > parseInt(rec_ver[index])) {
          return false
        }
      }
      return false
    }
    const childProcess = cp.spawn(atom.config.get("ide-rql.rqllsPath"), ["--version"])
    childProcess.stdout.on('data', (data) => {
      let ver_str = data.toString().trim()
      if (compareSymantic(ver_str.split("."), rec_ver_str.split("."))) {
        atom.notifications.addWarning(`IDE-Fortran: A newer version (${rec_ver_str}) of "rqlls" is available.`,
        {
          dismissable: true,
          buttons: [{
            text: "Disable warning",
            onDidClick: () => atom.workspace.open("atom://config/packages/ide-rql")
          }],
          description: "Please update `rql-language-server` on your system. You may disable this warning in settings."
        })
      }
    })
  }
  https.get('https://pypi.org/pypi/rql-language-server/json', (resp) => {
    let data = ''
    // A chunk of data has been recieved
    resp.on('data', (chunk) => { data += chunk } )
    // The whole response has been received, check version
    resp.on('end', () => {
      try {
        let package_data = JSON.parse(data)
        checkVersionLocal(package_data.info.version)
      } catch (e) {
        checkVersionLocal()
      }
    })
  }).on("error", (err) => { checkVersionLocal() } )
}

class FortranLanguageClient extends AutoLanguageClient {
  getGrammarScopes () { return [ 'source.rql.free', 'source.rql.fixed', 'source.rql' ] }
  getLanguageName () { return 'RQL' }
  getServerName () { return 'rqlls' }
  /*
  getGrammarScopes () { return [ 'source.rql.free', 'source.rql.fixed' ] }
  getLanguageName () { return 'Fortran' }
  getServerName () { return 'rqlls' }
  */

  constructor(serializedState) {
    super(serializedState)
    if (atom.config.get("ide-rql.displayVerWarning")) { checkVersion() }
  }

  async startServerProcess (projectPath) {
    if (atom.config.get("ide-rql.debug")) { atom.notifications.addInfo("IDE-Fortran: Starting rqlls") }
    let args = []
    if (!atom.config.get("ide-rql.include_symbol_mem")) { args.push("--symbol_skip_mem") }
    if (atom.config.get("ide-rql.incremental_sync")) { args.push("--incrmental_sync") }
    if (!atom.config.get("ide-rql.autocomplete_prefix")) { args.push("--autocomplete_no_prefix") }
    if (atom.config.get("ide-rql.lowercase_intrinsics")) { args.push("--lowercase_intrinsics") }
    if (atom.config.get("ide-rql.use_signature_help")) { args.push("--use_signature_help") }
    if (atom.config.get("ide-rql.variable_hover")) { args.push("--variable_hover") }
    if (atom.config.get("ide-rql.notify_init")) { args.push("--notify_init") }
    const childProcess = cp.spawn(atom.config.get("ide-rql.rqllsPath"), args,
    {
      cwd: projectPath
    })
    childProcess.on("error", err =>
      atom.notifications.addError("Unable to start the Fortran language server.",
      {
        dismissable: true,
        buttons: [{
          text: "Install Instructions",
          onDidClick: () => atom.workspace.open("atom://config/packages/ide-rql")
        }],
        description: "This can occur if you do not have Python installed or if it is not in your path.\n\n Also, make sure to install `rqlls` by running:\n```\npip install rql-language-server\n```"
      })
    )
    childProcess.on('exit', exitCode => {
      if (exitCode == 0 || exitCode == null) {
        if (atom.config.get("ide-rql.debug")) { atom.notifications.addInfo("IDE-Fortran: Stopping rqlls") }
      } else {
        atom.notifications.addError('IDE-Fortran: language server stopped unexpectedly.',
        {
          dismissable: true,
          description: this.processStdErr != null ? `<code>${this.processStdErr}</code>` : `Exit code ${exitCode}`
        })
      }
    })
    if (atom.config.get("ide-rql.debug")) {
      childProcess.stderr.on('data', (data) => {
        console.log(`SERVER(rqlls)-stderr: ${data}`);
      })
    }
    return childProcess
  }
}

module.exports = new FortranLanguageClient()
