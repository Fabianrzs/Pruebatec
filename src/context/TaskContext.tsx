import React, { createContext, useEffect, useReducer } from "react";
import { Task } from "../models/Task";
import { taskReducer, TaskState } from "../store/reducer/Task";
import taskServices from "../services/TaskService";
import { useParams, useNavigate } from 'react-router-dom';

type TaskContextProps = {
  tasks: Task[];
  taskState: TaskState;
  getAllTasks: (projectId: string) => void;
  createTask: (task: Task) => void;
  deleteTask: (taskId: string) => void;
  updateTask: (task: Task) => void;
  removeTaskError: () => void;
  addTaskError: (error: string) => void;
};

const initialTaskState: TaskState = {
  errorMessage: '',
  tasks: [],
  status: 'loading'
};

export const TaskContext = createContext({} as TaskContextProps);

export const TaskProvider = ({ children }: { children: JSX.Element | JSX.Element[] }) => {

  const { projectId } = useParams(); // Obtenemos el parámetro "projectId" de la URL

  const [taskState, taskDispatch] = useReducer(taskReducer, initialTaskState);

  const { getAll, create, unavilitable, update } = taskServices;
  const { tasks } = taskState;

  useEffect(() => {
    console.log(taskState);
  }, [taskState]);

  const getAllTasksHandler = async (projectId: string) => {
    try {
      const response = await getAll(projectId);
      taskDispatch({ type: "getAll", payload: { tasks: response } });
    } catch (error: any) {
      taskDispatch({ type: "addError", payload: { error: error.err.response.data } });
    }
  };

  const createTaskHandler = async (task: Task) => {
    console.log(task);
    try {
      const response = await create(task);
      taskDispatch({ type: "add", payload: { task: response } });
    } catch (error: any) {
      taskDispatch({ type: "addError", payload: { error: error.err.response.data } });
    }
  };

  const deleteTaskHandler = async (taskId: string) => {
    try {
      await unavilitable(taskId);
      const newTasks = tasks.filter(task => task.id !== taskId);
      taskDispatch({ type: "delete", payload: { tasks: newTasks } });
    } catch (error: any) {
      taskDispatch({ type: "addError", payload: { error: error.err.response.data } });
    }
  };

  const updateTaskHandler = async (task: Task) => {
    try {
      const response = await update(task);
      const newTasks = tasks.map(t => t.id === task.id ? response : t);
      taskDispatch({ type: "update", payload: { tasks: newTasks } });
    } catch (error: any) {
      taskDispatch({ type: "addError", payload: { error: error.err.response.data } });
    }
  };

  const removeTaskErrorHandler = () => {
    taskDispatch({ type: "removeError", payload: {} });
  };

  const addTaskErrorHandler = (error: string) => {
    taskDispatch({ type: "addError", payload: { error: error } });
  };

  return (
    <TaskContext.Provider value={{ tasks, taskState, getAllTasks: getAllTasksHandler, createTask: createTaskHandler, deleteTask: deleteTaskHandler, updateTask: updateTaskHandler, removeTaskError: removeTaskErrorHandler, addTaskError: addTaskErrorHandler }}>
      {children}
    </TaskContext.Provider>
  );
};
