import axios from "axios";
import { Request } from "../models/Request";

export const userControllers = "User/"
export const todoListControllers = "Note/"
export const taskControllers = "Task/"
export const projectControllers = "Project/"

const baseUrl = 'https://localhost:5001/api'

const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}

const api = axios.create({ baseURL: baseUrl, headers: headers })

export default {
  async apiGet<TEntity>(path: string, body?: {}): Promise<Request<TEntity>> {
    try {
      return (await api.get(path, body)).data
    } catch (err) {
      console.log(err);
      throw { err }
    }
  },
  async apiPost<TEntity>(path: string, body: TEntity): Promise<Request<TEntity>> {
    try {
      console.log(body)
      return (await api.post(path, body)).data
    } catch (err) {
      console.log(err);
      throw { err }
    }
  },
  async apiPut<TEntity>(path: string, body: TEntity): Promise<Request<TEntity>> {
    try {
      return (await api.put(path, body)).data
    } catch (err) {
      console.log(err);
      throw { err }
    }
  },
  async apiPatch<TEntity>(path: string, body: TEntity): Promise<Request<TEntity>> {
    try {
      return (await api.patch(path, body)).data
    } catch (err) {
      console.log(err);
      throw { err }
    }
  },
  async apiDelete<TEntity>(path: string, body?: {}): Promise<Request<TEntity>> {
    try {
      return (await api.delete(path, body)).data
    } catch (err) {
      console.log(err);
      throw { err }
    }
  },
}
