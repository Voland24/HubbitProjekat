import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UserLoginDto } from '../models/user/userLoginDto';
import { UserRegisterDto } from '../models/user/userRegisterDto';
import { SocketService } from './socket.service';
import { UserCredentialsViewsService } from './user-credentials-views.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private socketService: SocketService,
    private userCredentialsService: UserCredentialsViewsService
  ) {}

  login(userCredentials: UserLoginDto) {
    const username = userCredentials.username;
    const password = userCredentials.password;
    return this.httpClient
      .post(`${environment.apiURL}usersCredentials/login`, {
        username,
        password,
      })
      .pipe(
        map((response: any) => {
          if (response.token != '') {
            localStorage.setItem('token', response.token);
            localStorage.setItem('username', username);
          }
          return response;
        })
      );
  }

  loggedIn(): boolean {
    const token = localStorage.getItem('token');
    if (token) return true;
    else return false;
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.socketService.emit('disconnectUser', '');
    this.router.navigate(['/']);
  }

  register(newUser: UserRegisterDto) {
    return this.userCredentialsService.createNewUserCredentials(newUser).pipe(
      map((response: any) => {
        if (response.token != '') {
          localStorage.setItem('token', response.token);
          localStorage.setItem('username', newUser.username);
        }
        return response.token;
      })
    );
  }
}
