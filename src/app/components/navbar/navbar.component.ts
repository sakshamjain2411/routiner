import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommsService } from '../../services/comms.service';
import { QuickCreateComponent } from "../habit/quick-create/quick-create.component";
import { CustomCreateComponent } from "../habit/custom-create/custom-create.component";
import { QuickActionComponent } from "../habit/quick-action/quick-action.component";
import { Auth } from '@angular/fire/auth';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [QuickCreateComponent, CommonModule, QuickCreateComponent, CustomCreateComponent, QuickActionComponent, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  constructor(public comms: CommsService) {}
  openCreateHabitPopup() {
    this.comms.showQuickCreatePopup = true;
  }
}
