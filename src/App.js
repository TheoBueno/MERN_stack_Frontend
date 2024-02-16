// import React/*, { useContext }*/  from 'react';
import { Route, Routes }      from "react-router-dom";
import { CreateAccount }      from "./pages/createaccount";
import { Home }               from "./pages/home";
import { Login }              from "./pages/login";
import { Deposit }            from "./pages/deposit";
import { Withdraw }           from "./pages/withdraw";
import { AllData }            from "./pages/alldata";
import { NavBar }             from "./pages/navbar";
import './App.css';
import { RecurringContext } from './pages/context';



export default function App() {
//  const ctx = useContext(RecurringContext)

  return (
    <>
    <NavBar/>
    <RecurringContext.Provider value={{users:[{isAnyoneLoggedIn: false},{firstName:'User' , name: 'Guest User', email: 'Please Loggin to view.'}]}}>
      <Routes >
          <Route path='/' exact         element={<Home />} />
          <Route path='/CreateAccount/' element={<CreateAccount />} />
          <Route path='/login/'         element={<Login />} />
          <Route path='/deposit/'       element={<Deposit />} />
          <Route path='/withdraw/'      element={<Withdraw />} />
          <Route path='/alldata/'       element={<AllData />} />
      </Routes>
    </RecurringContext.Provider>
    </>
)}