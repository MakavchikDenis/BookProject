import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { UserStateService } from '../../core/services/user-state.service';
import { NgIf } from '@angular/common';

type Route={
  key:string,
  val:string
}


@Component({
  selector: 'app-header',
  imports: [MatToolbarModule,RouterLink,RouterLinkActive,MatButtonModule, MatDividerModule, MatIconModule, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  readonly router=inject(Router);
  readonly userState = inject(UserStateService);
}
