import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject, take, takeUntil } from 'rxjs';
import { UserRecommendedViews } from 'src/app/models/user/users_recommended_views';
import { SocketService } from 'src/app/services/socket.service';
import { UserAlgorithmViewsService } from 'src/app/services/user-algorithm-views.service';
import { UserRelationshipViewsService } from 'src/app/services/user-relationship-views.service';

const contactCreated: string = 'New convo added';
const firstRightSwipe: string = 'First right swipe';
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit, OnDestroy {
  constructor(
    private userAlgorithmViewsService: UserAlgorithmViewsService,
    private userRelationshipViewsService: UserRelationshipViewsService,
    private toastrService: ToastrService,
    private socketService: SocketService
  ) {}

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  index = 0;

  currentUsername: string | undefined = undefined;
  potentialPartners: UserRecommendedViews[] | undefined = undefined;
  destroy$: Subject<boolean> = new Subject();

  ngOnInit(): void {
    const username = localStorage.getItem('username');
    if (username) {
      this.currentUsername = username;
      this.getPotentialPartners(username);
    }

    this.socketService
      .listen('notify')
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (usernameToNotify: any) => {
          if (
            this.currentUsername &&
            this.currentUsername === usernameToNotify
          ) {
            this.toastrService.success('MATCH', 'SUCCESS');
          }
        },
      });
  }

  getPotentialPartners(username: string) {
    this.userAlgorithmViewsService
      .getRecommendationsForUser(username)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: UserRecommendedViews[]) => {
          this.potentialPartners = data;
        },
      });
  }

  swipeRight(potentialPartnerUsername: string): void {
    if (this.currentUsername)
      this.userRelationshipViewsService
        .swipeRight(this.currentUsername, potentialPartnerUsername)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response: string) => {
            if (response === contactCreated) {
              //SOCKET IO
              this.toastrService.success('MATCH', 'SUCCESS');
              this.socketService.emit(
                'newConvoAdded',
                potentialPartnerUsername
              );
            }

            //TODO: MAKE ANIMATION
            if (response === firstRightSwipe) {
              this.toastrService.info('SWIPED RIGHT!', 'INFO');
            }
          },
        });
    this.nextPerson();
  }

  swipeLeft(potentialPartnerUsername: string): void {
    //API CALL
    if (this.currentUsername)
      this.userRelationshipViewsService
        .swipeLeft(this.currentUsername, potentialPartnerUsername)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response: string) => {
            //TODO: MAKE ANIMATION
            this.toastrService.success('SWIPED LEFT!', 'SUCCESS');
          },
        });
    this.nextPerson();
  }

  nextPerson() {
    if (
      this.potentialPartners &&
      this.index < this.potentialPartners.length - 1
    )
      this.index++;
    else {
      this.toastrService.info('No more people like you.', 'Info');
      this.potentialPartners = [];
    }
  }
}
