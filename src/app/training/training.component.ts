import { State } from './training.reducer';
import { Store, select } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { selectIsActiveTraining } from './training.selectors';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit {
  ongoingTraining$: Observable<boolean>;
  constructor(private store: Store<State>) { }

  ngOnInit() {
    this.ongoingTraining$ = this.store.pipe(
      select(selectIsActiveTraining)
    );
  }

}
