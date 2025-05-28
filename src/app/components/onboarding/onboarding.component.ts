import { Component } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithPopup, UserCredential } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-onboarding',
  imports: [],
  templateUrl: './onboarding.component.html',
  styleUrl: './onboarding.component.scss'
})
export class OnboardingComponent {

  constructor(private auth:Auth, private router:Router) { }

  onLoginWithGoogleClick() {
    signInWithPopup(this.auth, new GoogleAuthProvider())
    .then(() => {
      this.router.navigate(['/home']);
    });
  }
}
