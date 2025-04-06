import { signal } from "@angular/core";
import { ApiCoreService } from "../../core/services/api-core.service";
import { Book } from "../../shared/models/book";
import { ContentConfig } from "./content-config";
import { AppSignalService } from "../../core/services/app-signal.service";
import { MessageKind } from "../../shared/other/messag-snack-bar";
import { HttpParams } from "@angular/common/http";
import { map, switchMap } from "rxjs";



export class Service {

    httpServise: ApiCoreService
    appSignalService: AppSignalService


    constructor(http: ApiCoreService, signalService: AppSignalService) {
        this.httpServise = http;
        this.appSignalService = signalService;
    }


    SimpleRequest(urlMainStorage: string, referenceSigBooks: any, referenceSigAuthor: any, referenceSigNameBooks: any) {
        this.httpServise.getAllData(urlMainStorage).
            pipe(map(x => x)).subscribe({
                next: (x) => {
                    referenceSigBooks.set(x);
                    console.log(referenceSigBooks());
                    referenceSigAuthor.set((referenceSigBooks() as Book[]).map<string>(x => x.author));
                    console.log(referenceSigAuthor());
                    referenceSigNameBooks.set((referenceSigBooks() as Book[]).map<string>(x => x.name));
                    console.log(referenceSigNameBooks());
                },
                error: (err) => {
                    console.log(err);
                    this.appSignalService?.snackBar.set([MessageKind.Error])
                }
            })
    }

    RequestWithParam(url: string, param: [string, string], referenceSigBooks: any) {
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

    UserPreferencesRequest(urlPreferSource: string, urlMainStorage: string, referenceSigBooks: any, userId: string) {
        let params = new HttpParams().set("userId", userId);
        this.httpServise.getByCondition(urlPreferSource, params)
            .pipe(map(x => {
                console.log(x[0].books);
                return x[0].books
            }),
                switchMap(result => {
                    return this.httpServise.getAllData(urlMainStorage)
                        .pipe(map((x: Book[]) => x.filter(z => result.includes(z.id))),
                        map((x:Book[])=>x.map(z=>{z.prefer=true;return z})))         
                }))
            .subscribe({
                next: (x: any) => {
                    console.log(x);
                    referenceSigBooks.set(x)
                },
                error: (err) => {
                    console.log(err);
                    this.appSignalService?.snackBar.set([MessageKind.Error])
                }
            });
    }

    EntityPreferencesRequest(urlPreferSource:string, userId:string,referencePreferUser:any){
        let params = new HttpParams().set("userId", userId);
        this.httpServise.getByCondition(urlPreferSource,params).
            pipe(map(x => x)).subscribe({
                next: (x) => {
                    referencePreferUser = x;    
                    console.log(referencePreferUser);
                },
                error: (err) => {
                    console.log(err);
                    this.appSignalService?.snackBar.set([MessageKind.Error])
                }
            })
    }
}