import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Auth, user } from '@angular/fire/auth';
import { CommsService } from './comms.service';
import { Track, User } from '../interfaces/app.interfaces';
import { firstValueFrom, from, map, Observable } from 'rxjs';
import { addDoc, collection, collectionData, doc, Firestore, query, where, deleteDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient, private auth:Auth, private comms:CommsService, private firestore:Firestore) { }

  getUser(): Observable<any> {
    const usersCollection = collection(this.firestore, 'users');
    const q = query(usersCollection, where('userId', '==', this.auth.currentUser?.uid));
    return collectionData(q, { idField: 'id' });
  }
  getHabits(): Observable<any> {
    const habitCollection = collection(this.firestore, `users/${this.auth.currentUser?.uid}/habits`);
    return collectionData(habitCollection, { idField: 'id' });
  }
  getTracks(): Observable<any> {
    const trackCollection = collection(this.firestore, `users/${this.auth.currentUser?.uid}/tracks`);
    return collectionData(trackCollection, { idField: 'id' });
  }

  postUser(user: User): Observable<any> {
    const usersCollection = collection(this.firestore, 'users');
    return from(addDoc(usersCollection, user));
  }
  postHabit(habit: any): Observable<any> {
    const habitCollection = collection(this.firestore, `users/${this.auth.currentUser?.uid}/habits`);
    return from(addDoc(habitCollection, habit));
  }
  postTrack(track: Track): Observable<any> {
    const trackCollection = collection(this.firestore, `users/${this.auth.currentUser?.uid}/tracks`);
    return from(addDoc(trackCollection, track));
  }

  deleteHabit(habitId: string): Observable<any> {
    const habitDocRef = doc(this.firestore, `users/${this.auth.currentUser?.uid}/habits/${habitId}`);
    return from(deleteDoc(habitDocRef));
  }

  deleteTrack(trackId: string): Observable<any> {
    const trackDocRef = doc(this.firestore, `users/${this.auth.currentUser?.uid}/tracks/${trackId}`);
    return from(deleteDoc(trackDocRef));
  }
}
