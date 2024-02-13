import Button from "./Button";
import React from "react";
import {Link} from "react-router-dom";
import {FieldValues, FormProvider, UseFormReturn} from "react-hook-form";

type FormProps = {
  formMethods: UseFormReturn<any, any>,
  id: string,
  onSubmit: Function,
  btnText: string,
  children: JSX.Element | JSX.Element[],
  close?:boolean
  onSubmitClose?: Function,
}

export default function Form(props:FormProps){
  const {formMethods, id, onSubmit, btnText,
    children, close, onSubmitClose} = props
  
  return(
    <FormProvider {...formMethods}>
      <form id={id}
            onSubmit={formMethods.handleSubmit
            ((data: FieldValues)=>onSubmit(data))}>
        {children}
        {<Button
          type="submit"
          text={btnText}
          color={"primary m-2"}
          key ={"sucess"}
        />}
        {close && <Button
          type={"button"} color={"secondary"}
          onClick={onSubmitClose}
          className = {"m-2"}
          text ={"cancel"} key ={"cancel"}/>}
      </form>
    </FormProvider>
  )
}
