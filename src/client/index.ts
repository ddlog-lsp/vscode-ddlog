import * as lspClient from "vscode-languageclient";
import * as vscode from "vscode";

export async function launch(context: vscode.ExtensionContext): Promise<lspClient.LanguageClient> {
  const run: lspClient.Executable = {
    command: "ddlog-lsp-server",
  };

  const debug: lspClient.Executable = {
    command: "ddlog-lsp-server",
    options: {
      env: {
        RUST_LOG: "info",
        ...process.env,
      },
    },
  };

  const serverOptions: lspClient.ServerOptions = { debug, run };
  const clientOptions: lspClient.LanguageClientOptions = {
    diagnosticCollectionName: "ddlog-lsp-server",
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

  const session = languageClient.start();
  context.subscriptions.push(session);

  await languageClient.onReady();

  return languageClient;
}
