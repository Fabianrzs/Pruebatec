import React, { useContext, useEffect, useState } from "react";
import { TaskContext } from "../context/TaskContext";
import CardNote from "../component/CardProject";
import Alert from "../component/common/Alert";
import Button from "../component/common/Button";
import { AuthContext } from "../context/AuthContext";
import { useParams, useNavigate } from 'react-router-dom';


export default function Task() {

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
          placeholder={"Crea una nota..."}
          onClick={() => setRegister(true)} /> : <CardNote cancel={() => setRegister(false)} />}
      </div>


    </div>
  )
}
