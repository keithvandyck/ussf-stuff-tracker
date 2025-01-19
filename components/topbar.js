'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const TopBar = () => {
	const [user, setUser] = useState(null)
	
	useEffect(() => {
		fetch('/api/auth/me')
		  .then(res => res.json())
		  .then(data => setUser(data))
	  }, [])

	
	const accountItems = user && (
		<div id="account-nav-items">
			<span>Welcome {user.username}!</span>
			<Link href="/logout">LOG OUT</Link>
		</div>
	);

	const visitorItems = (
		<div id="visitor-nav-items">
			<Link href="/register">SIGN UP</Link>
			<Link href="/login">LOG IN</Link>
		</div>
	);
  
	  return (
	<div id="top-bar">
		<div className="box-it-in split-up-the-children">
			<div id="top-title"><b>USSF Stuff Tracker</b> <span>Track Some Stuff!</span></div>
			<div id="login-items">
				{user ? accountItems : visitorItems}
			</div>
		</div>
	</div>
  );
};

export default TopBar;