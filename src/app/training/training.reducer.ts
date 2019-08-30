import { TrainingActions, TrainingActionTypes } from './training.actions';
import { Exercise } from './exercise.model';

export const trainingFeatureKey = 'training';

export interface State {
  availableExercises: Exercise[];
  finishedExercises: Exercise[];
  activeTraining: Exercise;
}

export const initialState: State = {
  availableExercises: [],
  finishedExercises: [],
  activeTraining: null
};

export function reducer(state = initialState, action: TrainingActions): State {
  switch (action.type) {
    case TrainingActionTypes.LoadAvailableTrainings:
      return {
        ...state,
        availableExercises: [...action.payload.exercises]
      };
    case TrainingActionTypes.LoadFinishedTrainings:
      return {
        ...state,
        finishedExercises: [...action.payload.exercises]
      };
    case TrainingActionTypes.StartTraining:
      const selectedTraining = state.availableExercises.find(
        e => e.id === action.payload.exerciseId
      );
      return {
        ...state,
        activeTraining: { ...selectedTraining }
      };
    case TrainingActionTypes.StopTraining:
      return {
        ...state,
        activeTraining: null
      };
    default:
      return state;
  }
}
