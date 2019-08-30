import { map } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UIService } from 'src/app/shared/ui.service';
import { Observable } from 'rxjs';
import { State } from 'src/app/shared/ui.reducer';
import { selectIsLoading } from 'src/app/shared/ui.selectors';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  isLoading$: Observable<boolean>;

  constructor(private authService: AuthService, private uiService: UIService, private store: Store<{ui: State}>) {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {
    // this.isLoading$ = this.uiService.loadingStateChanged.asObservable();
    this.isLoading$ = this.store.pipe(
      select(selectIsLoading)
    );
  }

  onSubmit() {
    this.authService.login({
      email: this.form.value.email,
      password: this.form.value.password
    });
  }
}
