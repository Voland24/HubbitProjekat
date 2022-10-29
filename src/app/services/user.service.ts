import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserDto } from '../models/user/userDto';
import { UserLoginDto } from '../models/user/userLoginDto';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  //test func, DELETE THE WHOLE SERVICE AFTER!
  login(userLoginDto: UserLoginDto): Observable<UserDto[]> {
    let params = new HttpParams();
    params = params.append('username', userLoginDto.username);
    params = params.append('password', userLoginDto.password);
    return this.httpClient.get<UserDto[]>(`${environment.apiURL}users`, {
      params: params,
    });
  }
}
