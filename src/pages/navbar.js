import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

export function NavBar(){
  return(
    <>
    <Navbar expand="lg" className="navbar-dark bg-dark"> {/*classNames: sticky-top or bg-body-tertiary */}
      <div className="container-fluid">
      <Navbar.Brand href="#" className='hoverFX d-inline-block align-text-center'>
        <img src="./IMG/Logo - Just Wolves.png" alt="Lobo-Guara Logo" width="35" height="35"/>{/*padding-right='5px'*/}{' '}
        BigBadWolf Bank
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto hoverFX">
          <Nav.Link title="go to Home page"        href="#/">Home</Nav.Link> {/*classNames: nav-item  */}
          <Nav.Link title="go to Account Creation" href="#/CreateAccount">Create Account</Nav.Link>
          <Nav.Link title="go to Login page"       href="#/login">Login</Nav.Link>
          <NavDropdown className="hoverFX" title="Account" id="basic-nav-dropdown" >
            <NavDropdown.Item title="go to Deposit page"  href="#/deposit">Deposit    </NavDropdown.Item>
            <NavDropdown.Item title="go to Withdraw page" href="#/withdraw">Withdraw   </NavDropdown.Item>
        {/* <NavDropdown.Item href="#action/3.3">Something  </NavDropdown.Item> */}
            <NavDropdown.Divider />
            <NavDropdown.Item title="go to All Data page" href="#/alldata">AllData      </NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <a title="my Github page" href="https://theobueno.github.io/Home/bio_page.html" target=""> 
        <img width="40" height="40" src="./IMG/Logo Pure - Dark.png" alt="Lobo-Guara Dark-Circle logo"/></a>
      </Navbar.Collapse>
      </div>
    </Navbar>
    </>
  );
}