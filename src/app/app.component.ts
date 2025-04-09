import { Component, DoCheck, inject, OnChanges, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiCoreService } from './core/services/api-core.service';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { SnackBarComponent } from "./shared/components/snack-bar/snack-bar.component";
import { AppSignalService } from './core/services/app-signal.service';
import { MessageKind } from './shared/other/messag-snack-bar';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SnackBarComponent, FooterComponent, HeaderComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements DoCheck {
  @ViewChild(SnackBarComponent, { static: false })
  private snackBar?: SnackBarComponent;

  readonly appSignalService = inject(AppSignalService);

  messageSignal?: [MessageKind, string?] = [MessageKind.None];

  ngDoCheck(): void {
    this.messageSignal = this.appSignalService.snackBar();

    if (this.messageSignal[0] != MessageKind.None) {

      this.snackBar?.openSnackBar(this.messageSignal[0], this.messageSignal[0] == MessageKind.Notice ? this.messageSignal[1] : undefined);

      this.appSignalService.snackBar.set([MessageKind.None]);
    };
  }
}
