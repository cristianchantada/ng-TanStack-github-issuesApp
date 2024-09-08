import { sleep } from "@helpers/sleep";
import { environment } from "src/environments/environment.development";
import { GitHubIssue } from "../interfaces";

const BASE_URL = environment.baseUrl;
const GITHUB_TOKEN = environment.gitHubToken;

export const getIssueCommentsByNumber = async (issueNumber: string): Promise<GitHubIssue[]> => {

  await sleep(1500);

  try {
    const resp = await fetch(`${BASE_URL}/issues/${issueNumber}/comments`, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
      }
    });

    if(!resp.ok) throw 'Can not load issue';

    const issue: GitHubIssue[] = await resp.json();

    return issue;
  } catch (error) {
    throw `Can not load issue ${issueNumber}`;
  }

}