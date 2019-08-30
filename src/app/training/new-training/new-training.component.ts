import { State } from './../../app.reducer';
import { Store, select } from '@ngrx/store';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription, noop } from 'rxjs';
// import { UIService } from 'src/app/shared/ui.service';

import { TrainingService } from '../training.service';
import { Exercise } from './../exercise.model';
import { selectIsLoading } from 'src/app/shared/ui.selectors';
import { selectAvailableExercises } from '../training.selectors';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  exercises$: Observable<Exercise[]>;
  form: FormGroup;
  isLoading$: Observable<boolean>;
  private subscriptions: Subscription[] = [];

  constructor(
    private trainingService: TrainingService,
    // private uiService: UIService,
    private store: Store<State>
  ) {
    this.form = new FormGroup({
      exercise: new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {
    // this.subscriptions.push(
    //   this.uiService.loadingStateChanged.subscribe(isLoading => {
    //     console.log(isLoading);
    //     this.isLoading = isLoading;
    //   })
    // );
    this.isLoading$ = this.store.pipe(
      select(selectIsLoading)
    );
    this.exercises$ = this.store.pipe(
      select(selectAvailableExercises)
    );
    this.fetchAvailableExercises();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  fetchAvailableExercises() {
    this.subscriptions.push(
      this.trainingService.fetchAvailableExercises().subscribe(noop)
    );
  }

  onStartNewTraining() {
    this.trainingService.startExercise(this.form.value.exercise);
  }

  trackById(index: number, item: Exercise) {
    return item.id;
  }
}
