'use client'
import Link from 'next/link'
import { useAuth } from './authprovider'

const TopBar = () => {
	const { user } = useAuth();
	
	const accountItems = user && (
		<div id="account-nav-items">
			<span>Welcome {user.username}!</span>
			<Link href="/account">MY INVENTORY</Link>
			<Link href="/logout">LOG OUT</Link>
		</div>
	);

	const visitorItems = (
		<div id="visitor-nav-items">
			<Link href="/register">REGISTER</Link>
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