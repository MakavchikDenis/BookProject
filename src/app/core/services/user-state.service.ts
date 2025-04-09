import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserStateService {

  isLoggedIn =signal(false);
  userId=signal<string|undefined>(undefined)

  constructor() { }

  login(userId:string): void { this.isLoggedIn.set(true); this.userId.set(userId);}
  logout(): void { this.isLoggedIn.set(false); this.userId.set(undefined)}
}
