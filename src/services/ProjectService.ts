import { Project } from "../models/Project";
import api, { projectControllers } from "./api";

const { apiGet, apiPost, apiPut, apiDelete } = api;

export default {
  async getAll(projectId: string): Promise<Project[]> {
    try {
      const request = await apiGet<Project[]>(`${projectControllers}user/${projectId}`);
      return request.data;
    } catch (error) {
      console.error("Error fetching projects:", error);
      return [];
    }
  },

  async create(project: Project): Promise<Project | null> {
    try {
      console.log("Creating project", project);
      const request = await apiPost<any>(`${projectControllers}`, project);
      return request.data.data;
    } catch (error) {
      console.error("Error creating project:", error);
      return null;
    }
  },

  async update(project: Project): Promise<Project | null> {
    try {
      const request = await apiPut<Project>(`${projectControllers}/${project.id}`, project);
      return request.data;
    } catch (error) {
      console.error("Error updating project:", error);
      return null;
    }
  },

  async delete(projectId: string): Promise<void> {
    try {
      await apiDelete<Project>(`${projectControllers}${projectId}`);
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  }
};
