import {Octokit, App} from "octokit";
import {OctokitResponse} from "@octokit/types/dist-types/OctokitResponse";
import Pull from "./domain/pull";

export default class GithubClient {
    #client: Octokit
    #owner: string
    #repo: string


    constructor(owner: string, repo: string) {

        this.#owner = owner
        this.#repo = repo
        this.#client = new Octokit({auth: process.env.GITHUB_TOKEN});
    }

    public async getAllPRs(): Promise<Pull[]> {
        let pullsData: any[] = []
        let pageCount = 1
        while (true) {
            const response = await this.#client.rest.pulls.list({
                owner: this.#owner,
                repo: this.#repo,
                state: "all",
                per_page: 100,
                page: pageCount,
                timeZone: 'Asia/Tokyo'

            })

            const pullDomains = response.data.map((pull) => {
                const reviewers = (pull.requested_reviewers === null || pull.requested_reviewers === undefined) ? [] : pull.requested_reviewers.map((reviewers) => reviewers.login)
                return new Pull(pull.number, pull.body, pull.merged_at, pull.created_at, pull.updated_at, pull.state, reviewers as string[], pull.title, this.#repo)
            })

            pullsData = [...pullsData, ...pullDomains]

            if (response.data.length !== 100) {
                break
            }
            pageCount++
        }
        return pullsData as Pull[]
    }
}



