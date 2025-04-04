import { signal } from "@angular/core";
import { ApiCoreService } from "../../core/services/api-core.service";
import { Book } from "../../shared/models/book";
import { ContentConfig } from "./content-config";
import { AppSignalService } from "../../core/services/app-signal.service";
import { MessageKind } from "../../shared/other/messag-snack-bar";
import { toSignal } from '@angular/core/rxjs-interop';
import { HttpParams } from "@angular/common/http";
import { ApiUrls } from "../../shared/other/api-url";



export class Service {
    
    httpServise?:ApiCoreService
    appSignalService?:AppSignalService
    requestResult = signal<Book[]>([]);
    authors= signal<string[]>([]);

    constructor (http:ApiCoreService, signalService:AppSignalService){
        this.httpServise=http;
        this.appSignalService= signalService;   
    }

    performRequest(url:string, config?:ContentConfig)
    {
        this.httpServise?.getAllData(url).subscribe({
            next:(x:any)=>{
                this.requestResult.set(x["bookStorage"]);
                this.authors.set(this.requestResult().flatMap<string>(x=>x.author));
                console.log(x)},
            error:(err)=>{
                console.log(err);
                this.appSignalService?.snackBar.set([MessageKind.Error]) 
            }
        })
    }

    performRequestWithParam(url:string, config:[ContentConfig,string]){
        if(config[0]==ContentConfig.SelectAuthor){
            let params = new HttpParams().set("author",config[1]);
            this.httpServise?.getByCondition(url,params).subscribe({
                next:(x:any)=>{
                    this.requestResult.set(x["bookStorage"]);
                    console.log(x)},
                error:(err)=>{
                    console.log(err);
                    this.appSignalService?.snackBar.set([MessageKind.Error]) 
                }
            })
        }
        else {
            let params = new HttpParams().set("author",config[1]);
            this.httpServise?.getByCondition(url,params).subscribe({
                next:(x:any)=>{
                    this.requestResult.set(x["bookStorage"]);
                    console.log(x)},
                error:(err)=>{
                    console.log(err);
                    this.appSignalService?.snackBar.set([MessageKind.Error]) 
                }
            })
        }
    }
}