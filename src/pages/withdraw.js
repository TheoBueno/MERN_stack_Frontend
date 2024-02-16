//import React from 'react';
import { useState, useContext }   from 'react';
import { Card, RecurringContext } from './context';
import axios from "axios";
const backendUrl = process.env.REACT_APP_BACKEND_URL

export function Withdraw() {
  const [show, setShow] = useState(true)
  const [draw, setDraw] = useState(0)
  const [disabled, setDisabled] = useState(true)
  const [status, setStatus]     = useState('')
  const ctx = useContext(RecurringContext);

function validate(balance, draw) {
  if (isNaN(draw)) {
    setStatus('Withdraw Input is Not a Number, please try again.')
    setTimeout(() => setStatus(''), 10000);
    alert(`Not a Number! The withdraw attempted used an Input that is Not a Number. Double check and try again.`)
    return false
  } else if (draw > balance) {
    setStatus('Overdraft attempted, please try again.')
    setTimeout(() => setStatus(''), 10000);
    alert(`Funds insuficient! You are attempting to overdraft your account. Double check and try again.`)
    return false
  } else if (draw <= 0) {
    setStatus('Please choose a positive amount to withdraw.')
    setTimeout(() => setStatus(''),3000);
    return false
  }
  return true         
}

async function transaction(draw) {
  const tran = await axios.get(`${backendUrl}/account/${ctx.users[1].email}/withdraw/${draw}`)
  await console.log(tran.data)
}

function withdrawBal() {
  let newBal = 0
  newBal = ctx.users[1].balance
  if (!validate(newBal, draw))      return;
  transaction(draw)
  newBal -= draw
  ctx.users[1].balance = newBal
  setShow(false)
}

function clearForm() {
  setDraw(0)
  setDisabled(true)
  setShow(true)
}

  return (
    <Card
      bgcolor = 'info'
      txtcolor = 'black'
      header  = 'Withdraw'
      status  = {status}
      body    = {show ? (
        <>
          <h3> Welcome {ctx.users[1].firstName}</h3>
          <br/>
          <h5> Your current balance: ${ctx.users[1].balance}</h5>
          <br/>
          Withdraw Amount<br/>
          <input type="number" className="form-control" id="withdraw"
          placeholder="Withdraw Amount" min={0} value={draw}
          onChange={e =>{setDisabled(false); setDraw((e.target.value))}} />
          <br/>
          <button disabled={disabled}  type="submit" className="btn btn-light"
          onClick={withdrawBal}>Withdraw</button>

          <a className="btn btn-primary" title="go to the Deposit page"  href="#/Deposit" >Deposit</a>
        </>
      ) : (
        <>
          <h5>Operation Successful!</h5> <br/>
          <p>Your funds have been withdrawn.</p>
          <h5>New Balance: ${ctx.users[1].balance}</h5>

          <button type="submit" className="btn btn-light" onClick=
          {clearForm}>Another Operation</button>

          <a className="btn btn-primary" title="go to the Deposit page" href="#/deposit">deposit</a>

        </>
      )}
    />
  )
}