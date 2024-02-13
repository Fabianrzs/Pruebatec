import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./common/Button";
import { ProjectContext } from "../context/ProjectContext";
import moment from "moment";

type NoteProps = {
  id: string
  title: string
  description: string,
  start: Date;
  end: Date;
}

export default function Project(props: NoteProps) {

  const navigate = useNavigate();
  const { id, description, title, end, start } = props
  const { deleteProject } = useContext(ProjectContext)
  const formatDate = (date: Date) => {
    return moment(date).format("MMM Do YY");;
  }
  const openTasks = (id: string) => {
    navigate(`/Task/${id}`); // Concatenamos el id a la URL
  }
  return (
    <div key={id} className={"card border p-3 m-2 b-2"}
      style={{ cursor: "pointer" }}>
      <h3>{title}</h3>
      <p>{description}</p>
      <p style={{ color: 'blue' }}>Inicio: {formatDate(start)} - Fin: {formatDate(end)}</p>
      <div className="row">
        <Button text={"Borrar"} color={"danger"}
          small onClick={() => deleteProject(id)} />
        <Button text={"Ir"} color={"primary"}
          small onClick={() => openTasks(id)} />
      </div>
    </div>
  )
}
