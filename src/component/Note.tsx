import React, { useContext } from "react";
import Button from "./common/Button";
import { ProjectContext } from "../context/ProjectContext";

type NoteProps = {
  id: string
  title: string
  description: string
}

export default function Note(props: NoteProps) {

  const { id, description, title } = props
  const { deleteProject } = useContext(ProjectContext)

  return (
    <div key={id} className={"card border p-3 m-2 b-2"}
      style={{ cursor: "pointer" }}>
      <h3>{title}</h3>
      <p>{description}</p>
      <Button text={"Borrar"} color={"danger"}
        small onClick={() => deleteProject(id)} />
    </div>
  )
}
