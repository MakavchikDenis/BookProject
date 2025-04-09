import { NgIf } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { UserStateService } from '../../../core/services/user-state.service';


@Component({
   selector: 'app-book-item',
   imports: [MatCardModule, MatButtonModule, MatIconModule, NgIf],
   templateUrl: './book-item.component.html',
   styleUrl: './book-item.component.scss'
})
export class BookItemComponent {
   @Input() id: string = "";
   @Input() name: string = "";
   @Input() author: string = "";
   @Input() img: string = "";
   @Input() prefer: boolean | undefined;
   @Output() eventToParent = new EventEmitter<[boolean, string]>();
   @Output() bookOperation = new EventEmitter<[boolean,string]>();
   userState = inject(UserStateService).isLoggedIn();

   constructor(){}

   addToFavorite() {
      this.eventToParent.emit([true, this.id]);
   }

   removeFromFavorite() {
      this.eventToParent.emit([false, this.id]);
   }

   itemOperation(operationKind:boolean) {
      this.bookOperation.emit([operationKind,this.id]);
   }
}
