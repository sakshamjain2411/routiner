import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-challenges',
  imports: [NavbarComponent],
  templateUrl: './challenges.component.html'
})
export class ChallengesComponent {
  openCreateChallengePopup() {
    // Logic to open the create challenge popup
  }
}
