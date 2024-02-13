import {User} from "../../models/User";

export type AuthAction =
  | {type: 'signUp', payload: {token: string, user: User}}
  | {type: 'addError', payload :{error: string}}
  | {type: 'removeError'}
  | {type: 'no-auth'}
  | {type: 'logout'}
  | {type: 'loaded'}

export const SignUp = 'signUp';
export const AddError = 'addError';
export const RemoveError = 'removeError';
export const NoAuth = 'no-auth';
export const Logout = 'logout';
export const Loaded = 'loaded';
