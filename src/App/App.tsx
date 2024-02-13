import React, { Suspense } from 'react';
import '../styles/App.css';
import Routes from "./Routes";
import Loading from "../component/common/Loading";
import { AuthProvider } from "../context/AuthContext";
import { ProjectProvider } from "../context/ProjectContext";
import { TaskProvider } from "../context/TaskContext";

export const AuthState = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  )
}

export const AppState = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  return (
    <ProjectProvider>
      <TaskProvider>
        {children}
      </TaskProvider>
    </ProjectProvider>
  )
}

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes />
    </Suspense>
  );
}

export default App;
