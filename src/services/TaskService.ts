import { Task } from "../models/Task";
import api, { taskControllers } from "./api";

const { apiGet, apiPost, apiPut, apiDelete } = api;

export default {
  async getAll(projectId: string): Promise<Task[]> {
    try {
      const request = await apiGet<Task[]>(`${taskControllers}${projectId}`);
      return request.data;
    } catch (error) {
      console.error("Error fetching tasks:", error);
      return [];
    }
  },

  async create(task: Task): Promise<Task | null> {
    try {
      const request = await apiPost<Task>(`${taskControllers}/create`, task);
      return request.data;
    } catch (error) {
      console.error("Error creating task:", error);
      return null;
    }
  },

  async update(task: Task): Promise<Task | null> {
    try {
      const request = await apiPut<Task>(`${taskControllers}/update/${task.id}`, task);
      return request.data;
    } catch (error) {
      console.error("Error updating task:", error);
      return null;
    }
  },

  async unavilitable(taskId: string): Promise<void> {
    try {
      await apiDelete<Task>(`${taskControllers}/delete/${taskId}`);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  }
};
