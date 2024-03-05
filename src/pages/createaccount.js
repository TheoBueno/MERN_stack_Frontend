//import React from 'react';
import { useState, useContext }   from 'react';
import { Card, AppContext } from './context';
//import { app }                        from '../firebase';


export function CreateAccount(){
  // const [show, setShow]     = useState(true);
  const [status, setStatus] = useState('');
  const ctx = useContext( AppContext );
  // const { currentUser }  = ctx

  return (
    <Card
      bgcolor="primary"
      header="Create Account"
      status={status}
      body  ={ ctx.users.length <= 0 ? 
        <CreateForm /*setShow={setShow}*/ setStatus={setStatus}/> : 
        
        <CreateMsg /*setShow={setShow}*/ setStatus={setStatus}/>}
    />
  )
}

function CreateMsg(props){
	const ctx = useContext( AppContext );
  const { logout }  = ctx

  async function handleLogout() {
    try{
      await logout()
    }catch(error){
      console.error('Failed to logout:', error);
    }
  }
  
  return(<>
    <h5>Success. </h5>
    <p> Congratulations { ctx.users.length > 0 && ctx.users[0].firstName }, your account was  successfully created. 
    <br/> Welcome to BBWolfBank!</p>
    <p>How would you like to proceed?</p>
    <a className="btn btn-success" id="linkDep" title="go to the Deposit page"  href="#/Deposit" >Deposit</a>
    <a className="btn btn-warning" id="linkDraw" title="go to the Withdraw page" href="#/withdraw">Withdraw</a>
    <button type="submit" className="btn btn-light" onClick={handleLogout}>Logout</button>
  </>);
}

function CreateForm(props){
  const [name, setName]         = useState('');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [disabled, setDisabled] = useState(true)
  const ctx = useContext( AppContext );
  const { signup }  = ctx
  const backendUrl = process.env.REACT_APP_BACKEND_URL

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

  function validate(field, label) {
    if (!field) {
      props.setStatus('Error - ' + label + ' field is empty.')
      console.log('Error - ' + label + ' field is empty.')
      setTimeout(() => props.setStatus(''), 3000);
      return false
    } else if (label === "password" && field.length < 8){
      props.setStatus('Error - Password is too short, a minimum of 8 characters are required.')
      console.log('Error - Password is too short, a minimum of 8 characters are required.')
      setTimeout(() => props.setStatus(''), 3000);
      return false
    }
    return true         
  }
       
  async function handleSubmit(e) {
    e.preventDefault()
    console.log('Attempting to create Account for ' + name, email)

    if (!validate(name,     'name'))      return; 
    if (!validate(email,    'email'))     return; 
    if (!validate(password, 'password'))  return; 
    if (password !== passwordConfirm) {   return props.setStatus('Passwords do not match!')     }

    console.log('Attempting to Firebase Account Creation for ' + name, email, password)
    try{
      props.setStatus('')
      setDisabled(true)
      await signup(email, password)

      console.log('Account Created for ' + name)
      const url = `${backendUrl}/account/newUser/${name}/${email}/${password}`;
      (async () => {
        var res  = await fetch(url);
        var data = await res.json();
        console.log(data)

        const userData = {
          name: data.name,
          email: data.email,
          role: data.role,
          balance: data.balance
        };
  
        updateUsersWithFirstName(userData);
  
      })();


      // props.setShow(false) 

    } catch (error) {
      console.error('Failed to create account:', error);
      props.setStatus('failed to create account')}

  }

  return (<>
   {/* {currentUser && currentUser.email} */}
    Name<br/>
    <input type="input" 
      className="form-control"
      id="name"
      placeholder="Enter name" 
      autoComplete="name"
      value={name} 
      onChange={e =>{setDisabled(false); setName(e.currentTarget.value)}} /><br/>

    Email address<br/>
    <input type="input" 
      className="form-control"
      id="email"
      placeholder="Enter email" 
      autoComplete="email"
      value={email} 
      onChange={e =>{setDisabled(false); setEmail(e.currentTarget.value)}} /><br/>

    Password<br/>
    <input type="password" 
      className="form-control" 
      id="PW"
      placeholder="Enter password"
      autoComplete="new-password" 
      value={password} 
      onChange={e =>{setDisabled(false); setPassword(e.currentTarget.value)}}/><br/>

    Password Confirmation<br/>
    <input type="password" 
      className="form-control" 
      id="PWconf"
      placeholder="Confirm password" 
      autoComplete="new-password"
      value={passwordConfirm} 
      onChange={e =>{setDisabled(false); setPasswordConfirm(e.currentTarget.value)}}/><br/>
     
    <button disabled={disabled} type="submit" 
      className="btn btn-light" 
      onClick={handleSubmit}>Create Account</button>
  </>);
}