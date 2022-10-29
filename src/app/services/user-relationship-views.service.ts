import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UsersRelathionshipsViews } from '../models/user/users_relationships_views';

@Injectable({
  providedIn: 'root',
})
export class UserRelationshipViewsService {
  constructor(private httpClient: HttpClient) {}

  getSpecificUser(username: string) {
    let params = new HttpParams();
    params = params.append('username', username);
    return this.httpClient.get(
      `${environment.apiURL}usersRelationships/specificUser`,
      { params: params }
    );
  }

  createNewUser(newUser: UsersRelathionshipsViews) {
    return this.httpClient.post(
      `${environment.apiURL}usersRelationships/createNewUser`,
      newUser
    );
  }

  deleteUser(username: string) {
    let params = new HttpParams();
    params = params.append('username', username);
    return this.httpClient.delete(
      `${environment.apiURL}usersRelationships/deleteUser`,
      { params: params }
    );
  }

  getContactsForUser(username: string) {
    let params = new HttpParams();
    params = params.append('username', username);
    return this.httpClient.get(
      `${environment.apiURL}usersRelationships/getContactsForSpecificUser`,
      { params: params }
    );
  }

  swipeRight(userWhoSwipped: string, recommendedUser: string) {
    return this.httpClient.put(
      `${environment.apiURL}usersRelationships/swipeRight`,
      {
        userWhoSwipped,
        recommendedUser,
      },
      { responseType: 'text' }
    );
  }

  swipeLeft(userWhoSwipped: string, recommendedUser: string) {
    return this.httpClient.put(
      `${environment.apiURL}usersRelationships/swipeLeft`,
      {
        userWhoSwipped,
        recommendedUser,
      },
      { responseType: 'text' }
    );
  }

  blockUser(userWhoBlocked: string, blockedUser: string) {
    return this.httpClient.put(
      `${environment.apiURL}usersRelationships/blockUser`,
      {
        userWhoBlocked,
        blockedUser,
      },
      { responseType: 'text' }
    );
  }

  unblockUser(userWhoUnblocked: string, unblockedUser: string) {
    return this.httpClient.put(
      `${environment.apiURL}usersRelationships/unblockUser`,
      {
        userWhoUnblocked,
        unblockedUser,
      },
      { responseType: 'text' }
    );
  }

  getAllBlockedUsersForSpecificUser(username: string) {
    let params = new HttpParams();
    params = params.append('username', username);
    return this.httpClient.get(
      `${environment.apiURL}usersRelationships/getAllBlockedUsersForSpecificUser`,
      { params: params }
    );
  }
}
