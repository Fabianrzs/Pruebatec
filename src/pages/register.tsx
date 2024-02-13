import React, {useContext} from "react";
import {AuthContext} from "../context/AuthContext";
import {useForm} from "react-hook-form";
import Input from "../component/common/Input";
import LayoutUser from "../component/LayoutUser";
import Form from "../component/common/Form";
import {NavLink} from "react-router-dom";
import Alert from "../component/common/Alert";

export default function Register(){
  const { signUp } = useContext(AuthContext);
  const formMethods = useForm({
    mode: "onChange",
    defaultValues: {UserName : "", Password : ""},
  });
  
  const children = <>
    <Input label={"Nombre de Usuario"} id={"UserName"}
           name={"UserName"}  type = {"text"}/>
    <Input label={"Contraseña"} id={"Password"}
           name={"Password"}   type = {"password"}/>
    <NavLink to={"/"} title={""}> Login</NavLink>
    <br/>
  </>
  
  return(
    <LayoutUser>
      <Alert/>
      <h3 className={"p-2 mb-4 text-center"}>Registrar Usuario</h3>
      <Form formMethods={formMethods} onSubmit={signUp}
            id={"formLogin"} children={children}
            btnText={"Registrarse"}/>
    </LayoutUser>
  )
}
