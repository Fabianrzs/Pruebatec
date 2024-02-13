import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./common/Button";
import { TaskContext } from "../context/TaskContext";

type NoteProps = {
  id: string
  title: string
  description: string,
}

export default function Task(props: NoteProps) {

  const navigate = useNavigate();
  const { id, description, title } = props
  const { deleteTask } = useContext(TaskContext)
  const openComments = (id: string) => {
    navigate(`/Comments/${id}`); // Concatenamos el id a la URL
  }
  return (
    <div key={id} className={"card border p-3 m-2 b-2"}
      style={{ cursor: "pointer" }}>
      <h3>{title}</h3>
      <p>{description}</p>
      <div className="row">
        <Button text={"Borrar"} color={"danger"}
          small onClick={() => deleteTask(id)} />
        <Button text={"Ir"} color={"primary"}
          small onClick={() => openComments(id)} />
      </div>
    </div>
  )
}
