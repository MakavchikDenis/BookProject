import { Component, inject } from '@angular/core';
import { UserStateService } from '../../../core/services/user-state.service';
import { Router } from '@angular/router';
import { ContentHomePageComponent } from '../../home-page/content-home-page/content-home-page.component';

@Component({
  selector: 'app-sign-out',
  imports: [],
  templateUrl: './sign-out.component.html',
  styleUrl: './sign-out.component.scss'
})
export class SignOutComponent {
  readonly userState = inject(UserStateService);
  readonly router = inject(Router);
  
  constructor(){this.signOut();}

  signOut(){
    this.userState.logout();
    localStorage.removeItem("token");
    this.router.navigate([this.router.config.find(x=>x.component==ContentHomePageComponent)?.path]);
  }
}
