import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UsersSearchViews } from '../models/user/users_search_views';

@Injectable({
  providedIn: 'root',
})
export class UserSearchViewsService {
  constructor(private httpClient: HttpClient) {}

  getSpecificUser(searchMode: string, valueForSend: string) {
    let params = new HttpParams();
    params = params.append('searchMode', searchMode);

    switch (searchMode) {
      case 'l': {
        params = params.append('location', valueForSend.toUpperCase());
        break;
      }
      case 'u': {
        params = params.append('username', valueForSend);
        break;
      }
      default: {
        params = params.append('fullName', valueForSend);
      }
    }
    return this.httpClient.get(
      `${environment.apiURL}usersSearch/getSpecificUser`,
      { params: params }
    );
  }

  createNewSearchUser(newUser: UsersSearchViews) {
    return this.httpClient.post(
      `${environment.apiURL}usersSearch/createNewSearchUser`,
      newUser
    );
  }

  deleteSearchUser(username: string) {
    let params = new HttpParams();
    params = params.append('username', username);
    return this.httpClient.delete(
      `${environment.apiURL}usersSearch/deleteSearchUser`,
      { params: params }
    );
  }
}
