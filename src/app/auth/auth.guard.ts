import { selectIsAuthenticated } from './auth.selectors';
import { State } from './../app.reducer';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment
} from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Store, select } from '@ngrx/store';
import { tap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService, private router: Router, private store: Store<State>) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.isLoggedIn();
  }

  canLoad(route: Route, segments: UrlSegment[]) {
    return this.isLoggedIn();
  }

  private isLoggedIn() {
    return this.store.pipe(
      select(selectIsAuthenticated),
      tap(isAuthenticated => {
        if (!isAuthenticated) {
          this.router.navigate(['/login']);
        }
      }),
      take(1)
    );
  }
}
