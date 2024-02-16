//import React from 'react';
import { useState, useContext, useEffect } from 'react'
import { Card, RecurringContext }          from './context';
import axios from "axios";

export function Login() {
  const [show, setShow]           = useState(true) 
  const [email, setEmail]         = useState('')
  const [password, setPassword]   = useState('')
  const [disabled, setDisabled]   = useState(true)
  const [status, setStatus]       = useState('')
	const ctx = useContext(RecurringContext);
  const backendUrl = process.env.REACT_APP_BACKEND_URL

  useEffect(() => {   // initial state of Users CTX
    console.log(ctx.users)
    if (!ctx.users[0].isAnyoneLoggedIn) {
      setShow(true)
    } else {setShow(false)}
  }, [ctx.users] )

  function validate(field, label) {
    if (!field) {
      setStatus('Error - ' + label + ' field is empty.')
      setTimeout(() => setStatus(''), 3000);
      return false
    } else if (label === 'email' && field.length < 6) {
      setStatus('Error - as per IANA, this ' + label + ' is too short to function online. a min of 6 characters is required.')
      setTimeout(() => setStatus(''), 3000);
      return false    
    } else if (label === 'password' && field.length < 8) {
      setStatus('Error - ' + label + ' is too short. Passwords must be at least 8 characters in length.')
      setTimeout(() => setStatus(''), 3000);
      return false
    } else { return true }
  }    

  function FirstOnly(string) {
    if(string === undefined ) { 
      return 
    } else if (string.includes(' ')) {
          let names = string.split(' ');
    return names[0];
    }
  }

  function logout() {
    ctx.users[0].isAnyoneLoggedIn = false
    ctx.users.splice(1, 1)
    console.log('local ctx has been updated. User was Logged out.')
    console.log(ctx.users)
    setShow(true)
  }

  async function matchLogin() {
    console.log('Login attempted - email:' + email + " pw:" + password)
    if (!validate(email,    'email'))     return; 
    if (!validate(password, 'password'))  return; 

    const url1 = `${backendUrl}/account/pwemlval/${email}/${password}`
    try {     
      await axios.get(url1)
        .then(function (response) {          // handle success
          console.log(response.data);
          const url2 = `${backendUrl}/account/login/${email}/${password}`;
          (async () => {
            const  { data } = await axios.get(url2);
            await ctx.users.splice(1, 0,{name:data.name, email:data.email, balance:data.balance})
            ctx.users[1].firstName = await FirstOnly(ctx.users[1].name)
          })();
          setShow(false)
        })
        .catch(function (error) {          
          console.log(error.data);
        });
    } catch (e) {
      console.log(e.message)
    }   
  }

  return ( 
    <Card 
      bgcolor = 'warning'
      txtcolor = 'black'
      header  = 'Login'
      status  = {status}
      body    = {show ? (
        <>

        <h5>Example Credentials</h5>
			  login: ditto_boy@nintendo.js<br/>
        PW: copyeverything
        <br/> <br/>
      
        Email address<br/>
        <input type="input" className="form-control" id="email"
        placeholder="Enter email" value={email} 
        onChange={e =>{setDisabled(false); setEmail(e.target.value)}} />
        <br/>
        Password<br/>
        <input type="password" className="form-control" id="password"
        placeholder="Enter password" value={password} 
        onChange={e =>{setDisabled(false); setPassword(e.target.value)}} />
        <br/>
        <button disabled={disabled} type="submit" className="btn btn-light" onClick=
        {matchLogin}>Login</button>
        <br/>
        </>
      ) : (
        <>
        <h3>Welcome {ctx.users[1].firstName},</h3>
        <br/><h5> You are Logged In!</h5>
        <h5> What would you like to do next?</h5>
        <br/>
        <button type="submit" className="btn btn-light" onClick=
        {logout}>Logout</button>

        <a className="btn btn-primary" title="go to the Deposit page"  href="#/Deposit" >Deposit</a>
        <a className="btn btn-primary" title="go to the Withdraw page" href="#/withdraw">Withdraw</a>
        </>
      )}   
    />
  )
}

