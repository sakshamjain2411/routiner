import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Auth, user } from '@angular/fire/auth';
import { CommsService } from './comms.service';
import { Routine, Track, User } from '../interfaces/app.interfaces';
import { firstValueFrom, from, map, Observable } from 'rxjs';
import { addDoc, collection, collectionData, doc, Firestore, query, where, deleteDoc, updateDoc } from '@angular/fire/firestore';

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
  getRoutines(): Observable<any> {
    const habitCollection = collection(this.firestore, `users/${this.auth.currentUser?.uid}/routines`);
    return collectionData(habitCollection, { idField: 'id' });
  }
  getRoutineTracks(): Observable<any> {
    const habitCollection = collection(this.firestore, `users/${this.auth.currentUser?.uid}/routineTracks`);
    return collectionData(habitCollection, { idField: 'id' });
  }
  getChallenges(): Observable<any> {
    const challengeCollection = collection(this.firestore, `users/${this.auth.currentUser?.uid}/challenges`);
    return collectionData(challengeCollection, { idField: 'id' });
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
  postRoutine(routine: any): Observable<any> {
    const routineCollection = collection(this.firestore, `users/${this.auth.currentUser?.uid}/routines`);
    return from(addDoc(routineCollection, routine));
  }
  postRoutineTrack(routineTrack: any): Observable<any> {
    const routineTrackCollection = collection(this.firestore, `users/${this.auth.currentUser?.uid}/routineTracks`);
    return from(addDoc(routineTrackCollection, routineTrack));
  }

  postChallenge(challenge: any): Observable<any> {
    const challengeCollection = collection(this.firestore, `users/${this.auth.currentUser?.uid}/challenges`);
    return from(addDoc(challengeCollection, challenge));
  }

  patchRoutine(routineId: string, updates: Partial<Routine>): Observable<any> {
    const routineDocRef = doc(this.firestore, `users/${this.auth.currentUser?.uid}/routines/${routineId}`);
    return from(updateDoc(routineDocRef, updates));
  }

  deleteHabit(habitId: string): Observable<any> {
    const habitDocRef = doc(this.firestore, `users/${this.auth.currentUser?.uid}/habits/${habitId}`);
    return from(deleteDoc(habitDocRef));
  }
  deleteTrack(trackId: string): Observable<any> {
    const trackDocRef = doc(this.firestore, `users/${this.auth.currentUser?.uid}/tracks/${trackId}`);
    return from(deleteDoc(trackDocRef));
  }
  deleteRoutine(routineId: string): Observable<any> {
    const routineDocRef = doc(this.firestore, `users/${this.auth.currentUser?.uid}/routines/${routineId}`);
    return from(deleteDoc(routineDocRef));
  }
  deleteRoutineTrack(routineTrackId: string): Observable<any> {
    const routineTrackDocRef = doc(this.firestore, `users/${this.auth.currentUser?.uid}/routineTracks/${routineTrackId}`);
    return from(deleteDoc(routineTrackDocRef));
  }
  deleteRoutineTracks(routineId: string): Observable<any> {
    const routineTrackCollection = collection(this.firestore, `users/${this.auth.currentUser?.uid}/routineTracks`);
    const q = query(routineTrackCollection, where('routineId', '==', routineId));
    return from(
      collectionData(q, { idField: 'id' }).pipe(
        map((docs: any[]) => Promise.all(
          docs.map(docItem => {
            const docRef = doc(this.firestore, `users/${this.auth.currentUser?.uid}/routineTracks/${docItem.id}`);
            return deleteDoc(docRef);
          })
        ))
      )
    );
  }
}
