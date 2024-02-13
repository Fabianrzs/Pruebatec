import React from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../models/User";
import { createContext, useEffect, useReducer } from "react";
import { authReducer, AuthState } from "../store/reducer/Auth";
import service from "../services/AuthService";

type contextProps = {
  user: User;
  status: 'checking' | 'auth' | 'no-auth';
  stateAuth: AuthState
  signUp: (data: User) => void;
  signIn: (data: User) => void;
  logOut: () => void;
  RemoveError: () => void,
  AddError: (error: string) => void
}
const authInicialState: AuthState = {
  status: 'checking',
  token: null,
  user: {} as User,
  errorMessage: ''
}

export const AuthContext = createContext({} as contextProps)

export const AuthProvider = ({ children }: { children: JSX.Element | JSX.Element[] }) => {

  const [stateAuth, dispatch] = useReducer(authReducer, authInicialState);
  const { login, register } = service

  useEffect(() => {
    checkToken().then()
  }, [])

  useEffect(() => {
    console.log("Aqui tooi ", stateAuth)
  }, [stateAuth])


  const navigate = useNavigate();

  useEffect(() => {
    validRoute().then()
  }, [stateAuth.status])

  const validRoute = async () => {
    switch (stateAuth.status) {
      case "no-auth":
        navigate("/")
        break;
      case "auth":
        navigate("/Project")
        break;
    }
  }

  const checkToken = async () => {
    const data = JSON.parse(localStorage.getItem('localSesion') as string);
    !data ? dispatch({ type: 'no-auth' }) :
      dispatch({
        type: 'signUp',
        payload: {
          token: data,
          user: data
        }
      })
  }

  const signUp = async (data: User) => {
    try {
      const response = await register(data)
      dispatch({
        type: 'signUp',
        payload: {
          token: response.token,
          user: response
        }
      });
      localStorage.setItem('localSesion', JSON.stringify(response));
    } catch (e: any) {
      dispatch({ type: "addError", payload: { error: e.err.response.data } })
    }
  };
  const signIn = async (data: User) => {
    try {
      const response = await login(data)
      dispatch({
        type: 'signUp',
        payload: {
          token: response.token,
          user: response
        }
      });
      localStorage.setItem('localSesion', JSON.stringify(response));
      navigate("/Project")
    } catch (e: any) {
      dispatch({ type: "addError", payload: { error: e.err.response.data } })
    }
  };
  const logOut = async () => {
    localStorage.removeItem('localSesion')
    dispatch({ type: 'loaded' })
    setTimeout(() => {
      dispatch({ type: 'logout' })
    }, 1000)
  };

  const RemoveError = () => {
    dispatch({ type: "removeError" })
  }

  const AddError = (error: string) => {
    dispatch({ type: "addError", payload: { error: error } })
  }

  return (
    <AuthContext.Provider value={{ ...stateAuth, stateAuth, signUp, signIn, logOut, RemoveError, AddError }}>
      {children}
    </AuthContext.Provider>
  )
}
