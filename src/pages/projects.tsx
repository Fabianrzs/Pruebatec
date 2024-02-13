import React, { useContext, useEffect, useState } from "react";
import { ProjectContext } from "../context/ProjectContext";
import Note from "../component/Note";
import CardNote from "../component/CardProject";
import Alert from "../component/common/Alert";
import Button from "../component/common/Button";
import { AuthContext } from "../context/AuthContext";

export default function Projects() {

  const { projects, getAllProjects } = useContext(ProjectContext)
  const { logOut } = useContext(AuthContext)

  const [register, setRegister] = useState(false)

  useEffect(() => {
    getAllProjects()
  }, [])

  useEffect(() => {
    setRegister(false)
  }, [projects])

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
        {projects.map(({ id, name, descriptions }, index) =>
          <div key={index} className={"col"}>
            <Note key={index} id={id} title={name} description={descriptions} />
          </div>)}
      </div>
    </div>
  )
}
