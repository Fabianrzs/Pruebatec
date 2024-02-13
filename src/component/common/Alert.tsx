import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from "../../context/AuthContext";

type AlertProps = {
  color?: string,
}

export default function Alert(props: AlertProps) {
  const { stateAuth, RemoveError: RAuth } = useContext(AuthContext)
  const [visible, setVisible] = useState(false)
  const [message, setMessage] = useState("")


  const validError = () => {
    if (stateAuth.errorMessage.length > 0) {
      setMessage(stateAuth.errorMessage)
      setVisible(true)
    }
    setTimeout(() => setVisible(false), 5000)
  }

  useEffect(() => {
    validError()
  }, [stateAuth])

  useEffect(() => {
    setTimeout(() => { setVisible(false) }, 2000)
  }, [])

  return (
    <div className={`alert alert-danger text-center ${visible == false && " d-none"}`} role="alert">
      {message}
    </div>
  )
}
