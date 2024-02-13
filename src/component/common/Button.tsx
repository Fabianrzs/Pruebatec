import React, {ButtonHTMLAttributes, useRef} from 'react'

type ButtonProps ={
  type?: "button" | "submit" | "reset" | undefined
  onSubmit?: any,
  text: string,
  color:string,
  small?: boolean
  [x: string]: any;
}

export default function Button(props: ButtonProps) {
  const {type, onSubmit, text, color, small, ...otherProps} = props
  
  const buttonRef = useRef(null)
  
  return (
    <button type={type} onSubmit={()=>onSubmit}
            {...otherProps} ref={buttonRef}
            className={`btn btn-${color} ${small && "btn-sm"}`}>{text}</button>
  )
}
