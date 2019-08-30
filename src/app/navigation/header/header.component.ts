import { Subscription, Observable } from 'rxjs';
import { AuthService } from './../../auth/auth.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { State } from 'src/app/app.reducer';
import { selectIsAuthenticated } from 'src/app/auth/auth.selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isAuthenticated$: Observable<boolean>;
  @Output() sidenavToggle = new EventEmitter<void>();
  constructor(private authService: AuthService, private store: Store<State>) { }

  ngOnInit() {
    this.isAuthenticated$ = this.store.pipe(
      select(selectIsAuthenticated)
    );
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  onLogout() {
    this.authService.logout();
  }
}
