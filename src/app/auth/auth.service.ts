import { LoginAction, LogoutAction } from './auth.actions';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { UIService } from '../shared/ui.service';
import { AuthData } from './auth-data.model';
import { Store } from '@ngrx/store';
import { State } from '../shared/ui.reducer';
import { StartLoading, StopLoading } from '../shared/ui.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // private authChangeSource = new Subject<boolean>();
  // authChange$ = this.authChangeSource.asObservable();
  // private isLoggedIn: boolean;

  constructor(
    private router: Router,
    private fireAuth: AngularFireAuth,
    private uiService: UIService,
    private store: Store<{ui: State}>
  ) {}

  initAuthListener() {
    this.fireAuth.authState.subscribe(user => {
      if (user) {
        this.store.dispatch(new LoginAction());
        this.router.navigate(['/training']);
      } else {
        this.store.dispatch(new LogoutAction());
        this.router.navigate(['/login']);
      }
    });
  }

  registerUser(authData: AuthData) {
    // this.uiService.isLoading(true);
    this.store.dispatch(new StartLoading());
    this.fireAuth.auth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .catch(this.handleLoginRegisterError.bind(this))
      .finally(() => this.store.dispatch(new StopLoading()));
  }

  login(authData: AuthData) {
    // this.uiService.isLoading(true);
    this.store.dispatch(new StartLoading());
    this.fireAuth.auth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .catch(this.handleLoginRegisterError.bind(this))
      .finally(() => this.store.dispatch(new StopLoading())); // this.uiService.isLoading(false));
  }

  logout() {
    this.fireAuth.auth
      .signOut()
      .catch(console.log);
  }

  // isAuth() {
  //   return this.isLoggedIn;
  // }

  private handleLoginRegisterError(error: { message: string }) {
    this.uiService.showSnackBar(error.message);
  }
}
