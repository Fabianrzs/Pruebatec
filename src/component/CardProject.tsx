import React, { useContext } from "react";
import Form from "./common/Form";
import { useForm } from "react-hook-form";
import Input from "./common/Input";
import { ProjectContext } from "../context/ProjectContext";

export default function CardNote({ cancel }: any) {

  const { addProjectError } = useContext(ProjectContext)

  const formMethods = useForm({
    mode: "onBlur", defaultValues: {
      title: '',
      description: ''
    }
  })

  const children = <>
    <Input placeholder={"Titulo"} id={"title"}
      name={"title"} type={"text"} />
    <Input placeholder={"Descripcion"} id={"description"}
      name={"description"} type={"text"} textArea />
  </>
  return (
    <Form formMethods={formMethods} id={"formTodoList"} close onSubmitClose={cancel}
      onSubmit={addProjectError} btnText={"Guardar"} children={children} />
  )
}
