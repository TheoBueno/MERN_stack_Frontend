export function NavBar(){
  return(
    <>
<nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
  <div className="container-fluid">
    <a className="navbar-brand hoverFX d-inline-block align-text-center" href="#/"><img src="./IMG/Logo - Just Wolves.png" alt="Lobo-Guara Logo" width="35" height="35"/> BigBadWolf Bank</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item hoverFX">
          <a className="nav-link" title="go to Home page" href="#/">Home</a>
        </li>
        <li className="nav-item hoverFX">
          <a className="nav-link" title="go to Account Creation page" href="#/CreateAccount">Create Account</a>
        </li>
        <li className="nav-item hoverFX">
          <a className="nav-link" title="go to Login page"  href="#/login">Login</a>
        </li>
        <li className="nav-item hoverFX">
          <a className="nav-link" title="go to Deposit page" href="#/deposit">Deposit</a>
        </li>
        <li className="nav-item hoverFX">
          <a className="nav-link" title="go to Withdraw page" href="#/withdraw">Withdraw</a>
        </li>
        <li className="nav-item hoverFX">
          <a className="nav-link" title="go to All Data page" href="#/alldata">AllData</a>
        </li>
      </ul>
        {/* <li className="nav-item hoverFX dropdown"> // move inside of UL
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Dropdown
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="#">Action</a></li>
                  <li><a className="dropdown-item" href="#">Another action</a></li>
                  <li><hr className="dropdown-divider"/></li>
                  <li><a className="dropdown-item" href="#">Something else here</a></li>
                </ul>
              </li> */}
      <form className="d-flex">
        <a href="https://theobueno.github.io/Home/bio_page.html" target=""> 
          <img width="40" height="40" src="./IMG/Logo Pure - Dark.png" alt="Lobo-Guara Dark-Circle logo" />
        </a>      
            {/* <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
              <button className="btn btn-outline-success" type="submit">Search</button>*/}
            </form> 
          </div>
        </div>
      </nav>
    </>
  );
}