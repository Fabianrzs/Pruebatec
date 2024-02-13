import React from 'react'
import {useFormContext} from "react-hook-form";

type InputProps = {
  type: string,
  label?:string,
  id:string,
  name:string,
  defaultValue?: any
  placeholder?:string
  textArea?:boolean
}

export default function Input(props: InputProps) {
  const { type, label, id, name, defaultValue, placeholder, textArea } = props
  const { register, formState: { errors } } = useFormContext();
  return (
    <div className={label?"mb-3": ""}>
      {label&&<label htmlFor={id} className={"form-label"}>{label}</label>}
      {!textArea?<input id={id} className={`form-control ${placeholder&& " border-0"}`} {...register(String(name))}
              type={type} name={name} defaultValue={defaultValue} placeholder={placeholder}
      />:
        <textarea id={id} className={"mt-2 form-control border-0"} {...register(String(name))}
        name={name} defaultValue={defaultValue} placeholder={placeholder}/>}
      {errors[id] &&
          <span className="d-block text-left" >
            {"Llene el campo"}
          </span>
      }
    </div>
  )
}
