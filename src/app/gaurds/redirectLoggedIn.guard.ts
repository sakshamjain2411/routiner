import { Injectable } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { CanActivate, Router } from '@angular/router';
import { take, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RedirectLoggedInGuard implements CanActivate {
  constructor(private auth: Auth, private router: Router) {}

  canActivate() {
    return authState(this.auth).pipe(map(user => !!user)).pipe(map(isLoggedIn => {
      if (isLoggedIn) {
        this.router.navigate(['/home']); // redirect to login if not logged in
        return false;
      }
      return true;
    }));
  }
}
