import * as lspClient from "vscode-languageclient/node";
import * as vscode from "vscode";

export async function launch(context: vscode.ExtensionContext): Promise<lspClient.LanguageClient> {
  const run: lspClient.Executable = {
    command: "ddlog-lsp",
  };
  const debug: lspClient.Executable = {
    command: "ddlog-lsp",
    options: {
      env: {
        RUST_BACKTRACE: 1,
        RUST_LOG: "info",
        ...process.env,
      },
    },
  };
  const serverOptions: lspClient.ServerOptions = { debug, run };
  const clientOptions: lspClient.LanguageClientOptions = {
    diagnosticCollectionName: "ddlog-lsp",
    documentSelector: [
      { language: "ddlog.dat", scheme: "file" },
      { language: "ddlog.dat", scheme: "untitled" },
      { language: "ddlog.dl", scheme: "file" },
      { language: "ddlog.dl", scheme: "untitled" },
    ],
    synchronize: {
      fileEvents: [
        vscode.workspace.createFileSystemWatcher("**/*.dat"),
        vscode.workspace.createFileSystemWatcher("**/*.dl"),
      ],
    },
  };
  const languageClient = new lspClient.LanguageClient(
    "ddlog-lsp-server",
    "DDlog Language Server",
    serverOptions,
    clientOptions,
  );
  languageClient.registerProposedFeatures();
  const session = languageClient.start();
  context.subscriptions.push(session);
  await languageClient.onReady();
  return languageClient;
}
