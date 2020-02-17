import * as vscode from "vscode";
import { getClient } from "../client/client";
import { parseUri } from "./scheme";

export class WorkflowStepLogProvider
  implements vscode.TextDocumentContentProvider {
  onDidChangeEmitter = new vscode.EventEmitter<vscode.Uri>();
  onDidChange = this.onDidChangeEmitter.event;

  async provideTextDocumentContent(uri: vscode.Uri): Promise<string> {
    const { owner, repo, jobId } = parseUri(uri);

    const client = await getClient();
    const result = await client.actions.listWorkflowJobLogs({
      owner: owner,
      repo: repo,
      job_id: jobId
    });

    return result.data;
  }
}
