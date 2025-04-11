import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GetFormUserService } from '../../core/services/get-form-user.service';

@Component({
  selector: 'access-account',
  imports: [RouterOutlet],
  providers:[GetFormUserService],
  templateUrl: './access-account.component.html',
  styleUrl: './access-account.component.scss'
})
export class AccessAccountComponent {
  
}
