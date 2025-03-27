import { Component, Input, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-home-page',
  imports: [],
  template: '<button type="button" (click)="send()">{{this.buttonValue}}</button>',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {
  @Input() buttonValue:string="";
  @Output() sendOut = new EventEmitter();

  send(){
    this.sendOut.emit();
  }
}
