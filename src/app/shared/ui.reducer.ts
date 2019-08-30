import { UIActions, UIActionTypes } from './ui.actions';

export interface State {
  isLoading: boolean;
}

const initialState: State = {
  isLoading: false
};

export function uiReducer(state = initialState, action: UIActions) {
  switch (action.type) {
    case UIActionTypes.StartLoading:
      return {
        isLoading: true
      };
    case UIActionTypes.StopLoading:
      return {
        isLoading: false
      };
    default:
      return state;
  }
}
