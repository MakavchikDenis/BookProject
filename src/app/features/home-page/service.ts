import { signal } from "@angular/core";
import { ApiCoreService } from "../../core/services/api-core.service";
import { Book } from "../../shared/models/book";
import { AppSignalService } from "../../core/services/app-signal.service";
import { MessageKind } from "../../shared/other/messag-snack-bar";
import { HttpParams } from "@angular/common/http";
import { map, switchMap } from "rxjs";
import { Preference } from "../../shared/models/preference";
import { ApiUrls } from "../../shared/other/api-url";



export class Service {

    httpServise: ApiCoreService
    appSignalService: AppSignalService


    constructor(http: ApiCoreService, signalService: AppSignalService) {
        this.httpServise = http;
        this.appSignalService = signalService;
    }

    private SimpleRequest(referenceSigBooks: any, referenceSigAuthor: any) {
        this.httpServise.getAllData(ApiUrls.bookStorage).
            pipe(map(x => x)).subscribe({
                next: (x) => {
                    referenceSigBooks.set(x);
                    //console.log(referenceSigBooks());referenceSigAuthor.set((referenceSigBooks() as Book[]).map<string>(x => x.author));
                    let array = (referenceSigBooks() as Book[]).map<string>(x => x.author);
                    referenceSigAuthor.set(array.filter((element, i) => i === array.indexOf(element)));
                },
                error: (err) => {
                    console.log(err);
                    this.appSignalService?.snackBar.set([MessageKind.Error])
                }
            })
    }

    private RequestWithParam(url: string, param: [string, string], referenceSigBooks: any) {
        let params = new HttpParams().set(param[0], param[1]);
        this.httpServise.getByCondition(url, params).
            pipe(map(x => x))
            .subscribe({
                next: (x: any) => {
                    referenceSigBooks.set(x);
                    console.log(referenceSigBooks());
                },
                error: (err) => {
                    console.log(err);
                    this.appSignalService.snackBar.set([MessageKind.Error])
                }
            })
    }


    BaseRequest(referenceSigBooks: any, referenceSigAuthor: any, userId?: string) {
        if (userId != undefined) {
            let params = new HttpParams().set("userId", userId);
            this.httpServise.getByCondition(ApiUrls.preferBook, params)
                .pipe(map(x => {
                    console.log(x[0].books);
                    return x[0].books
                }),
                    switchMap(result => {
                        console.log(result);
                        return this.httpServise.getAllData(ApiUrls.bookStorage)
                            .pipe(map((x: Book[]) => x.map(z => { result.includes(z.id) ? z.prefer = true : false; return z })))
                    }))
                .subscribe({
                    next: (x: any) => {
                        console.log(x);
                        referenceSigBooks.set(x)
                        let array = (referenceSigBooks() as Book[]).map<string>(x => x.author);
                        referenceSigAuthor.set(array.filter((element, i) => i === array.indexOf(element)));
                    },
                    error: (err) => {
                        //console.log(err);
                        this.appSignalService?.snackBar.set([MessageKind.Error])
                    }
                });
        }
        else {
            this.SimpleRequest(referenceSigBooks, referenceSigAuthor);
        }
    }



    RequestWithParamExtension(param: [string, string], referenceSigBooks: any, userId?: string) {
        if (userId != undefined) {
            let params = new HttpParams().set("userId", userId);
            this.httpServise.getByCondition(ApiUrls.preferBook, params)
                .pipe(map(x => {
                    console.log(x[0].books);
                    return x[0].books
                }),
                    switchMap(result => {
                        return this.httpServise.getByCondition(ApiUrls.bookStorage, new HttpParams().set(param[0], param[1]))
                            .pipe(map((x: Book[]) => x.map(z => { result.includes(z.id) ? z.prefer = true : false; return z })))
                    }))
                .subscribe({
                    next: (x: any) => {
                        console.log(x);
                        referenceSigBooks.set(x)
                    },
                    error: (err) => {
                        //console.log(err);
                        this.appSignalService?.snackBar.set([MessageKind.Error])
                    }
                });
        }
        else {
            this.RequestWithParam(ApiUrls.bookStorage, param, referenceSigBooks);
        }
    }

    UserPreferencesRequest(referenceSigBooks: any, userId?: string) {
        let params = new HttpParams().set("userId", userId ?? "");
        this.httpServise.getByCondition(ApiUrls.preferBook, params)
            .pipe(map(x => {
                //console.log(x[0].books);
                return x[0].books
            }),
                switchMap(result => {
                    return this.httpServise.getAllData(ApiUrls.bookStorage)
                        .pipe(map((x: Book[]) => x.filter(z => result.includes(z.id))),
                            map((x: Book[]) => x.map(z => { z.prefer = true; return z })))
                }))
            .subscribe({
                next: (x: any) => {
                    //console.log(x);
                    referenceSigBooks.set(x)
                },
                error: (err) => {
                    //console.log(err);
                    this.appSignalService?.snackBar.set([MessageKind.Error])
                }
            });
    }

    UpdatePreferencesRequest(activity: boolean, bookId: string, referenceSigBooks: any, referenceSigAuthor: any,userId?: string) {
        let params = new HttpParams().set("userId", userId ?? "");
        this.httpServise.getByCondition(ApiUrls.preferBook, params).
            pipe(map(x => (x[0] as Preference)),
                switchMap(res => {
                    console.log(res); 
                    if (activity == true) {
                        res.books.push(bookId);
                    }
                    else {
                        let array = res.books.filter(x => x != bookId);
                        res.books = array;
                    }
                    return this.httpServise.editData(ApiUrls.preferBook + "/" + res.id, res);
                })).
            subscribe({
                next: (x) => {
                    console.log(x);
                    this.BaseRequest(referenceSigBooks, referenceSigAuthor, userId);
                },
                error: (err) => {
                    console.log(err);
                    this.appSignalService?.snackBar.set([MessageKind.Error])
                }
            })
    }

    DeleteItemRequest(bookId: string, referenceSigBooks: any, referenceSigAuthor:any,userId?: string,){
        this.httpServise.deleteData(ApiUrls.bookStorage, bookId)
        .subscribe({
            next:()=>{
                this.BaseRequest(referenceSigBooks,referenceSigAuthor,userId);
            },  
            error: (err) => {
                console.log(err);
                this.appSignalService?.snackBar.set([MessageKind.Error])
            }  
        })
    }

}