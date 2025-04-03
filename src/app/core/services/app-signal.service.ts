import { Injectable, signal } from '@angular/core';
import { MessageKind } from '../../shared/other/messag-snack-bar';


@Injectable({
  providedIn: 'root'
})
export class AppSignalService {

  snackBar = signal<[MessageKind,string?]>([MessageKind.None]);
  constructor() { }
}
