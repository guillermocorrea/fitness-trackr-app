import { Observable } from 'rxjs';
import { State } from 'src/app/app.reducer';
import { Store, select } from '@ngrx/store';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { selectIsAuthenticated } from 'src/app/auth/auth.selectors';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit {
  isAuthenticated$: Observable<boolean>;
  @Output() closeSidenav = new EventEmitter<void>();
  constructor(private authService: AuthService, private store: Store<State>) {}

  ngOnInit() {
    this.isAuthenticated$ = this.store.pipe(
      select(selectIsAuthenticated)
    );
  }

  onClose() {
    this.closeSidenav.emit();
  }

  onLogout() {
    this.authService.logout();
    this.onClose();
  }
}
