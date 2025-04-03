
const host="http://localhost:3000/";

type ApiUrlsWrapper={
       readonly users: string;
       readonly genres: string;
       readonly bookStorage:string;
       readonly preferBook:string;
}

export const ApiUrls:ApiUrlsWrapper={
    users:host.concat("users"),
    genres:host.concat("genres"),
    bookStorage:host.concat("genres"),
    preferBook:host.concat("preferBook")
}