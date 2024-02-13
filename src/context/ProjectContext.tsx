import React, { createContext, useEffect, useReducer } from "react";
import { Project } from "../models/Project";
import { projectReducer, ProjectState } from "../store/reducer/Project";
import projectServices from "../services/ProjectService";
import { getUserId } from "../services/storage";
import { log } from "console";

type ProjectContextProps = {
  projects: Project[];
  projectState: ProjectState;
  getAllProjects: () => void;
  createProject: (project: Project) => void;
  deleteProject: (projectId: string) => void;
  updateProject: (project: Project) => void;
  removeProjectError: () => void;
  addProjectError: (error: string) => void;
};

const initialProjectState: ProjectState = {
  errorMessage: '',
  projects: [],
  status: 'loading'
};

export const ProjectContext = createContext({} as ProjectContextProps);

export const ProjectProvider = ({ children }: { children: JSX.Element | JSX.Element[] }) => {

  const [projectState, projectDispatch] = useReducer(projectReducer, initialProjectState);

  const { getAll, create, delete: deleteProject, update } = projectServices;
  const { projects } = projectState;

  useEffect(() => {
    console.log(projectState);
  }, [projectState]);

  const getAllProjectsHandler = async () => {
    try {
      var id = getUserId()
      const response = await getAll(id);
      projectDispatch({ type: "getAll", payload: { projects: response } });
    } catch (error: any) {

      projectDispatch({ type: "addError", payload: { error: error.err.response.data } });
    }
  };

  const createProjectHandler = async (project: Project) => {
    try {
      console.log(project);
      var id = getUserId()
      project.owner = id;
      const response = await create(project);
      projectDispatch({ type: "add", payload: { project: response } });
    } catch (error: any) {
      projectDispatch({ type: "addError", payload: { error: error.err.response.data } });
    }
  };

  const deleteProjectHandler = async (projectId: string) => {
    try {
      await deleteProject(projectId);
      const newProjects = projects.filter(proj => proj.id !== projectId);
      projectDispatch({ type: "delete", payload: { projects: newProjects } });
    } catch (error: any) {
      projectDispatch({ type: "addError", payload: { error: error.err.response.data } });
    }
  };

  const updateProjectHandler = async (project: Project) => {
    try {
      const response = await update(project);
      const newProjects = projects.map(proj => proj.id === project.id ? response : proj);
      projectDispatch({ type: "update", payload: { projects: newProjects } });
    } catch (error: any) {
      projectDispatch({ type: "addError", payload: { error: error.err.response.data } });
    }
  };

  const removeProjectErrorHandler = () => {
    projectDispatch({ type: "removeError", payload: {} });
  };

  const addProjectErrorHandler = (error: string) => {
    projectDispatch({ type: "addError", payload: { error: error } });
  };

  return (
    <ProjectContext.Provider value={{ projects, projectState, getAllProjects: getAllProjectsHandler, createProject: createProjectHandler, deleteProject: deleteProjectHandler, updateProject: updateProjectHandler, removeProjectError: removeProjectErrorHandler, addProjectError: addProjectErrorHandler }}>
      {children}
    </ProjectContext.Provider>
  );
};
