import React from 'react';
import { useState/*, useContext*/ }   from 'react';
import { Card/*, RecurringContext*/ } from './context';


export function CreateAccount(){
  const [show, setShow]     = useState(true);
  const [status, setStatus] = useState('');
  // const ctx = useContext(RecurringContext);

  
  return (
    <Card
      bgcolor="primary"
      header="Create Account"
      status={status}
      body={show ? 
        <CreateForm setShow={setShow} setStatus={setStatus}/> : 
        <CreateMsg setShow={setShow} setStatus={setStatus}/>}
    />
  )
}

function CreateMsg(props){
  return(<>
    <h5>Success</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => props.setShow(true)}>Add another account</button>
  </>);
}

function CreateForm(props){
  const [name, setName]         = useState('');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true)

  const backendUrl = process.env.REACT_APP_BACKEND_URL

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

  function handle(){
    console.log('Attempting to create Account for ' + name, email)
    if (!validate(name,     'name'))      return; 
    if (!validate(email,    'email'))     return; 
    if (!validate(password, 'password'))  return; 
    console.log('Account Created for ' + name)
    const url = `${backendUrl}/account/newUser/${name}/${email}/${password}`;
    (async () => {
      var res  = await fetch(url);
      var data = await res.json();
      console.log(data)
    })();
    props.setShow(false) 
  }    

  return (<>

    Name<br/>
    <input type="input" 
      className="form-control"
      placeholder="Enter name" 
      value={name} 
      onChange={e =>{setDisabled(false); setName(e.currentTarget.value)}} /><br/>

    Email address<br/>
    <input type="input" 
      className="form-control"
      placeholder="Enter email" 
      value={email} 
      onChange={e =>{setDisabled(false); setEmail(e.currentTarget.value)}} /><br/>

    Password<br/>
    <input type="password" 
      className="form-control" 
      placeholder="Enter password" 
      value={password} 
      onChange={e =>{setDisabled(false); setPassword(e.currentTarget.value)}}/><br/>

    <button disabled={disabled} type="submit" 
      className="btn btn-light" 
      onClick={handle}>Create Account</button>

  </>);
}