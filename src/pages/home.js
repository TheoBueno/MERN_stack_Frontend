//import React from 'react';
import { useContext }   from 'react';
import { Card, RecurringContext } from './context';

export function Home(){
  const ctx = useContext(RecurringContext);


  return (
    <Card 
      bgcolor='secondary'
      txtcolor="warning"
      header="Bank Landing Page"
      title={`Welcome ${ctx.users[1].firstName}, to the BigBadWolf Bank`}
      

      text="You can use this bank at will, please use the navigation above to register a new account or login to your existing account"
      body={(<img src="./IMG/bank.png" className="img-fluid" alt="Bank Logo"/>)}
      footer={<b>Bank Robbery Safe for 364 days, 6 hours and 8 min</b>}
    />
  )
}