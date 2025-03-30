import { Component, Input } from '@angular/core';

@Component({
  selector: 'access-app-button',
  imports: [],
  template: `<button type="submit">{{this.buttonValue}}</button>`,
  styleUrl: './access-app-button.component.scss'
})
export class AccessAppButtonComponent {
  @Input() buttonValue:string="";
}
