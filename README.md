<div align="center">
  <h1>vscode-ddlog</h1>
  <p style="margin-bottom: 0.5ex;">
    <a href="https://github.com/ddlog-lsp/vscode-ddlog/actions"><img
        src="https://img.shields.io/github/workflow/status/ddlog-lsp/vscode-ddlog/main?logo=github" /></a>
    <img src="https://img.shields.io/badge/code->=1.43.0-success?logo=visual-studio-code" />
  </p>
  <p style="margin-bottom: 1.5ex;">
    <img src="https://img.shields.io/badge/TypeScript-typed-informational?logo=typescript" />
    <img src="https://img.shields.io/badge/ESlint-checked-informational?logo=eslint" />
    <img src="https://img.shields.io/badge/Prettier-formatted-informational?logo=prettier" />
  </p>
  <strong>Visual Studio Code client for the DDlog language server</strong>
</div>

## Status

The client extension is still in an early state. It is usable but many advanced features have not yet been implemented. The syntax highlighting is also incomplete.

## Usage

The client extension has not yet had a stable release. You can build and install it locally if you would like to experiment with it in the meantime.

### Installing the Client Extension

First ensure that you have the [node toolchain](https://nodejs.org/en/download/) installed, then proceed as follows:

```bash
git clone https://github.com/ddlog-lsp/vscode-ddlog
cd vscode-ddlog
npm i -g vsce
npm ci
vsce package
```

This will produce a `vscode-ddlog-<version>.vsix` file in the project root.

Next, open Code and show the command palette (`CTRL+SHIFT+P` or `CMD+SHIFT+P`) and type `install`, then select `Extensions: Install from VSIX...` from the list. Point the file selector to the previously generated `vscode-ddlog-<version>.vsix`. Finally, hit the `reload` button when prompted.
