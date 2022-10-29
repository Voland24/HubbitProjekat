import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject, take, takeUntil } from 'rxjs';
import { Interest } from 'src/app/models/interest';
import { UsersVisitProfileViews } from 'src/app/models/user/users_visit_profile_views';
import { InterestsViewsService } from 'src/app/services/interests-views.service';
import { UsersVisitProfileViewService } from 'src/app/services/users-visit-profile-view.service';
import { ModalService } from '../_modal';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss'],
})
export class UserSettingsComponent implements OnInit, OnDestroy {
  constructor(
    private userVisitProfileService: UsersVisitProfileViewService,
    private modalService: ModalService,
    private interestsViewsService: InterestsViewsService,
    private toastrService: ToastrService
  ) {}

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  userVisitProfileView: UsersVisitProfileViews | undefined = undefined;

  change: string | undefined = undefined;

  attribute!: FormControl;

  destroy$: Subject<boolean> = new Subject();

  allInterests: Interest[] | undefined = undefined;

  listOfInterests: Interest[] = [];

  ngOnInit(): void {
    const username = localStorage.getItem('username');
    if (username) this.loadUser(username);
  }

  loadUser(username: string) {
    this.userVisitProfileService
      .searchByUsername(username)
      .pipe(take(1))
      .subscribe({
        next: (data) => {
          this.userVisitProfileView = data;
        },
      });
  }

  loadInterests() {
    this.interestsViewsService
      .getAllInterests()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.allInterests = data;
      });
  }

  openModal(name: string) {
    this.modalService.open(name);
    if (name === 'modal-interests') {
      this.loadInterests();
    }
  }

  closeModal(name: string) {
    this.modalService.close(name);
  }

  updateUser() {
    const username = localStorage.getItem('username');
    if (username && this.change)
      this.userVisitProfileService
        .updateUserProfile(username, this.change, this.attribute.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          complete: () => {
            this.toastrService.success('Successfuly updated', 'Success');
            this.loadUser(username);
            this.modalService.close('modal');
          },
          error: () => {
            this.toastrService.error('There was an error', 'Error');
          },
        });
  }

  selectField(value: string) {
    this.change = value;
    if (this.userVisitProfileView) {
      if (value === 'gender') {
        this.attribute = new FormControl(this.userVisitProfileView.gender);
      } else
        this.attribute = new FormControl(this.userVisitProfileView.aboutMe);
    }
  }

  toggleChecked(checked: boolean, interestName: string, listToAddTo: string) {
    if (checked) this.handleAddToList(this.listOfInterests, interestName, 3);
    else this.handleRemoveFromList(this.listOfInterests, interestName);
  }

  handleAddToList(
    list: Interest[],
    interestName: string,
    maxNumberOfItemsInList: number
  ): boolean {
    if (list.length === maxNumberOfItemsInList) {
      this.toastrService.info('Already have enough items in this list', 'Info');
      return false;
    }
    const interestToAdd: Interest = {
      category: interestName,
    };
    list.push(interestToAdd);
    return true;
  }

  handleRemoveFromList(list: Interest[], interestName: string) {
    const interestIndex = list.findIndex(
      (interest: Interest) => interest.category === interestName
    );
    if (interestIndex != -1) list.splice(interestIndex, 1);
  }

  areListsValid(): boolean {
    if (this.listOfInterests.length === 3) return true;
    return false;
  }

  shouldDisableCheckbox(list: Interest[], interestToCheck: string) {
    const foundInterest = list.find(
      (interest: Interest) => interest.category === interestToCheck
    );

    if (foundInterest) return false;
    else return true;
  }

  updateInterests() {
    const forSend = this.listOfInterests.map(
      (interest: Interest) => interest.category
    );
    const username = localStorage.getItem('username');

    if (username && forSend) {
      this.userVisitProfileService
        .updateUserInterests(username, forSend)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          complete: () => {
            this.toastrService.success(
              'Successfuly updated interests!',
              'Success'
            );
            this.modalService.close('modal-interests');
            this.listOfInterests = [];
            this.loadUser(username);
          },
        });
    }
  }
}
