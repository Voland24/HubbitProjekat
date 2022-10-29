import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, take, takeUntil } from 'rxjs';
import { Interest } from 'src/app/models/interest';
import { UserLoginDto } from 'src/app/models/user/userLoginDto';
import { UserRegisterDto } from 'src/app/models/user/userRegisterDto';
import { AuthService } from 'src/app/services/auth.service';
import { InterestsViewsService } from 'src/app/services/interests-views.service';
import { UserCredentialsViewsService } from 'src/app/services/user-credentials-views.service';
@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
})
export class WelcomePageComponent implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    private authService: AuthService,
    private interestsViewsService: InterestsViewsService,
    private userCredentialsService: UserCredentialsViewsService
  ) {}

  destroy$: Subject<boolean> = new Subject();
  allInterests: Interest[] | undefined = undefined;
  clickedOnToggleRegister: boolean = false;

  //WORK IN PROGRESS
  interestsArray: string[] = [];
  turnOnsArray: string[] = [];
  turnOffsArray: string[] = [];

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  toggleResiterForm() {
    this.clickedOnToggleRegister = !this.clickedOnToggleRegister;
    if (this.clickedOnToggleRegister) {
      this.interestsViewsService
        .getAllInterests()
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: any) => {
          this.allInterests = data;
        });
    }
  }

  login(userLoginDto: UserLoginDto) {
    this.authService
      .login(userLoginDto)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        complete: () => this.router.navigate(['user/main']),
      });
  }

  register(userRegisterInfo: UserRegisterDto) {
    this.authService
      .register(userRegisterInfo)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        complete: () => this.router.navigate(['user/main']),
      });
  }
}
