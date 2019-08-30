import { State, authFeatureKey } from './auth.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectAuthState = createFeatureSelector<State>(authFeatureKey);

export const selectIsAuthenticated = createSelector(
  selectAuthState,
  state => state.isAuthenticated
);
