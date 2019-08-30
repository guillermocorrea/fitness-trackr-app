import { AngularFirestore } from '@angular/fire/firestore';
import { Exercise } from './exercise.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError, of } from 'rxjs';
import { map, tap, catchError, finalize, filter, take } from 'rxjs/operators';
import { UIService } from '../shared/ui.service';
import { Store, select } from '@ngrx/store';
import { State } from './training.reducer';
import { StartLoading, StopLoading } from '../shared/ui.actions';
import {
  LoadAvailableTrainings,
  StartTraining,
  StopTraining,
  LoadFinishedTrainings
} from './training.actions';
import { selectActiveTraining } from './training.selectors';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  constructor(
    private db: AngularFirestore,
    private uiService: UIService,
    private store: Store<State>
  ) {}

  fetchAvailableExercises(): Observable<Exercise[]> {
    this.store.dispatch(new StartLoading());
    return this.db
      .collection('availableExercises')
      .snapshotChanges()
      .pipe(
        map(docArray => {
          return docArray.map(doc => {
            return {
              id: doc.payload.doc.id,
              ...doc.payload.doc.data()
            } as Exercise;
          });
        }),
        tap(exercises => {
          this.store.dispatch(new StopLoading());
          this.store.dispatch(new LoadAvailableTrainings({ exercises }));
        }),
        catchError(error => {
          this.uiService.showSnackBar(
            'Fetching exercises failed, please try again later.'
          );
          this.store.dispatch(new StopLoading());
          return of(null);
        })
      );
  }

  startExercise(selectedId: string) {
    this.store.dispatch(new StartTraining({ exerciseId: selectedId }));
  }

  cancelExercise(progress: number) {
    this.store
      .pipe(
        select(selectActiveTraining),
        filter(exercise => !!exercise),
        take(1)
      )
      .subscribe(exercise => {
        const newExercise: Exercise = {
          ...exercise,
          duration: exercise.duration * (progress / 100),
          calories: exercise.calories * (progress / 100),
          state: 'cancelled',
          date: new Date()
        };
        this.addDataToDatabase(newExercise);
      });
    this.store.dispatch(new StopTraining());
    // TODO: dispatch a new load finished exercises?
  }

  completeExercise() {
    this.store
      .pipe(
        select(selectActiveTraining),
        filter(exercise => !!exercise),
        take(1)
      )
      .subscribe(exercise => {
        const newExercise: Exercise = {
          ...exercise,
          state: 'completed',
          date: new Date()
        };
        this.store.dispatch(new StopTraining());
        this.addDataToDatabase(newExercise);
      });
  }

  fetchCompletedOrCancelledExercises(): Observable<Exercise[]> {
    this.store.dispatch(new StartLoading());
    return this.db
      .collection('finishedExercises')
      .valueChanges()
      .pipe(
        tap((result: Exercise[]) => {
          console.log('completed or cancelled:', result);
          this.store.dispatch(new StopLoading());
          this.store.dispatch(new LoadFinishedTrainings({ exercises: result }));
          // throw(new Error());
        }),
        catchError(error => {
          this.uiService.showSnackBar(
            'Fetching exercises failed, please try again later.'
          );
          this.store.dispatch(new StopLoading());
          return throwError(error);
        })
      );
  }

  private addDataToDatabase(data: Exercise) {
    this.db.collection('finishedExercises').add(data);
  }
}
