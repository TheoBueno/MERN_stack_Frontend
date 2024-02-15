import React from "react";
import { createContext } from 'react';

export const RecurringContext = createContext(null) // to be removed

export function Card(props) {
  function classes() {
    const bg  = props.bgcolor  ? ' bg-'   + props.bgcolor  : ' ';
    const txt = props.txtcolor ? ' text-' + props.txtcolor : ' text-white';
    return 'card mb-3 ' + bg + txt
  }

  return (
    <div id="bankCard" className={classes()} style={{maxWidth: '18rem'}}>
      <h6 className="card-header text-bg-dark ">{props.header}</h6>
      <div className="card-body">
        {props.title  &&  (<h5 className="card-title">{props.title}</h5>)}
        {props.text   &&  (<p className="card-text">{props.text}</p>)}
        {props.body}
        {props.status &&  (<div id="createStatus">{props.status}</div>)}
      </div>
        {props.footer && (<div className="card-footer text-bg-info text-muted">{props.footer}</div>)}
    </div>
  )
}

/*<div className="card">
<div className="card-header text-bg-dark">
Home
</div>
<div className="card-body text-bg-secondary">
<h5 className="card-title">Special title treatment</h5>
<p className="card-text">        Welcome {ctx.users[0].name} <br/>
    Your balance is: ${ctx.users[0].balance}<br/>
    Login: <br/>
    Username: {ctx.users[0].email} <br/>
    PW: {ctx.users[0].password} <br/>
    <br/>
    {JSON.stringify(ctx)}</p>
</div>
<div className="card-footer text-bg-info text-muted">
2 days ago
</div>
</div>*/