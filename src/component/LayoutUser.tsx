import React from "react";

export default function LayoutUser({children}: {children: JSX.Element | JSX.Element[]}){

  return(
    <div className={"d-flex vh-100 justify-content-center align-items-center"}>
      <div className={"row justify-content-md-center"}>
        <div className="card p-5 mb-3" style={{width: "30rem"}}>
          {children}
        </div>
      </div>
    </div>
  )
}
