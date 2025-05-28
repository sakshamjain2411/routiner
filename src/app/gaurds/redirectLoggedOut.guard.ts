import { Injectable } from '@angular/core';
import { Auth, authState, user } from '@angular/fire/auth';
import { CanActivate, Router } from '@angular/router';
import { take, map, tap, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RedirectLoggedOutGuard implements CanActivate {
  constructor(private auth: Auth, private router: Router) {}

  canActivate() {
    return authState(this.auth).pipe(map(user => !!user)).pipe(map(isLoggedIn => {
      if (!isLoggedIn) {
        this.router.navigate(['/login']); // redirect to login if not logged in
        return false;
      }
      return true;
    }));
  }
}
