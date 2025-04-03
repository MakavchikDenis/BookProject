import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { SignUpComponent } from '../../features/access-account/sign-up/sign-up.component';
import { SignInComponent } from '../../features/access-account/sign-in/sign-in.component';
import { AccessAccountComponent } from '../../features/access-account/access-account.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

type Route={
  key:string,
  val:string
}


@Component({
  selector: 'app-header',
  imports: [MatToolbarModule,RouterLink,RouterLinkActive,MatButtonModule, MatDividerModule, MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  readonly router=inject(Router);
  signUp:string=this.router.config.find(x=>x.component==AccessAccountComponent)?.children?.find(x=>x.component==SignUpComponent)?.path ?? "";
  signIn:string = this.router.config.find(x=>x.component==AccessAccountComponent)?.children?.find(x=>x.component==SignInComponent)?.path ??"";
}
