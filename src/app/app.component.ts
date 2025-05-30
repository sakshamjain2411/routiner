import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Auth, getAdditionalUserInfo, onAuthStateChanged } from '@angular/fire/auth';
import { Store } from '@ngrx/store';
import { AppState } from './interfaces/app.interfaces';
import { AppActions } from './store/app.actions';
import { SplashComponent } from "./components/splash/splash.component";
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { selectInitialized } from './store/app.selectors';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'routiner';
  initialized$:Observable<any> = this.store.select(selectInitialized);

  constructor(private store:Store<AppState>, private auth:Auth) { }
  ngOnInit(): void {
    // Initialize any necessary services or data here
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.store.dispatch(AppActions.loadAppData());
      }
    });
  }
}
