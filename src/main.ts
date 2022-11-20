import * as dotenv from 'dotenv'
import GithubClient from "./github";
import Sheet from "./sheet";


async function main() {
    dotenv.config()

    if (process.env.REPO_OWNER === undefined) {
        console.error("owner is not defined")
        return
    }

    if (process.env.REPO_NAME_1 === undefined) {
        console.error("repo_name1 is not defined")
        return
    }
    if (process.env.REPO_NAME_2 === undefined) {
        console.error("repo_name1 is not defined")
        return
    }
    if (process.env.REPO_NAME_3 === undefined) {
        console.error("repo_name1 is not defined")
        return
    }

    const repo1 = new GithubClient(process.env.REPO_OWNER, process.env.REPO_NAME_1)
    const repo2 = new GithubClient(process.env.REPO_OWNER, process.env.REPO_NAME_2)
    const repo3 = new GithubClient(process.env.REPO_OWNER, process.env.REPO_NAME_3)
    const repoPRs1 = await repo1.getAllPRs()
    const repoPRs2 = await repo2.getAllPRs()
    const repoPRs3= await repo3.getAllPRs()

    const sheet = new Sheet()
    await sheet.reset()
    await sheet.writePulls([...repoPRs1,...repoPRs2,...repoPRs3 ])

    console.log("end")
}

main()


