import { Injectable } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { environment as env } from '../../environments/environment'; // Adjust the path as necessary
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PushNotificationService {

  readonly VAPID_PUBLIC_KEY = 'YOUR_PUBLIC_VAPID_KEY';

  constructor(private swPush: SwPush, private http:HttpClient) {}

  enablePushNotifications() {
    this.swPush.requestSubscription({
      serverPublicKey: env.vapidKeys.publicKey
    })
    .then(subscription => {
      console.log('Subscription:', subscription);
      this.http.post('https://web-push.c-392baaa.kyma.ondemand.com/subscribe', subscription).subscribe(
        () => console.log('Subscription sent to server'),
        err => console.error('Error sending subscription', err)
      );
    })
    .catch(err => console.error('Could not subscribe to notifications', err));
  }

  disablePushNotifications() {
    // Logic to unsubscribe from push notifications

  }
}
