import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommsService {
  private _showQuickCreatePopup = false;
  private _showCustomCreatePopup = false;
  private _showQuickActionPopup = false;
  private _quickActionHabit: any = null;
  private _customCreateType:string = 'Habit';
  isSwipeAction = new EventEmitter<boolean>();
  selector = {
    user: new EventEmitter<any>(),
    tracks: new EventEmitter<any>(),
  }
  constructor() { }
  get showQuickCreatePopup() {
    return this._showQuickCreatePopup;
  }
  get showCustomCreatePopup() {
    return this._showCustomCreatePopup;
  }
  get showQuickActionPopup() {
    return this._showQuickActionPopup;
  }
  get quickActionHabit() {
    return this._quickActionHabit;
  }
  get customCreateType() {
    return this._customCreateType;
  }
  set showQuickCreatePopup(value: boolean) {
    this._showQuickCreatePopup = value;
  }
  set showCustomCreatePopup(value: boolean) {
    this._showCustomCreatePopup = value;
  }
  set showQuickActionPopup(value: boolean) {
    this._showQuickActionPopup = value;
  }
  set quickActionHabit(value: any) {
    this._quickActionHabit = value;
  }
  set customCreateType(value: string) {
    this._customCreateType = value;
  }
  setSwipeAction(value: boolean) {
    this.isSwipeAction.emit(value);
  }
}
