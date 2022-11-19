import {Octokit, App} from "octokit";

export default class GithubClient {
    #client: Octokit
    #owner: string
    #repo: string


    constructor(owner: string, repo: string) {

        this.#owner = owner
        this.#repo = repo
        this.#client = new Octokit({auth: process.env.GITHUB_TOKEN});
    }

    public async getAllPRs() {
        return await this.#client.rest.pulls.list({
            owner: this.#owner,
            repo: this.#repo
        })
    }

}



