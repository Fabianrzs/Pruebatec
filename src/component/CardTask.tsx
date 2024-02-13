import React, { useContext } from "react";
import Form from "./common/Form";
import { useForm } from "react-hook-form";
import Input from "./common/Input";
import { TaskContext } from "../context/TaskContext";

export default function CardTask({ cancel, projectId }: any) {

  const { createTask } = useContext(TaskContext)

  const formMethods = useForm({
    mode: "onBlur", defaultValues: {
      name: '',
      description: '',
      complete: false,
      idProject: projectId ?? '',
    }
  })

  const children = <>
    <Input placeholder={"Name"} id={"name"}
      name={"name"} type={"text"} />
    <Input placeholder={"Descripcion"} id={"description"}
      name={"description"} type={"text"} textArea />
  </>
  return (
    <Form formMethods={formMethods} id={"formTodoList"} close onSubmitClose={cancel}
      onSubmit={createTask} btnText={"Guardar"} children={children} />
  )
}
