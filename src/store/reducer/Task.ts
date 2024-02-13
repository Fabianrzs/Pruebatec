import { Task } from "../../models/Task";
import { TaskActionTypes, TaskAction } from "../Actions/Task";

export interface TaskState {
  errorMessage: string;
  tasks: Task[];
  status: 'loading' | 'success' | 'error';
}

export const taskReducer = (state: TaskState, action: TaskAction): TaskState => {
  switch (action.type) {
    case TaskActionTypes.GetAll:
      return {
        ...state,
        tasks: action.payload.tasks,
        status: "success"
      };
    case TaskActionTypes.Add:
      return {
        ...state,
        tasks: [...state.tasks, action.payload.task],
        status: "success"
      };
    case TaskActionTypes.Update:
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.task.id ? action.payload.task : task
        ),
        status: "success"
      };
    case TaskActionTypes.Delete:
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload.taskId),
        status: "success"
      };
    case TaskActionTypes.MarkComplete:
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.taskId ? { ...task, complete: true } : task
        ),
        status: "success"
      };
    case TaskActionTypes.MarkIncomplete:
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.taskId ? { ...task, complete: false } : task
        ),
        status: "success"
      };
    case TaskActionTypes.AddError:
      return {
        ...state,
        errorMessage: action.payload.error,
        status: "error"
      };
    case TaskActionTypes.RemoveError:
      return {
        ...state,
        errorMessage: "",
        status: "error"
      };
    default:
      return state;
  }
};
