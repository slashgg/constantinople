import { User } from '@core/models/user';

export interface UserState {
  user?: User;
  initialized: boolean;
}
