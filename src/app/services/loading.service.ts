import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  public loadingDisplay: EventEmitter<boolean> = new EventEmitter<boolean>();
  showLoading() {
    this.loadingDisplay.emit(true);
  }
  hideLoading() {
    this.loadingDisplay.emit(false);
  }
}

