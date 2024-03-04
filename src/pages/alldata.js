import { useState, useContext, useEffect } from 'react'
import { Card, AppContext }          from './context';

export function AllData() {
	const [data, setData] 							= useState('')
	const [localCtx, setLocalCtx] 			= useState([])
	const { users }											= useContext(AppContext);

  const backendUrl = process.env.REACT_APP_BACKEND_URL


useEffect(() => {
	// Fetch all accounts from API
	fetch(`${backendUrl}/account/all`)
		.then(response => response.json())
		.then(data => {
//			console.log('Data:', data); // for development only
			setLocalCtx(data);
			setData(JSON.stringify(data));
		});
}, [backendUrl]);

// Name Shown
function FirstOnly(string) {
	let names = string.split(' ');
	return names[0];
}

function logStatus(user) {
	if (user && user.email === users[0].email) {
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
					users.length > 0 && users[0].role === 'Admin' ? (
						<>
							<h4>Welcome {FirstOnly(obj.name)}</h4>
							<h5> Your Personal Information:</h5>
							<br />
							<>
								<b>Full Name:</b> <i>{obj.name}</i>
								<br />
								<b>Total Balance:</b> ${obj.balance}
								<br />
								<b>Bank Role:</b> {obj.role}
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

	return ( 
		<>			
			<div className="container-fluid">
			<div className="row">{localCtx.map((obj, i) => display(obj, i))}</div>
			</div>

			<h5>For Dev Control: All data in store</h5>
			{/* {data} // DEVELOPMENT ONLY */}
		</>
	);
}