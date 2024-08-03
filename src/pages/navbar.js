import { useContext } from 'react'
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { AppContext  } from './context';
 
export function NavBar(){
  const ctx = useContext( AppContext );
  const { logout }  = ctx

  return(
    <>
    <Navbar expand="lg" className="navbar-dark bg-dark"> 
      <div className="container-fluid">
      <Navbar.Brand href="#" className='hoverFX d-inline-block align-text-center'>
        <img src="./IMG/Logo - Just Wolves.png" alt="Lobo-Guara Logo" width="35" height="35"/>
        BigBadWolf Bank
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto hoverFX">
          <Nav.Link title="go to Home page"        href="#/">Home</Nav.Link> 
         {ctx.users.length <= 0 ? (
          <>
          <Nav.Link title="go to Account Creation" href="#/CreateAccount">Create Account</Nav.Link>
          <Nav.Link title="go to Login page"       href="#/login">Login</Nav.Link>         
          </>
         ) : (
          <NavDropdown className="hoverFX" title="Account" id="basic-nav-dropdown" >
            <NavDropdown.Item title="go to Deposit page"  href="#/deposit">Deposit    </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item title="go to Withdraw page" href="#/withdraw">Withdraw   </NavDropdown.Item>
          </NavDropdown>
         )}
        </Nav>
      </Navbar.Collapse>
          {ctx.users.length > 0 && ctx.users[0].role === 'Admin' &&
            <NavDropdown.Item title="go to All Data page" href="#/alldata">AllData      </NavDropdown.Item>
          } 
      <Navbar.Brand>

        <>{ ctx.users.length > 0 && ctx.users[0].firstName } </>
        {ctx.users.length > 0 ? (
        <Button 
          type="submit" 
          title="Logout of Account"
          className="btn btn-dark" 
          onClick={logout}
        > Logout
        </Button>
        ):(
          <a className="btn btn-primary" title="go to the Login page"  href="#/Login" >Login</a>
        )}
        <a title="my Github page" href="https://theobueno.github.io/Home/bio_page.html" target=""> 
        <img width="40" height="40" src="./IMG/Logo Pure - Dark.png" alt="Lobo-Guara Dark-Circle logo"/></a>
      </Navbar.Brand>
      </div>
    </Navbar>
    </>
  );
}