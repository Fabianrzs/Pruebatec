import { User } from "../models/User";

export const getUserId = (): string => {
  const user = JSON.parse(localStorage.getItem("localSesion") || "") as User
  return user.id ?? ''
}
