import { Project } from "../../models/Project";
import { ProjectActionTypes, ProjectAction } from "../Actions/Project";

export interface ProjectState {
  errorMessage: string;
  projects: Project[];
  status: 'loading' | 'success' | 'error';
}

export const projectReducer = (state: ProjectState, action: ProjectAction): ProjectState => {
  switch (action.type) {
    case ProjectActionTypes.GetAll:
      return {
        ...state,
        projects: action.payload.projects,
        status: "success"
      };
    case ProjectActionTypes.Add:
      return {
        ...state,
        projects: [...state.projects, action.payload.project],
        status: "success"
      };
    case ProjectActionTypes.Update:
      return {
        ...state,
        projects: state.projects.map(project =>
          project.id === action.payload.project.id ? action.payload.project : project
        ),
        status: "success"
      };
    case ProjectActionTypes.Delete:
      return {
        ...state,
        projects: state.projects.filter(project => project.id !== action.payload.projectId),
        status: "success"
      };
    case ProjectActionTypes.AddError:
      return {
        ...state,
        errorMessage: action.payload.error,
        status: "error"
      };
    case ProjectActionTypes.RemoveError:
      return {
        ...state,
        errorMessage: "",
        status: "error"
      };
    default:
      return state;
  }
};
