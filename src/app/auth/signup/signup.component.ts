import { State } from './../../app.reducer';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UIService } from 'src/app/shared/ui.service';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { selectIsLoading } from 'src/app/shared/ui.selectors';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  form: FormGroup;
  maxDate: Date;
  isLoading$: Observable<boolean>;

  constructor(private authService: AuthService, private uiService: UIService, private store: Store<State>) {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ]),
      birthdate: new FormControl('', [Validators.required]),
      termsAndConditions: new FormControl(false, [Validators.required])
    });
  }

  ngOnInit() {
    this.isLoading$ = this.store.pipe(
      select(selectIsLoading)
    ); // this.uiService.loadingStateChanged.asObservable();
    this.maxDate = new Date();
    this.maxDate.setDate(this.maxDate.getFullYear() - 18);
  }

  onSubmit() {
    this.authService.registerUser({
      email: this.form.value.email,
      password: this.form.value.password
    });
  }
}
