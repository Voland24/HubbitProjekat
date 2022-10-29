import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ChatHead as ChatHead } from 'src/app/models/chat/chat-head';

@Component({
  selector: 'app-chat-thumb',
  templateUrl: './chat-thumb.component.html',
  styleUrls: ['./chat-thumb.component.scss'],
})
export class ChatThumbComponent implements OnInit {
  constructor() {}

  @Input() user: any | undefined = undefined;
  @Output() userEmmiter: EventEmitter<string> = new EventEmitter();

  ngOnInit(): void {}

  showChat(user: any): void {
    this.userEmmiter.emit(user.username);
  }
}
