import { MatSnackBar } from '@angular/material';
import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UIService {
  loadingStateChanged = new BehaviorSubject<boolean>(false);
  constructor(private snackBar: MatSnackBar) {}

  showSnackBar(message: string, action = null, duration = 5000) {
    this.snackBar.open(message, action, {
      duration
    });
  }

  isLoading(isLoading: boolean) {
    this.loadingStateChanged.next(isLoading);
  }
}
