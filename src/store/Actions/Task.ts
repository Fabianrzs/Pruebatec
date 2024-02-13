import { Task } from "../../models/Task";

export type TaskAction =
  | { type: 'getAll', payload: { tasks: Task[] } }
  | { type: 'add', payload: { task: Task | null } }
  | { type: 'delete', payload: { taskId: string } }
  | { type: 'update', payload: { tasks: (Task | null)[] } }
  | { type: 'markComplete', payload: { taskId: string } }
  | { type: 'markIncomplete', payload: { taskId: string } }
  | { type: 'addError', payload: { error: string } }
  | { type: 'removeError', payload: any };

export const TaskActionTypes = {
  GetAll: 'getAll',
  Add: 'add',
  Delete: 'delete',
  Update: 'update',
  MarkComplete: 'markComplete',
  MarkIncomplete: 'markIncomplete',
  AddError: 'addError',
  RemoveError: 'removeError'
};