import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UsersVisitProfileViews } from '../models/user/users_visit_profile_views';

@Injectable({
  providedIn: 'root',
})
export class UsersVisitProfileViewService {
  constructor(private httpClient: HttpClient) {}

  getAllUserVisitProfileView() {
    return this.httpClient.get<UsersVisitProfileViews[]>(
      `${environment.apiURL}usersVisitProfile`
    );
  }

  searchByUsername(username: string) {
    let params = new HttpParams();
    params = params.append('username', username);
    return this.httpClient.get<UsersVisitProfileViews>(
      `${environment.apiURL}usersVisitProfile/searchByUsername`,
      { params: params }
    );
  }

  createNewUserProfileView(newUser: UsersVisitProfileViews) {
    return this.httpClient.post(
      `${environment.apiURL}usersVisitProfile/createNewUserProfileView`,
      newUser
    );
  }

  //change = "aboutMe" || "gender"
  updateUserProfile(username: string, change: string, attribute: string) {
    return this.httpClient.put(
      `${environment.apiURL}usersVisitProfile/updateUserProfile`,
      { username, change, attribute }
    );
  }

  deleteUser(username: string) {
    let params = new HttpParams();
    params = params.append('username', username);
    return this.httpClient.delete(
      `${environment.apiURL}usersVisitProfile/deleteUser`,
      { params: params }
    );
  }

  updateUserInterests(username: string, listInterests: string[]) {
    return this.httpClient.put(
      `${environment.apiURL}usersVisitProfile/updateUserInterests`,
      { username, listInterests }
    );
  }
}
