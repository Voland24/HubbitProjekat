import {
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { Message } from 'src/app/models/chat/message';
import { SocketService } from 'src/app/services/socket.service';
import { UserRelationshipViewsService } from 'src/app/services/user-relationship-views.service';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss'],
})
export class ChatBoxComponent
  implements OnInit, OnDestroy, OnChanges, AfterViewInit
{
  constructor(
    private socketService: SocketService,
    private renderer2: Renderer2,
    private userRelationshipsService: UserRelationshipViewsService
  ) {}

  ngAfterViewInit(): void {
    this.styleBackground();
  }

  styleBackground() {
    this.renderer2.setStyle(
      this.container.nativeElement,
      'background-image',
      `url(${this.backgroundImagePath})`
    );

    this.renderer2.setStyle(
      this.container.nativeElement,
      'background-size',
      'contain'
    );

    this.renderer2.setStyle(
      this.container.nativeElement,
      'background-repeat',
      'round'
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.senderUsername) this.sortMessages(this.senderUsername);
    if (this.container) this.styleBackground();
  }

  @Input() messages: any[] | undefined = undefined;
  @Input() convoId: string | undefined = undefined;
  @Input() backgroundImagePath: string | undefined = undefined;
  @Input() bubbleColor: string | undefined = undefined;

  @ViewChild('container') container!: ElementRef;

  @Output() newMessageEmmiter = new EventEmitter<any>();
  first: boolean = true;
  otherUser: string | undefined = undefined;
  senderUsername: string | undefined = undefined;
  messageToSend = new FormControl('');
  destroy$: Subject<boolean> = new Subject();
  hasUserBlockedMe: boolean = false;

  ngOnInit(): void {
    const username = localStorage.getItem('username');
    if (this.messages && username) {
      this.socketService.emit('addUser', username);

      this.socketService
        .listen('getMessage')
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (data: any) => {
            let newMessage: any = {
              conversationId: this.convoId,
              text: data.text,
              sender: data.senderUsername,
            };
            if (this.messages) {
              this.messages.push(newMessage);
            }
          },
        });

      this.senderUsername = username;
      this.sortMessages(username);
    }
  }

  checkIfUserHasBlockedMe(otherUser: string) {
    this.userRelationshipsService
      .getAllBlockedUsersForSpecificUser(otherUser)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          const foundUserIndex = data.findIndex(
            (d: any) => d.username === this.senderUsername
          );
          if (foundUserIndex === -1) this.hasUserBlockedMe = false;
          else this.hasUserBlockedMe = true;
        },
      });
  }

  sortMessages(username: string) {
    if (this.messages) {
      this.messages = this.messages.map((msg: Message) => {
        if (msg.sender === username) {
          return { ...msg, own: true };
        } else {
          if (this.first) {
            this.otherUser = msg.sender;
            this.first = false;
          }
          return { ...msg, own: false };
        }
      });

      if (this.otherUser) this.checkIfUserHasBlockedMe(this.otherUser);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  sendMessage(): void {
    if (this.senderUsername && this.convoId) {
      const objectForDbAndSocket = {
        sender: this.senderUsername,
        text: this.messageToSend.value,
        conversationId: this.convoId,
        receiver: this.otherUser,
      };
      if (this.messages)
        this.messages.push({
          sender: this.senderUsername,
          text: this.messageToSend.value,
          conversationId: this.convoId,
          own: true,
        });
      this.newMessageEmmiter.emit(objectForDbAndSocket);
      this.messageToSend.setValue('');
    }
  }
}
