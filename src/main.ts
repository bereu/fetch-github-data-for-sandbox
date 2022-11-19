import * as dotenv from 'dotenv'
import GithubClient from "./github";


async function main() {
    const result = dotenv.config()
    console.log(result.parsed);

    if (process.env.REPO_OWNER === undefined) {
        console.error("owner is not defined")
        return
    }

    if (process.env.REPO_NAME_1 === undefined) {
        console.error("repo_name1 is not defined")
        return
    }

    const repo1 = new GithubClient(process.env.REPO_OWNER, process.env.REPO_NAME_1)
    const repoPRs = await repo1.getAllPRs()

    console.log(repoPRs);

    console.log("end")

}

main()


