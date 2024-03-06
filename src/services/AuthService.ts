import { User } from "../models/User";
import api, { userControllers } from "./api"
const { apiPost } = api

export default {
  async login(data: User) {
    const request = await apiPost<User>(`Oauth/Token`, data)
    console.log("request",request)
    return request.data
  },
  async register(data: User) {
    const request = await apiPost<User>(`${userControllers}`, data)
    return request.data
  },
}
