import React from 'react';
import {Card} from './context';

export function Home(){
  return (
    <Card 
      bgcolor='secondary'
      txtcolor="warning"
      header="Bank Landing Page"
      title="Welcome to the BigBadWolf Bank"
      text="You can use this bank at will"
      body={(<img src="./IMG/bank.png" className="img-fluid" alt="Bank Logo"/>)}
      footer={<b>Bank Robbery Safe for 364 days, 6 hours and 8 min</b>}
    />
  )
}