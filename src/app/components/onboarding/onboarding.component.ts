import { Component } from '@angular/core';
import { Auth, getAdditionalUserInfo, GoogleAuthProvider, signInWithPopup, UserCredential } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { User } from '../../interfaces/app.interfaces';
import { Store } from '@ngrx/store';
import { UserActions } from '../../store/app.actions';

@Component({
  selector: 'app-onboarding',
  imports: [],
  templateUrl: './onboarding.component.html',
  styleUrl: './onboarding.component.scss'
})
export class OnboardingComponent {

  constructor(private auth:Auth, private router:Router, private store:Store) { }

  async onLoginWithGoogleClick() {
    const credentials = await signInWithPopup(this.auth, new GoogleAuthProvider());
    const additionalUserInfo = getAdditionalUserInfo(credentials);
    const isNewUser = additionalUserInfo?.isNewUser;
    if (isNewUser) {
      const user:User = {
        userId: credentials.user.uid,
        name: credentials.user.displayName || '',
        email: credentials.user.email || '',
        photoUrl: credentials.user.photoURL || '',
      };
      this.store.dispatch(UserActions.addUser({ user }));
    }
    this.router.navigate(['/home']);
  }
}
