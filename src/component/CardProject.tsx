import React, { useContext } from "react";
import Form from "./common/Form";
import { useForm } from "react-hook-form";
import Input from "./common/Input";
import { ProjectContext } from "../context/ProjectContext";

export default function CardProject({ cancel }: any) {

  const { createProject } = useContext(ProjectContext)

  const formMethods = useForm({
    mode: "onBlur", defaultValues: {
      name: '',
      descriptions: '',
      owner: '',
      start: '',
      end: '',
    }
  })

  const children = <>
    <Input placeholder={"Name"} id={"name"}
      name={"name"} type={"text"} />
    <Input placeholder={"Descripcion"} id={"descriptions"}
      name={"descriptions"} type={"text"} textArea />
    <Input placeholder={"Start"} id={"start"}
      name={"start"} type={"date"} />
    <Input placeholder={"End"} id={"end"}
      name={"end"} type={"date"} />
  </>
  return (
    <Form formMethods={formMethods} id={"formTodoList"} close onSubmitClose={cancel}
      onSubmit={createProject} btnText={"Guardar"} children={children} />
  )
}
