import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Interest } from '../models/interest';

@Injectable({
  providedIn: 'root',
})
export class InterestsViewsService {
  constructor(private httpClient: HttpClient) {}

  getAllInterests() {
    return this.httpClient.get<Interest[]>(`${environment.apiURL}interests`);
  }

  createNewInterest(newInterest: Interest) {
    return this.httpClient.post(
      `${environment.apiURL}interests/createNewInterest`,
      newInterest
    );
  }

  deleteInterest(category: string) {
    let params = new HttpParams();
    params = params.append('category', category);
    return this.httpClient.delete(
      `${environment.apiURL}interests/deleteInterest`,
      { params: params }
    );
  }
}
