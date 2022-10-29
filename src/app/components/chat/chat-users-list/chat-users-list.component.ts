import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-chat-users-list',
  templateUrl: './chat-users-list.component.html',
  styleUrls: ['./chat-users-list.component.scss'],
})
export class ChatUsersListComponent implements OnInit, OnDestroy {
  constructor(private messagesService: MessagesService) {}

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  @Input() convoId: string | undefined = undefined;
  @Output() backgroundImageEmmiter: EventEmitter<number> = new EventEmitter();
  @Output() bubbleColorEmmiter: EventEmitter<string> = new EventEmitter();

  destroy$: Subject<boolean> = new Subject();

  searchValue = new FormControl('');
  numberOfMessagesFound: number = -1;

  numbers: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  color: string = '';
  ngOnInit(): void {}

  setBackground(numberOfBackground: number) {
    this.backgroundImageEmmiter.emit(numberOfBackground);
  }

  changeColor() {
    this.bubbleColorEmmiter.emit(this.color);
  }

  searchMessages() {
    if (this.convoId)
      this.messagesService
        .findSpecificMessage(this.convoId, this.searchValue.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (data: any) => {
            this.numberOfMessagesFound = data.length;
          },
        });
  }
}
