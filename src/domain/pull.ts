import dayjs from "dayjs";

export default class Pull {
    #PRNumber: Number
    #description: string | null
    private readonly _MergedAt: dayjs.Dayjs | null
    private readonly _CreatedAt: dayjs.Dayjs
    private readonly _UpdatedAt: dayjs.Dayjs
    #state: string
    #reviewers: string[]
    #title: string
    #repo_name: string


    constructor(PRNumber: Number, description: string | null, MergedAt: string | null, CreatedAt: string, UpdatedAt: string, state: string, reviewers: string[], title: string, repo_name: string) {
        this.#PRNumber = PRNumber;
        this.#description = description;
        this._MergedAt = MergedAt ? dayjs(MergedAt) : null;
        this._CreatedAt = dayjs(CreatedAt);
        this._UpdatedAt = dayjs(UpdatedAt);
        this.#state = state;
        this.#reviewers = reviewers;
        this.#title = title
        this.#repo_name = repo_name
    }


    get PRNumber(): Number {
        return this.#PRNumber;
    }

    get description(): string | null {
        return this.#description;
    }

    get MergedAt(): dayjs.Dayjs | null {
        return this._MergedAt;
    }

    get CreatedAt(): dayjs.Dayjs {
        return this._CreatedAt;
    }

    get UpdatedAt(): dayjs.Dayjs {
        return this._UpdatedAt;
    }

    get state(): string {
        return this.#state;
    }

    get reviewers(): string {
        console.log(this.#reviewers);

        return this.#reviewers.join();
    }

    get title(): string {
        return this.#title;
    }

    get repo_name(): string {
        return this.#repo_name;
    }
}
