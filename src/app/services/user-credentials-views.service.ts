import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserRegisterDto } from '../models/user/userRegisterDto';
import { UsersCredentialsViews } from '../models/user/users_credentials_views_model';

@Injectable({
  providedIn: 'root',
})
export class UserCredentialsViewsService {
  constructor(private httpClient: HttpClient) {}

  getSpecificUserCredentials(username: string) {
    let params = new HttpParams();
    params = params.append('username', username);
    return this.httpClient.get<UsersCredentialsViews>(
      `${environment.apiURL}usersCredentials/specificUserCredentials`
    );
  }

  createNewUserCredentials(newUserCredentials: UserRegisterDto) {
    return this.httpClient.post(
      `${environment.apiURL}usersCredentials/createNewUserCredentials`,
      { ...newUserCredentials }
    );
  }

  //sta se ovde updatuje?
  updateUserCredentials(username: string, password: string) {
    return this.httpClient.put(
      `${environment.apiURL}usersCredentials/createNewUserCredentials`,
      {
        username,
        password,
      }
    );
  }

  deleteUserCredentials(username: string) {
    let params = new HttpParams();
    params = params.append('username', username);
    return this.httpClient.delete(
      `${environment.apiURL}usersCredentials/deleteUserCredentials`,
      { params: params }
    );
  }
}
