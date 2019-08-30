import { AuthService } from './auth/auth.service';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('sidenav', {static: true}) sidenav: MatSidenav;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.initAuthListener();
  }

  onToggleSidenav() {
    this.sidenav.toggle();
  }
}
