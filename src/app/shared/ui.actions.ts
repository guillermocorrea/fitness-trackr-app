import { Action } from '@ngrx/store';

export enum UIActionTypes {
  StartLoading = '[UI] Start Loading',
  StopLoading = '[UI] Stop Loading',
}

export class StartLoading implements Action {
  readonly type = UIActionTypes.StartLoading;
}

export class StopLoading implements Action {
  readonly type = UIActionTypes.StopLoading;
}

export type UIActions = StartLoading | StopLoading;
