import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Conversation } from '../models/chat/conversation';

@Injectable({
  providedIn: 'root',
})
export class ConversationService {
  constructor(private httpClient: HttpClient) {}

  createNewConversation() {
    return this.httpClient.post(
      `${environment.apiURL}conversations/createNewConversation`,
      {}
    );
  }

  getSpecificUserConvo(username: string) {
    let params = new HttpParams();
    params = params.append('username', username);
    return this.httpClient.get<Conversation[]>(
      `${environment.apiURL}conversations/getSpecificUserConvo`,
      { params: params }
    );
  }

  //pretpostavljam da su member1 i member 2 usernames?
  getConvoForBothUsers(member1: string, member2: string) {
    let params = new HttpParams();
    params = params.append('member1', member1);
    params = params.append('member2', member2);
    return this.httpClient.get(
      `${environment.apiURL}conversations/getConvoForBothUsers`,
      { params: params }
    );
  }
}
