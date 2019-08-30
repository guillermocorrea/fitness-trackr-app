import { Exercise } from './../exercise.model';
import {
  Component,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter
} from '@angular/core';
import { Subscription, interval, noop, Observable } from 'rxjs';
import { tap, takeWhile, first, finalize, filter, distinctUntilChanged } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { StopTrainingComponent } from './stop-training.component';
import { TrainingService } from '../training.service';
import { Store, select } from '@ngrx/store';
import { State } from '../training.reducer';
import { selectActiveTraining } from '../training.selectors';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss']
})
export class CurrentTrainingComponent implements OnInit, OnDestroy {
  progress = 0;
  private subscriptions = new Array<Subscription>();
  runningExercise$: Observable<Exercise>;
  exerciseDuration$: Observable<number>;
  exerciseDuration: number;

  constructor(
    private dialog: MatDialog,
    public trainingService: TrainingService,
    private store: Store<State>
  ) {}

  ngOnInit() {
    this.runningExercise$ = this.store.pipe(
      select(selectActiveTraining),
      filter(exercise => !!exercise),
      tap(exercise => {
        this.exerciseDuration = exercise.duration;
        this.startOrResumeCountdown();
        this.startOrResumeInterval();
      }),
      distinctUntilChanged()
    ); // this.trainingService.getRunningExercise();
  }

  startOrResumeCountdown() {
    this.subscriptions.push(
      interval(1000)
        .pipe(
          takeWhile(() => this.exerciseDuration > 0),
          tap(() => this.exerciseDuration--)
        )
        .subscribe(noop)
    );
  }

  startOrResumeInterval() {
    const step = (this.exerciseDuration / 100) * 1000;
    this.subscriptions.push(
      interval(step)
        .pipe(
          takeWhile(() => this.progress < 100),
          tap(() => {
            this.progress += 1;
            if (this.progress === 100) {
              this.trainingService.completeExercise();
            }
          })
        )
        .subscribe(noop)
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

  onStop() {
    this.ngOnDestroy();
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      disableClose: true,
      data: { progress: this.progress }
    });
    dialogRef
      .afterClosed()
      .pipe(first())
      .subscribe((confirmedStop: boolean) => {
        if (confirmedStop) {
          this.trainingService.cancelExercise(this.progress);
        } else {
          this.startOrResumeInterval();
          this.startOrResumeCountdown();
        }
      });
  }
}
