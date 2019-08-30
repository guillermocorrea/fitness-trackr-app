import { AuthActions, AuthActionTypes } from './auth.actions';

export const authFeatureKey = 'auth';

export interface State {
  isAuthenticated: boolean;
}

export const initialState: State = {
  isAuthenticated: false
};

export function authReducer(state = initialState, action: AuthActions): State {
  switch (action.type) {
    case AuthActionTypes.LoginAction:
      return {
        isAuthenticated: true
      };
    case AuthActionTypes.LogoutAction:
      return {
        isAuthenticated: false
      };
    default:
      return state;
  }
}
