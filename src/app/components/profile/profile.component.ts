import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { PushNotificationService } from '../../services/push-notification.service';

@Component({
  selector: 'app-profile',
  imports: [NavbarComponent, MatSlideToggleModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  user = this.auth.currentUser;
  constructor(private auth:Auth, private router:Router, private pushNotification:PushNotificationService) {}

  ngOnInit(): void {
  }

  onTogglePushNotificationPrefrence(event:Event) {
    const checkbox = event.target as HTMLInputElement;
    if(checkbox.checked) {
      this.pushNotification.enablePushNotifications();
    } else {
      this.pushNotification.disablePushNotifications();
    }
  }

  onLogoutClick() {
    this.auth.signOut().then(() => {
      this.router.navigate(['/onboarding']);
    });
  }
}
