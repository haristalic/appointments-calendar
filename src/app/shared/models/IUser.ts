import { IProfile } from '../models';

export interface IUser {
  profile: IProfile;
  usertype: string;
  typename: string;
}
