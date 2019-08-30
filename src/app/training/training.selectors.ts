import { State, trainingFeatureKey } from './training.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectTrainingState = createFeatureSelector<State>(trainingFeatureKey);

export const selectAvailableExercises = createSelector(
  selectTrainingState,
  state => state.availableExercises
);

export const selectFinishedExercises = createSelector(
  selectTrainingState,
  state => state.finishedExercises
);

export const selectActiveTraining = createSelector(
  selectTrainingState,
  state => state.activeTraining
);

export const selectIsActiveTraining = createSelector(
  selectTrainingState,
  state => state.activeTraining != null
);
