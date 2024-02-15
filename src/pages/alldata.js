import React from 'react';
import { useState, useContext, useEffect } from 'react'
import { Card, RecurringContext }          from './context';
// import axios from "axios"; // replace calls from fetch to axios 


export function AllData() {
	const [adminAccess, setAdminAccess] = useState(true); //TODO: DEVELOPMENT ONLY - Create Admin Access and Set it to False
	const [data, setData] 							= useState('')
	const [localCtx, setLocalCtx] 			= useState([])
  const backendUrl = process.env.REACT_APP_BACKEND_URL
	const ctx = useContext(RecurringContext);


useEffect(() => {
	// fetch all accounts from API
	fetch(`${backendUrl}/account/all`)
		.then(response => response.json())
		.then(data => {
			console.log(data)
			setLocalCtx(data)
			setData(JSON.stringify(data));
		})
}, [backendUrl])

useEffect(() => { //TODO: DEVELOPMENT ONLY - Create Admin Access and CHANGE THIS
	// initial state of Users CTX
	console.log(ctx.users)
	if (!ctx.users[0].isAnyoneLoggedIn) {
		setAdminAccess(true)
	} else {setAdminAccess(false)}
}, [ctx.users] )

// Name Shown
function FirstOnly(string) {
	let names = string.split(' ');
	return names[0];
}

function logStatus(user) {
	if (user.email === ctx.users[1].email) {
		return 'Logged in';
	} else {
		return 'Logged out';
	}
}

	function display(obj, i) {
		let j = i + 1;
		return (
			<Card
				className="col-sm-6 d-flex justify-content-center"
				bgcolor={i % 2 === 1 ? 'primary' : i % 2 === 0 ? 'danger' : 'warning'}
				txtcolor=""
				header={'All Data - User 00' + j + ' Data:'}
				key={i}
				body={
					adminAccess ? (
						<>
							<h4>Welcome {FirstOnly(obj.name)}</h4>
							<h5> Your Personal Information:</h5>
							<br />
							<>
								<b>Full Name:</b> <i>{obj.name}</i>
								<br />
								<b>Total Balance:</b> ${obj.balance}
								<br />
								<br />
								Login Info: <br />•<b>UserName:</b> <i>{obj.email}</i> <br />•
								<b>Password:</b> <i>{obj.password}</i> <br />
								<br />
								<h5>
									Current Status: <i>{logStatus(obj)}</i>{' '}
								</h5>
							</>
							<br />
						</>
					) : (
						<>
							<h5>Access Denied - Data Hidden.</h5>
						</>
					)
				}
			/>
		);
	}

	return ( //TODO: DEVELOPMENT ONLY
		<>			
			<div className="container-fluid">
			<div className="row">{localCtx.map((obj, i) => display(obj, i))}</div>
			</div>

			<h5>For Dev Control: All data in store</h5>
			{data}
			
			{/* {console.log(Math.random())} */}
			{/* {console.log(localCtx.map((i)=> i.name) )} */}

		</>
	);
}