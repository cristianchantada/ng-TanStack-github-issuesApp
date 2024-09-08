import { sleep } from "@helpers/index";
import { GitHubLabel } from "../interfaces";
import { environment } from "src/environments/environment.development";

const BASE_URL = environment.baseUrl;
const GITHUB_TOKEN = environment.gitHubToken;

export const getLabels = async (): Promise<GitHubLabel[]> => {

  await sleep(1500);

  try {

    const resp = await fetch(`${BASE_URL}/labels`, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
      }
    });

    if(!resp.ok) throw 'Can not load labels';

    const labels: GitHubLabel[] = await resp.json();

    return labels;
  } catch (error) {
    throw 'Can not load labels';
  }

}