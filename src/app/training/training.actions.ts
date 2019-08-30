import { Action } from '@ngrx/store';
import { Exercise } from './exercise.model';

export enum TrainingActionTypes {
  LoadAvailableTrainings = '[New Exercise] Load Available Trainings',
  LoadFinishedTrainings = '[Past Exercises] Load Finished Trainings',
  StartTraining = '[New Exercise] Start Training',
  StopTraining = '[New Exercise] Stop Training'
}

export class LoadAvailableTrainings implements Action {
  readonly type = TrainingActionTypes.LoadAvailableTrainings;
  constructor(public payload: { exercises: Exercise[] }) {}
}

export class LoadFinishedTrainings implements Action {
  readonly type = TrainingActionTypes.LoadFinishedTrainings;
  constructor(public payload: { exercises: Exercise[] }) {}
}

export class StartTraining implements Action {
  readonly type = TrainingActionTypes.StartTraining;
  constructor(public payload: { exerciseId: string }) {}
}

export class StopTraining implements Action {
  readonly type = TrainingActionTypes.StopTraining;
}

export type TrainingActions =
  | LoadAvailableTrainings
  | LoadFinishedTrainings
  | StartTraining
  | StopTraining;
