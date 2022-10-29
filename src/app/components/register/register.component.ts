import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject } from 'rxjs';
import { Interest } from 'src/app/models/interest';
import { UserRegisterDto } from 'src/app/models/user/userRegisterDto';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  constructor(private toastrService: ToastrService, private router: Router) {}

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe;
  }

  ngOnInit(): void {}

  destroy$: Subject<boolean> = new Subject();

  @Input() interestsArray: Interest[] | undefined = undefined;
  @Output() registerEventEmmiter: EventEmitter<any> = new EventEmitter();

  //TODO: Validators.required
  registerFormUserDetails: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    email: new FormControl(''),
    name: new FormControl(''),
    surname: new FormControl(''),
    dob: new FormControl(''),
    gender: new FormControl(''),
    listPreferedGenders: new FormControl(''), //REQUIRES PARSING
    aboutMe: new FormControl(''),
  });

  registerFormLocationDetails: FormGroup = new FormGroup({
    userLocation: new FormControl(''), //TO UPPERCASE()
    listPreferedLocations: new FormControl(''),
    longDistance: new FormControl(''),
  });

  listOfInterests: Interest[] = [];
  listOfTurnOns: Interest[] = [];
  listOfTurnOffs: Interest[] = [];

  registerFormUserPreferences: FormGroup = new FormGroup({});

  toggleChecked(checked: boolean, interestName: string, listToAddTo: string) {
    switch (listToAddTo) {
      case 'offs': {
        if (checked) this.handleAddToList(this.listOfTurnOffs, interestName, 2);
        else this.handleRemoveFromList(this.listOfTurnOffs, interestName);
        break;
      }
      case 'ons': {
        if (checked) this.handleAddToList(this.listOfTurnOns, interestName, 2);
        else this.handleRemoveFromList(this.listOfTurnOns, interestName);
        break;
      }
      case 'int': {
        if (checked)
          this.handleAddToList(this.listOfInterests, interestName, 3);
        else this.handleRemoveFromList(this.listOfInterests, interestName);
        break;
      }
      default: {
        this.toastrService.error(
          'I should not have entered here. HELP!',
          'Error'
        );
      }
    }
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
    if (
      this.listOfInterests.length === 3 &&
      this.listOfTurnOffs.length === 2 &&
      this.listOfTurnOns.length === 2
    )
      return true;
    return false;
  }

  shouldDisableCheckbox(list: Interest[], interestToCheck: string) {
    const foundInterest = list.find(
      (interest: Interest) => interest.category === interestToCheck
    );

    if (foundInterest) return false;
    else return true;
  }

  register() {
    if (this.registerFormUserDetails.valid && this.areListsValid()) {
      const prefGendersArray =
        this.registerFormUserDetails.value.listPreferedGenders.split(' ');

      let prefLocationsArray =
        this.registerFormLocationDetails.value.listPreferedLocations
          .split(',')
          .map((m: string) => m.toUpperCase());

      const longDistance =
        this.registerFormLocationDetails.value.longDistance === 'true'
          ? true
          : false;

      const objForRegister: UserRegisterDto = {
        username: this.registerFormUserDetails.value.username,
        email: this.registerFormUserDetails.value.email,
        password: this.registerFormUserDetails.value.password,
        gender: this.registerFormUserDetails.value.gender,
        fullName: `${this.registerFormUserDetails.value.name} ${this.registerFormUserDetails.value.surname}`,
        listGenders: prefGendersArray,
        longDistance: longDistance,
        location:
          this.registerFormLocationDetails.value.userLocation.toUpperCase(),
        dob: this.registerFormUserDetails.value.dob,
        listPrefLoc: prefLocationsArray,
        aboutMe: this.registerFormUserDetails.value.aboutMe,
        listInterests: this.listOfInterests.map(
          (inte: Interest) => inte.category
        ),
        listTurnOffs: this.listOfTurnOffs.map(
          (inte: Interest) => inte.category
        ),
        listTurnOns: this.listOfTurnOns.map((inte: Interest) => inte.category),
        profilePic: 'pictures/profile-pictures/user-avatar.png',
      };

      this.registerEventEmmiter.emit(objForRegister);
    } else {
      this.toastrService.info('Please enter all information needed', 'Info');
    }
  }
}
