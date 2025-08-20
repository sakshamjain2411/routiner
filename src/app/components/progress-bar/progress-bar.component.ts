import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Challenge } from '../../interfaces/app.interfaces';

@Component({
  selector: 'app-progress-bar',
  imports: [CommonModule],
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.scss'
})
export class ProgressBarComponent implements OnInit {

  @Input() challenge:Challenge = {} as Challenge;
  progress = 0;
  currentMilestoneIndex = 0;
  totalPoints = 0;

  ngOnInit(): void {
      this.totalPoints = (Date.parse(this.challenge.endDate) - Date.parse(this.challenge.startDate)) / (1000 * 60 * 60 * 24) * this.challenge.habits.length * 50;
      this.progress = (this.challenge.points / this.totalPoints) * 100;

      console.log(this.totalPoints);
  }
}
