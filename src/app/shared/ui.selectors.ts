import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUi from './ui.reducer';

export const selectUiState = createFeatureSelector<fromUi.State>('ui');

export const selectIsLoading = createSelector(
  selectUiState,
  state => state.isLoading
);
