import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';


@Component({
  selector: 'app-book-item',
  imports: [MatCardModule, MatButtonModule, MatIconModule,NgIf],
  templateUrl: './book-item.component.html',
  styleUrl: './book-item.component.scss'
})
export class BookItemComponent {
   @Input() id:string="";
   @Input() name:string="";
   @Input() author:string="";
   @Input() img:string="";
   @Input() prefer:boolean|undefined;
   @Output() removeEvent=new EventEmitter<string>();

   removeFromFavorite(){
      this.removeEvent.emit(this.id);
   }
}
