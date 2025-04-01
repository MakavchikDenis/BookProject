import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'access-app-reference',
  imports: [RouterLink],
  template: `<div>
                <span>{{this.extraContent}}</span>
                <a routerLink="{{this.routLink}}" routerLinkActive="activeLink">{{this.contentLink}}</a>
            </div>`,
  styleUrl: './access-app-reference.component.scss'
})
export class AccessAppReferenceComponent {
  @Input() extraContent="";
  @Input() contentLink="";
  @Input() routLink=""; 
}
