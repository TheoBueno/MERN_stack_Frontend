//import React from 'react';
import { useState, useContext }   from 'react';
import { Card, AppContext  } from './context';
import axios from "axios";
const backendUrl = process.env.REACT_APP_BACKEND_URL

export function Deposit() {
  const [show, setShow] = useState(true)
  const [dep, setDep]   = useState(0)
  const [disabled, setDisabled] = useState(true)
  const [status, setStatus]     = useState('')
  const ctx = useContext(AppContext );

function validate(balance, dep) {
  if (isNaN(dep)) {
    setStatus('Deposit Input is Not a Number, please try again.')
    setTimeout(() => setStatus(''), 10000);
    alert(`Not a Number! The Deposit attempted used an Input that is Not a Number. Double check and try again.`)
    return false
  } else if (dep <= 0) {
    setStatus('Please choose a positive amount to Deposit.')
    setTimeout(() => setStatus(''),3000);
    return false
  }
  return true         
}

async function transaction(dep) {
  const tran = await axios.get(`${backendUrl}/account/${ctx.users[0].email}/deposit/${dep}`)
  await console.log(tran.data)
}

function updateBalance() {
  let newBal = 0
  newBal = ctx.users[0].balance
  if (!validate(newBal, dep))      return;
  transaction(dep)
  newBal = newBal + Number(dep)
  ctx.users[0].balance = newBal
  setShow(false)
}

function clearForm() {
  setDep(0)
  setDisabled(true)
  setShow(true)
}

  return ( 
    <Card 
      bgcolor = 'success'
      txtcolor = ''
      header  = 'Deposit'
      status  = {status}
      body    = {show ? (
        <>
          <h3> Welcome {ctx.users.length > 0 && ctx.users[0].firstName}</h3>
          <br/>
          <h5> Your current balance: ${ctx.users.length > 0 && ctx.users[0].balance}</h5>
          <br/>
          Deposit Amount<br/>
          <input 
            type="number" 
            className="form-control" 
            id="Deposit"
            placeholder="Deposit Amount" 
            min={0} 
            value={dep}
            autoComplete="off"
            onChange={e =>{setDisabled(false); setDep((e.target.value))}} />
          <br/>
          <button disabled={disabled}  type="submit" className="btn btn-light"
          onClick={updateBalance}>Deposit</button>

          <a className="btn btn-primary" title="go to the Withdraw page" href="#/withdraw" >Withdraw</a>
        </>
      ) : (
        <>
          <h5>Operation Successful!</h5> <br/>
          <p>Your funds have been deposited.</p>
          <h5>New Balance: ${ctx.users[0].balance}</h5>

          <button type="submit" className="btn btn-light" onClick=
          {clearForm}>Another Operation</button>

          <a className="btn btn-primary" title="go to the Withdraw page" href="#/withdraw">Withdraw</a>
        </>
      )}   
    />
  )
}

// return(
//   <h1>Deposit here $_____<br/>
//   {JSON.stringify(ctx)}
// </h1>
// )