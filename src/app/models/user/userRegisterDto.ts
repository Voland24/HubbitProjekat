import { Interest } from '../interest';
export interface UserRegisterDto {
  fullName: string;
  username: string;
  email: string;
  dob: string;
  password: string;
  gender: string;
  listGenders: string[];
  longDistance: boolean;
  location: string;
  listPrefLoc: string[];
  aboutMe: string;
  listTurnOns: string[];
  listTurnOffs: string[];
  listInterests: string[];
  profilePic: string;
}
