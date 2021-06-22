import { Octokit } from "@octokit/core";

export const getGithubUser = async (token) => {
  const octokit = new Octokit({ auth: `${token}` });
  return await octokit.request("GET /user");
};
