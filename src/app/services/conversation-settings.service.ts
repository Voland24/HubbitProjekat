import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ConversationSettingsService {
  constructor(private httpClient: HttpClient) {}

  getSpecificConverastionSettings(conversationId: string) {
    let params = new HttpParams();
    params = params.append('conversationId', conversationId);

    return this.httpClient.get(`${environment.apiURL}conversationSettings`, {
      params,
    });
  }

  updateConversationSettings(
    conversationId: string,
    mode: string,
    bubbleColour: string,
    backgroundImage: string
  ) {
    return this.httpClient.put(
      `${environment.apiURL}conversationSettings/updateConversationSettings`,
      {
        conversationId,
        mode,
        bubbleColour,
        backgroundImage,
      },
      { responseType: 'text' }
    );
  }
}
