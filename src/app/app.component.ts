import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { Store } from '@ngrx/store';
import { AppState } from './interfaces/app.interfaces';
import { AppActions } from './store/app.actions';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'routiner';

  constructor(private store:Store<AppState>, private auth:Auth) { }
  ngOnInit(): void {
    // Initialize any necessary services or data here
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.store.dispatch(AppActions.loadAppData());
      }
      else {
        // User is signed out, handle accordingly
      }
    });
  }
}
