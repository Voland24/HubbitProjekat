import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { UserRelationshipViewsService } from 'src/app/services/user-relationship-views.service';
import { UserSearchViewsService } from 'src/app/services/user-search-views.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnDestroy {
  constructor(
    private userSearchViewsService: UserSearchViewsService,
    private userRelationshipViewsService: UserRelationshipViewsService,
    private router: Router
  ) {}

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  placeholder: string | undefined = undefined;

  destroy$: Subject<boolean> = new Subject();

  results: any | undefined = undefined;

  ngOnInit(): void {
    this.getMyBlockedUsers();
  }

  searchValue = new FormControl('', [Validators.required]);

  getMyBlockedUsers() {
    const username = localStorage.getItem('username');
    if (username)
      this.userRelationshipViewsService
        .getAllBlockedUsersForSpecificUser(username)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (data: any) => {
            localStorage.setItem('blocked', JSON.stringify(data));
          },
        });
  }

  selectFilter(value: string) {
    switch (value) {
      case 'username': {
        this.placeholder = 'u';
        break;
      }
      case 'location': {
        this.placeholder = 'l';
        break;
      }
      default: {
        this.placeholder = 'fn';
      }
    }
  }

  searchByFilter() {
    let valueForSend = this.searchValue.value;
    this.searchValue.setValue('');
    if (this.placeholder)
      this.userSearchViewsService
        .getSpecificUser(this.placeholder, valueForSend)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (data: any) => {
            this.results = data;
          },
        });
  }

  moveToUserViewPage(username: string) {
    this.router.navigate(['/user/view'], {
      queryParams: {
        username,
      },
    });
  }
}
