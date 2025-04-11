import { Component, Input } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'access-app-button',
  imports: [MatButtonModule, MatDividerModule, MatIconModule],
  template: `<button mat-flat-button type="submit" [disabled]="this.disabled" >{{this.buttonValue}}</button>`,
  styles: 'button {width:120px;}'
})
export class AccessAppButtonComponent {
  @Input() buttonValue:string="";
  @Input() disabled?:boolean;
}
