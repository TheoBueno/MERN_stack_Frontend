import { useContext } from 'react';
import { Card, AppContext } from './context';
import Button from 'react-bootstrap/Button';

export function Home() {
  const { users, logout } = useContext(AppContext); // Destructure users directly from the context

  return (
    <Card 
      bgcolor='secondary'
      txtcolor="warning"
      header="Bank Landing Page"
      title={ users.length > 0 ? (
        `Welcome ${ users[0].firstName}, to the BigBadWolf Bank`
      ) : (
        `Welcome to the BBWolf Bank`) 
      }
      text="You can use this bank at will."
      // , please use the navigation above to register a new account or log in to your existing account"
      body    = { users.length <= 0 ? (
        <>
        <img src="./IMG/bank.png" className="img-fluid home-pic" alt="Bank Logo"/>

        <a className="btn btn-primary" title="Login page"  href="#/Login" >Login</a> 
        <a className="btn btn-primary" title="Account Creation page"  href="#/CreateAccount" >Create an Account</a> 
        <br/>
        </>      
      ) : ( 
        <>
        <img src="./IMG/bank.png" className="img-fluid home-pic" alt="Bank Logo"/>

        <a className="btn btn-success" title="Deposit page"  href="#/deposit" >Deposit</a> 
        <a className="btn btn-warning" title="Withdraw page"  href="#/withdraw" >Withdraw</a>
        <Button 
          type="submit" 
          title="Logout of Account"
          className="btn btn-outline-light" 
          onClick={logout}
        > Logout
        </Button>
        </>      
      )}
      footer={<b>Bank Robbery Safe for 364 days!</b>}
    />
  )
}