import { UserDto } from './user/userDto';

export interface Common {
  isLoggedIn: boolean;
  currentUser: UserDto;
}
