import { useState, useContext } from 'react'
import { Card, AppContext  } from './context';
import axios                               from "axios";

export function Login() {
  // const [show, setShow]           = useState(true) 
  const [email, setEmail]         = useState('')
  const [password, setPassword]   = useState('')
  const [disabled, setDisabled]   = useState(true)
  const [status, setStatus]       = useState('')
	const ctx = useContext( AppContext );
  const { loginAccess, logout }  = ctx

  const backendUrl = process.env.REACT_APP_BACKEND_URL

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
    } else {
    return string 
    }
  }

  const updateUsersWithFirstName = (userData) => {
    const updatedUsers = [...ctx.users, userData];
    updatedUsers[updatedUsers.length - 1].firstName = FirstOnly(userData.name);
    ctx.setUsers(updatedUsers);
  };

  async function handleLogout() {
    setStatus('')
    try{
      await logout()
      // setShow(true);
    }catch(error){
      console.error('Failed to logout:', error);
      setStatus('Failed to logout')
      setTimeout(() => setStatus(''), 3000);
    }
  }

  async function matchLogin() {
    console.log('Login attempted - email:' + email)
    if (!validate(email,    'email'))     return; 
    if (!validate(password, 'password'))  return; 

    const url1 = `${backendUrl}/account/pwemlval/${email}/${password}`
    try {     
      const response = await axios.get(url1)
      console.log(response.data);
      
      if (response.data === true) {

        const url2 = `${backendUrl}/account/login/${email}/${password}`;
        const { data } = await axios.get(url2);

        const userData = {
          name: data.name,
          email: data.email,
          role: data.role,
          balance: data.balance
        };

        updateUsersWithFirstName(userData);

        loginAccess(email, password) 

        console.log('ctx.user[0]', ctx.users.length > 0 ? ctx.users[0] : 'On Loading');
        console.log('ctx', ctx)
      }else{
        setStatus('Invalid email/password combination');
        setTimeout(() => setStatus(''), 3000);
      }
    } catch (error) {        
      console.error('Error during login:', error);
      setStatus('Error during login. Please try again.');    
      setTimeout(() => setStatus(''), 3000);
    }   
  }

  return ( 
    <Card 
      bgcolor = 'warning'
      txtcolor = 'black'
      header  = 'Login'
      status  = {status}
      body    = { ctx.users.length <= 0 ? (
        <>
          <h5>Admin Credentials for Exploration</h5>
          <p>login: ditto_boy@nintendo.js<br/>PW: copyeverything</p>

          <label>Email address:</label>
          <input 
            type="input" 
            className="form-control" 
            id="email"
            placeholder="Enter email"
            autoComplete="email"
            value={email} 
            onChange={e =>{setDisabled(false); setEmail(e.target.value.trim())}} 
          />
          <br/>
          <label>Password:</label>
          <input 
            type="password" 
            className="form-control" 
            id="password"
            placeholder="Enter password" 
            autoComplete="current-password"
            value={password} 
            onChange={e =>{setDisabled(false); setPassword(e.target.value.trim())}} 
          />
          <br/>
          <button 
            disabled={disabled} 
            type="submit" 
            className="btn btn-light" 
            onClick={matchLogin}
          >
            Login
          </button>
          <br/>
        </>
      ) : (
        <>
        <h3>Welcome {
          ctx.users.length > 0 && ctx.users[0].firstName
        },</h3>
        <br/><h5> You are Logged In!</h5>
        <h5> What would you like to do next?</h5>
        <br/>
        <button 
          type="submit" 
          className="btn btn-light" 
          onClick={handleLogout}
        >
          Logout
        </button>

        <a className="btn btn-primary" id="linkDep" title="go to the Deposit page"  href="#/Deposit" >Deposit</a>
        <a className="btn btn-primary" id="linkDraw" title="go to the Withdraw page" href="#/withdraw">Withdraw</a>
        </>
      )}   
    />
  )
}

