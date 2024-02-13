import { Project } from "../../models/Project";


export type ProjectAction =
  | { type: 'getAll', payload: { projects: Project[] } }
  | { type: 'add', payload: { project: Project | null } }
  | { type: 'delete', payload: { projectId: string } }
  | { type: 'update', payload: { projects: (Project | null)[] } }
  | { type: 'addError', payload: { error: string } }
  | { type: 'removeError', payload: any };

export const ProjectActionTypes = {
  GetAll: 'getAll',
  Add: 'add',
  Delete: 'delete',
  Update: 'update',
  AddError: 'addError',
  RemoveError: 'removeError'
};