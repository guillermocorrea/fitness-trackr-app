import * as fromUi from './shared/ui.reducer';
import * as fromAuth from './auth/auth.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface State {
  ui: fromUi.State;
  auth: fromAuth.State;
}

export const reducers: ActionReducerMap<State> = {
  ui: fromUi.uiReducer,
  auth: fromAuth.authReducer
};
