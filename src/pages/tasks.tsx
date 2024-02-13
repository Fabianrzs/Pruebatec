import React, { useContext, useEffect, useState } from "react";
import { TaskContext } from "../context/TaskContext";
import Note from "../component/Note";
import CardNote from "../component/CardProject";
import Alert from "../component/common/Alert";
import Button from "../component/common/Button";
import { AuthContext } from "../context/AuthContext";

export default function Task() {

  const { tasks, getAllTasks } = useContext(TaskContext)
  const { logOut } = useContext(AuthContext)

  const [register, setRegister] = useState(false)

  useEffect(() => {
    getAllTasks('')
  }, [])

  useEffect(() => {
    setRegister(false)
  }, [tasks])

  return (
    <div className={"container-sm p-5 b-5 "}>
      <Button text={"Salir"} color={"danger"} onClick={logOut} />
      <Alert />
      <div className={"row justify-content-center p-5 m-3"}>
        {!register ? <input className={"form-control  border-1"}
          placeholder={"Crea una nota..."}
          onClick={() => setRegister(true)} /> : <CardNote cancel={() => setRegister(false)} />}
      </div>

      <div className={"row justify-content-center"}>
        {tasks.map(({ id, name, description }, index) =>
          <div key={index} className={"col"}>
            <Note key={index} id={id} title={name} description={description} />
          </div>)}
      </div>
    </div>
  )
}
