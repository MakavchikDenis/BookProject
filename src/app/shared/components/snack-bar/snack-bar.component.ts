import { Component, inject } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ContentMessages, MessageKind } from '../../other/messag-snack-bar';

@Component({
  selector: 'app-snack-bar',
  imports: [],
  templateUrl: './snack-bar.component.html',
  styleUrl: './snack-bar.component.scss'
})
export class SnackBarComponent {
  
  readonly snackService = inject(MatSnackBar);
  
  timePerform =2;

  openSnackBar(processStatus:MessageKind, content?:string){
    let extraStyle;

    if(MessageKind.Success){
      extraStyle = "extraSnackBarSuccess"
    }
    else if(MessageKind.Error){
      extraStyle = "extraSnackBarError"
    }
    else {
      extraStyle = "extraSnackBarNotice";
    }
    
    this.snackService.open(
      processStatus==MessageKind.Notice ? (content ?? "") : ContentMessages[processStatus].val, "",
      {duration:this.timePerform*1000, verticalPosition:"top", panelClass: extraStyle});
  }

}
