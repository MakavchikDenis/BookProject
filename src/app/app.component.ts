import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiCoreService } from './core/services/api-core.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  providers:[ApiCoreService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

}
