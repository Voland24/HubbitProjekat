import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserRecommendedViews } from '../models/user/users_recommended_views';

@Injectable({
  providedIn: 'root',
})
export class UserRecommendedViewsService {
  constructor(private httpClient: HttpClient) {}

  getAllUserRecommendedViews() {
    return this.httpClient.get<UserRecommendedViews[]>(
      `${environment.apiURL}usersRecommendation`
    );
  }

  createNewRecommendedUser(newRecommendedUser: UserRecommendedViews) {
    return this.httpClient.post(
      `${environment.apiURL}usersRecommendation/createNewRecommendedUser`,
      newRecommendedUser
    );
  }

  deleteRecommendedUser(username: string) {
    let params = new HttpParams();
    params = params.append('username', username);
    return this.httpClient.delete(
      `${environment.apiURL}usersRecommendation/deleteRecommendedUser`,
      {
        params: params,
      }
    );
  }
}
