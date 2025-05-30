import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import 'hammerjs';
import { environment as env } from './environments/environment';


bootstrapApplication(AppComponent, appConfig).then(() => {
  if ('serviceWorker' in navigator && env.production) {
    navigator.serviceWorker.register('/custom-sw.js')
      .then(registration => console.log('Custom Service Worker registered:', registration))
      .catch(error => console.error('Custom Service Worker registration failed:', error));
  }
});
