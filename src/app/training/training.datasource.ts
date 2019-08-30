import { TrainingService } from './training.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Exercise } from './exercise.model';
import { DataSource } from '@angular/cdk/table';
import { CollectionViewer } from '@angular/cdk/collections';
import { Observable, Subscription, Subject, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

export class TrainingDatasource implements DataSource<Exercise> {
  private subscription: Subscription;
  private finishedExercisesSubject = new BehaviorSubject<Exercise[]>([]);

  constructor(private trainingService: TrainingService) {}

  connect(collectionViewer: CollectionViewer): Observable<Exercise[]> {
    return this.finishedExercisesSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  loadFinishedOrCompletedExercises() {
    this.subscription = this.trainingService
      .fetchCompletedOrCancelledExercises()
      .subscribe(exercises => this.finishedExercisesSubject.next(exercises));
  }
}
