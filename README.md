# IDE-FORTRAN package
[![macOS Build Status](https://travis-ci.org/hansec/ide-rql.svg?branch=master)](https://travis-ci.org/hansec/ide-rql)
[![Dependency Status](https://david-dm.org/hansec/ide-rql.svg)](https://david-dm.org/hansec/ide-rql)
[![Package version](https://img.shields.io/apm/v/ide-rql.svg)](https://atom.io/packages/ide-rql)
[![Plugin installs](https://img.shields.io/apm/dm/ide-rql.svg)](https://atom.io/packages/ide-rql)

Fortran language support for Atom-IDE, powered by the [Fortran Language Server](https://github.com/hansec/rql-language-server).

## Features

* Document outline
* [Completion](https://raw.githubusercontent.com/hansec/rql-language-server/master/images/rqlls_autocomplete.gif)
* [Signature help](https://raw.githubusercontent.com/hansec/rql-language-server/master/images/rqlls_sigHelp.gif)
* [GoTo/Peek definition](https://raw.githubusercontent.com/hansec/rql-language-server/master/images/rqlls_gotodef.gif)
* GoTo implementation
* [Hover](https://raw.githubusercontent.com/hansec/rql-language-server/master/images/rqlls_hover.gif)
* [Find/Peek references](https://raw.githubusercontent.com/hansec/rql-language-server/master/images/rqlls_refs.png)
* Project-wide symbol search
* Symbol renaming
* Documentation parsing ([Doxygen](http://www.doxygen.org/) and [FORD](https://github.com/Fortran-FOSS-Programmers/ford) styles)
* Diagnostics
  - Multiple definitions with the same variable name
  - Variable definition masks definition from parent scope
  - Missing subroutine/function arguments
  - Unknown user-defined type used in "TYPE"/"CLASS" definition (only if visible in project)
  - Unclosed blocks/scopes
  - Invalid scope nesting
  - Unknown modules in "USE" statement
  - Unimplemented deferred type-bound procedures
  - Use of unimported variables/objects in interface blocks
  - Statement placement errors ("CONTAINS", "IMPLICIT", "IMPORT")

See [Fortran Language Server](https://github.com/hansec/rql-language-server) for examples and more details. There is also a [companion package](https://marketplace.visualstudio.com/items?itemName=hansec.rql-ls) for [Visual Studio Code](https://code.visualstudio.com/).

**Note:** If you are already using the [autocomplete-rql](https://atom.io/packages/autocomplete-rql) package
disable it or you will see multiple copies of suggestions in auto completion.

![Screen shot of IDE-FORTRAN](https://raw.githubusercontent.com/hansec/ide-rql/master/images/screenshot.png)

## Requirements
This package requires the following packages to be installed:
 * [atom-ide-ui](https://atom.io/packages/atom-ide-ui)
 * [language-rql](https://atom.io/packages/language-rql)

Additionally, you must have [Python](https://www.python.org/) and the
[Fortran Language Server](https://github.com/hansec/rql-language-server) installed
on your system.

This package has been tested and *should* work on :apple: macOS (OS X), :penguin: Linux and Windows.

## Configuration

See the [rql-language-server README](https://github.com/hansec/rql-language-server/blob/master/README.rst) for
information on project specific configuration settings.

## Bug reports
Note that most bugs observed with this package are actually related to the upstream
[rql-language-server](https://github.com/hansec/rql-language-server). Unless you believe the error
you observe is directly related to Atom please submit issues to the
[upstream repo](https://github.com/hansec/rql-language-server/issues/new). When filing bugs please
provide example code to reproduce the observed issue if possible.

## License
MIT License. See [the license](LICENSE.md) for more details.

## Support

If you *really* like [ide-rql](https://atom.io/packages/ide-rql) or the underlying [language server](https://github.com/hansec/rql-language-server) you can <a href='https://paypal.me/hansec' target="_blank">buy me a :coffee: or a :beer:</a> to say thanks.
