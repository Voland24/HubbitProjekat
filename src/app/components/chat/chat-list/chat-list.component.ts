import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { ChatHead } from 'src/app/models/chat/chat-head';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss'],
})
export class ChatListComponent implements OnInit, OnDestroy {
  constructor(private socketService: SocketService) {}

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  @Input() connectedUsers: any | undefined = undefined;
  @Output() chatListUserEmmiter: EventEmitter<string> = new EventEmitter();

  destroy$: Subject<boolean> = new Subject();

  listOfActiveUsers: any[] | undefined = undefined;

  isClickedOnUser: boolean[] = [];
  chats: Observable<any> | undefined = undefined;

  ngOnInit(): void {
    this.socketService.emit('giveUsers', '');

    this.socketService
      .listen('getUsers')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.listOfActiveUsers = data;
      });
  }

  emmitToChatPage(username: string) {
    this.chatListUserEmmiter.emit(username);
  }
}
