import React             from 'react';
import ReactDOM          from 'react-dom/client';
import App               from './App';
import './index.css';
import { HashRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <HashRouter>  
      <App />
    </HashRouter>
  </React.StrictMode> 
);

/*

function Spa() {
  return (
    <HashRouter> 
      <NavBar/>
      <UserContext.Provider value={{users:[   {name:'Bruce Wayne', email:'bruce@waynecorp.com',   password:'timDrake',  balance:1000, isLoggedIn: false},{name:'Clark Kent',  email:'ckent@dailyplanet.com', password:'louisLane', balance: 100, isLoggedIn: false}]}}>
        <Route path='/' exact         component={Home} />
        <Route path='/CreateAccount/' component={CreateAccount} />
        <Route path='/login/'         component={Login} />
        <Route path='/deposit/'       component={Deposit} />
        <Route path='/withdraw/'      component={Withdraw} />
        <Route path='/alldata/'       component={AllData} />
      </UserContext.Provider>

    </HashRouter>
  )
}
 
ReactDOM.render(
  <Spa/>,
  document.getElementById('root')
)
*/
/* <Route path="/balance/"       component={Balance} /> */
