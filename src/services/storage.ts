import { User } from "../models/User";

export default function getUserId(): string | undefined {
  const user = JSON.parse(localStorage.getItem("localSesion") || "") as User
  return user.id
}
