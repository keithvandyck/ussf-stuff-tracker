'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Account() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
	const fetchItems = async () => {
	  try {
		const response = await fetch('/api/items');
		const data = await response.json();

		if (!response.ok) {
		  throw new Error(data.error || 'Failed to fetch items');
		}

		setItems(data);
		setLoading(false);
	  } catch (err) {
		setError(err.message);
		setLoading(false);
	  }
	};

	fetchItems();
  }, []);

  if (loading) {
	return <div>Loading items...</div>;
  }

  if (error) {
	return <div>Error: {error}</div>;
  }
  
  const truncateDescriptionIfNeeded = (description) => {
	  if (description.length > 100) {
		  return description.slice(0, 100) + "...";
	  } else {
		  return description;
	  }
  }

  return (
	<div id="account">
	  <h1>My Inventory</h1>
	  
	  {items.length === 0 ? (
		<p>No items in your inventory yet.</p>
	  ) : (
		<table>
		  <thead>
			<tr>
			  <th id="tableItemName">Item Name</th>
			  <th id="tableDescription">Description</th>
			  <th id="tableQuantity">Quantity</th>
			</tr>
		  </thead>
		  <tbody>
			{items.map((item) => (
			  <tr key={item.id}>
				<td>{item.itemName}</td>
				<td>{truncateDescriptionIfNeeded(item.description)}</td>
				<td>{item.quantity}</td>
			  </tr>
			))}
		  </tbody>
		</table>
	  )}
	  
	  <Link className="i-am-a-button" href="/add">Add Item</Link>

	</div>
  )
}