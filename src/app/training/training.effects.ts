// import { Injectable } from '@angular/core';
// import { Actions, Effect, ofType } from '@ngrx/effects';

// import { concatMap } from 'rxjs/operators';
// import { EMPTY } from 'rxjs';
// import { TrainingActionTypes, TrainingActions } from './training.actions';

// @Injectable()
// export class TrainingEffects {
//   @Effect()
//   loadTrainings$ = this.actions$.pipe(
//     ofType(TrainingActionTypes.LoadTrainings),
//     /** An EMPTY observable only emits completion. Replace with your own observable API request */
//     concatMap(() => EMPTY)
//   );

//   constructor(private actions$: Actions<TrainingActions>) {}
// }
