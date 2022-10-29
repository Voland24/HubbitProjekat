import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { UserLoginDto } from 'src/app/models/user/userLoginDto';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  constructor() {}

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe;
  }

  ngOnInit(): void {}

  @Output() loginEmmiter = new EventEmitter();

  destroy$: Subject<boolean> = new Subject();

  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  login() {
    const dataForLogin: UserLoginDto = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password,
    };
    if (dataForLogin) this.loginEmmiter.emit(dataForLogin);
  }
}
