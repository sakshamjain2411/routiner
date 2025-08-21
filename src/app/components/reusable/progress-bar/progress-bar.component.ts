import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Challenge } from '../../../interfaces/app.interfaces';

@Component({
  selector: 'app-progress-bar',
  imports: [CommonModule],
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.scss'
})
export class ProgressBarComponent implements OnInit {

  @Input() challenge:Challenge = {} as Challenge;
  progress = 0;
  milestones:Map<number,number> = new Map([
    [60, 0],
    [80, 0],
    [100, 0]
  ]);
  totalPoints = 0;

  ngOnInit(): void {
      this.totalPoints = (Date.parse(this.challenge.endDate) - Date.parse(this.challenge.startDate)) / (1000 * 60 * 60 * 24) * this.challenge.habits.length * 50;
      this.progress = (this.challenge.points / this.totalPoints) * 100;
      this.milestones.set(60, Math.round(this.totalPoints * 0.6 / 100) * 100);
      this.milestones.set(80, Math.round(this.totalPoints * 0.8 / 100) * 100);
      this.milestones.set(100, this.totalPoints);
  }
}
