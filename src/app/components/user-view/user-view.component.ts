import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject, takeUntil } from 'rxjs';
import { UsersVisitProfileViews } from 'src/app/models/user/users_visit_profile_views';
import { UserRelationshipViewsService } from 'src/app/services/user-relationship-views.service';
import { UsersVisitProfileViewService } from 'src/app/services/users-visit-profile-view.service';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss'],
})
export class UserViewComponent implements OnInit, OnDestroy {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usersVisitProfileViewService: UsersVisitProfileViewService,
    private userRelationshipViewsService: UserRelationshipViewsService,
    private toastrService: ToastrService
  ) {}

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  destroy$: Subject<boolean> = new Subject();
  myUsername: string | undefined = undefined;

  searchedUserUsername: string | undefined = undefined;
  searchedUser: Observable<UsersVisitProfileViews> | undefined = undefined;
  isBlockedUser: boolean = false;

  ngOnInit(): void {
    this.getUsernames();
    if (this.searchedUserUsername) {
      this.checkIfUserBlocked(this.searchedUserUsername);
      this.searchedUser = this.usersVisitProfileViewService.searchByUsername(
        this.searchedUserUsername
      );
    }
  }

  getUsernames() {
    const myUsername = localStorage.getItem('username');
    if (myUsername) this.myUsername = myUsername;
    const searchedUserUsername =
      this.route.snapshot.queryParamMap.get('username');
    if (searchedUserUsername) this.searchedUserUsername = searchedUserUsername;
  }

  checkIfUserBlocked(username: string) {
    const tempArray = localStorage.getItem('blocked');
    let blockedArray = [];
    if (tempArray) {
      blockedArray = JSON.parse(tempArray);
    }

    this.isBlockedUser = false;

    blockedArray.forEach((user: any) => {
      if (user.username === username) {
        this.isBlockedUser = true;
      }
    });
  }

  isThisMe() {
    if (this.myUsername === this.searchedUserUsername) return true;
    else return false;
  }

  blockUser(username: string) {
    if (this.myUsername)
      this.userRelationshipViewsService
        .blockUser(this.myUsername, username)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.toastrService.success('Successfuly blocked user', 'Success');
          },
          complete: () => {
            this.router.navigate(['user/search']);
          },
        });
  }

  unblockUser(username: string) {
    if (this.myUsername)
      this.userRelationshipViewsService
        .unblockUser(this.myUsername, username)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.toastrService.success('Successfuly unblocked user', 'Success');
            //localStorage.removeItem('blocked');
          },
          complete: () => {
            this.router.navigate(['user/search']);
          },
        });
  }
}
