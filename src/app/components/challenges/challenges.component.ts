import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { Store } from '@ngrx/store';
import { ChallengeActions } from '../../store/app.actions';
import { Challenge } from '../../interfaces/app.interfaces';
import { selectAllChallenges, selectChallengePoints } from '../../store/app.selectors';
import { CommonModule } from '@angular/common';
import { ProgressBarComponent } from "../reusable/progress-bar/progress-bar.component";
import { cloneDeep } from 'lodash';
import { firstValueFrom } from 'rxjs';
import { CommsService } from '../../services/comms.service';

@Component({
  selector: 'app-challenges',
  imports: [NavbarComponent, CommonModule, ProgressBarComponent],
  templateUrl: './challenges.component.html'
})
export class ChallengesComponent implements OnInit {

  challenges: Challenge[] = [];
  constructor(private store: Store, private comms:CommsService) {}
  ngOnInit() {
    this.store.dispatch(ChallengeActions.loadChallenges());
    this.store.select(selectAllChallenges).subscribe((challenges: Challenge[]) => {
      this.challenges = cloneDeep(challenges);
      this.calculatePoints();
    });
  }

  async calculatePoints() {
    for (const challenge of this.challenges) {
      challenge.daysLeft = Math.floor((new Date(challenge.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
      challenge.points = await firstValueFrom(this.store.select(selectChallengePoints(challenge.startDate, challenge.endDate, challenge.habits)));
    }
  }

  openCreateChallengePopup() {
    // Logic to open the create challenge popup
    this.comms.showCustomCreatePopup = true;
    this.comms.customCreateType = 'Challenge';
  }
}
