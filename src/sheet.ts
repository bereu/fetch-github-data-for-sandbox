import {google, sheets_v4} from "googleapis"
import Pull from "./domain/pull";


export default class Sheet {


    #sheets: sheets_v4.Sheets
    #auth: any

    constructor() {
        const SCOPES = ['https://www.googleapis.com/auth/spreadsheets']


        const auth = new google.auth.GoogleAuth({
            keyFile: 'service.json',
            scopes: SCOPES,
        });

        this.#sheets = google.sheets({
            version: "v4",
            auth: auth
        })


    }

    async writePulls(pulls: Pull[]) {

        const header = ["repo_name",
            "PRNumber", "state", "title", "description", "CreatedAt", "UpdatedAt"
            , "MergedAt"
            , "reviewers"
        ]

        const valueList = pulls.map((pull) => {
            return [
                pull.repo_name,
                pull.PRNumber, pull.state, pull.title,
                pull.description,
                pull.CreatedAt.format("YYYY-MM-DD HH:mm:ss"),
                pull.UpdatedAt.format("YYYY-MM-DD HH:mm:ss"),
                pull.MergedAt ? pull.MergedAt.format("YYYY-MM-DD HH:mm:ss") : null,
                pull.reviewers]
        })

        await this.#sheets.spreadsheets.values.append({
            spreadsheetId: process.env.SPREADSGEET_ID,
            range: "A:Z",
            valueInputOption: "USER_ENTERED",
            requestBody: {
                values: [header, ...valueList],
            },
        })
    }

    async reset() {
        await this.#sheets.spreadsheets.values.clear({
                spreadsheetId: process.env.SPREADSGEET_ID,
                range: "A:Z"
            }
        )
    }

}
