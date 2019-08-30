import { Action } from '@ngrx/store';

export enum AuthActionTypes {
  LoginAction = '[Auth] Login',
  LogoutAction = '[Auth] Logout'
}

export class LoginAction implements Action {
  readonly type = AuthActionTypes.LoginAction;
}

export class LogoutAction implements Action {
  readonly type = AuthActionTypes.LogoutAction;
}

export type AuthActions = LoginAction | LogoutAction;
