import React, { useContext, useEffect, useState } from "react";
import { ProjectContext } from "../context/ProjectContext";
import Alert from "../component/common/Alert";
import Button from "../component/common/Button";
import { AuthContext } from "../context/AuthContext";
import CardProject from "../component/CardProject";
import Project from "../component/Project";

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
          placeholder={"Crea una proyecto..."}
          onClick={() => setRegister(true)} /> : <CardProject cancel={() => setRegister(false)} />}
      </div>

      <div className={"row justify-content-center"}>
        {projects && projects.map(({ id, name, descriptions, end, start }, index) =>
          <div key={index} className={"col-4"}>
            <Project key={index} id={id} title={name} description={descriptions} end={end} start={start} />
          </div>)}
      </div>
    </div>
  )
}
