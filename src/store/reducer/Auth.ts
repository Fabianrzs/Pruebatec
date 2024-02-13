import {AddError, AuthAction, Loaded, Logout, NoAuth, RemoveError, SignUp} from "../Actions/Auth";
import {User} from "../../models/User";

export interface AuthState {
  errorMessage: string,
  token: string | null,
  user: User
  status: 'checking' | 'auth' | 'no-auth'
}

export const authReducer = (state:AuthState, action:AuthAction):AuthState  => {
  switch (action.type) {
    case AddError:
      return {
        ...state,
        user: {} as User,
        status : 'no-auth',
        token: null,
        errorMessage: action.payload.error
      };
    case RemoveError:
      return {
        ...state,
        errorMessage: ''
      };
    case SignUp:
      return {
        ...state,
        errorMessage: '',
        status: 'auth',
        token: action.payload.token,
        user: action.payload.user
      };
    case Loaded:
      return {
        ...state,
        status: 'checking'
      };
    case Logout:
    case NoAuth:
      return {
        ...state,
        status : 'no-auth',
        user: {} as User,
        token: null
      };
    default:
      return state;
  }
}
