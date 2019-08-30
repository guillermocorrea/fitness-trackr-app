import { Subscription } from 'rxjs';
import { TrainingService } from './../training.service';
import { Exercise } from './../exercise.model';
import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  OnDestroy
} from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Store, select } from '@ngrx/store';
import { selectFinishedExercises } from '../training.selectors';
import { State } from '../training.reducer';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.scss']
})
export class PastTrainingsComponent
  implements OnInit, AfterViewInit, OnDestroy {
  dataSource = new MatTableDataSource<Exercise>(); // TrainingDatasource;
  displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
  @ViewChild(MatSort, { static: false }) matSort: MatSort;
  @ViewChild(MatPaginator, { static: false }) matPaginator: MatPaginator;
  errorLoadingExercises = false;
  private subscriptions: Subscription[] = [];

  constructor(
    private trainingService: TrainingService,
    private store: Store<State>
  ) {}

  ngOnInit() {
    this.subscriptions.push(
      this.store
        .pipe(select(selectFinishedExercises))
        .subscribe(exercises => (this.dataSource.data = exercises))
    );
    this.fetchExercises();
  }

  fetchExercises() {
    this.subscriptions.push(
      this.trainingService.fetchCompletedOrCancelledExercises().subscribe(
        exercises => {
          this.dataSource.data = exercises;
        },
        error => {
          this.errorLoadingExercises = true;
        }
      )
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.matSort;
    this.dataSource.paginator = this.matPaginator;
  }

  doFilter(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
  }
}
