
const host = "http://localhost:3000/";

type ApiUrlsWrapper = {
    readonly login: string;
    readonly users: string;
    readonly genres: string;
    readonly bookStorage: string;
    readonly preferBook: string;
}

export const ApiUrls: ApiUrlsWrapper = {
    login: host.concat("login"),
    users: host.concat("users"),
    genres: host.concat("genres"),
    bookStorage: host.concat("bookStorage"),
    preferBook: host.concat("preferBook")
}