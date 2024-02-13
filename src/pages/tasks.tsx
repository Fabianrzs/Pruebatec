import React, { useContext, useEffect, useState } from "react";
import { TaskContext } from "../context/TaskContext";
import CardTask from "../component/CardTask";
import Alert from "../component/common/Alert";
import Button from "../component/common/Button";
import { AuthContext } from "../context/AuthContext";
import { useParams, useNavigate } from 'react-router-dom';
import Task from "../component/Task";


export default function Tasks() {

  const { tasks, getAllTasks } = useContext(TaskContext)
  const { logOut } = useContext(AuthContext)
  const { projectId } = useParams(); // Obtenemos el parámetro "projectId" de la URL
  const navigate = useNavigate();

  const [register, setRegister] = useState(false)

  useEffect(() => {
    getAllTasks(projectId ?? '')
  }, [])

  useEffect(() => {
    setRegister(false)
  }, [tasks])

  return (
    <div className={"container-sm p-5 b-5 "}>
      <Button text={"volver"} color={"primary"} onClick={() => navigate(`/Project`)} />
      <Alert />
      <div className={"row justify-content-center p-5 m-3"}>
        {!register ? <input className={"form-control  border-1"}
          placeholder={"Crea una Tarea..."}
          onClick={() => setRegister(true)} /> : <CardTask projectId={projectId} cancel={() => setRegister(false)} />}
      </div>
      <div className={"row justify-content-center"}>
        {tasks.map(({ id, name, description }, index) =>
          <div key={index} className={"col-4"}>
            <Task key={index} id={id} title={name} description={description} />
          </div>)}
      </div>

    </div>
  )
}
