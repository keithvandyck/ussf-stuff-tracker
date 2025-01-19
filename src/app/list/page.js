'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Account() {
  const router = useRouter();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
	const fetchItems = async () => {
	  try {
		const response = await fetch('/api/listing');
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
  
  const gotoItem = (id) => {
	router.push(`/list/${id}`)
  }
  
  return (
	<div id="account">
	  <h1>All Inventory</h1>
	  
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
				<td><span className="text-link" onClick={() => gotoItem(item.id)}>{item.itemName}</span></td>
				<td>{truncateDescriptionIfNeeded(item.description)}</td>
				<td>{item.quantity}</td>
			  </tr>
			))}
		  </tbody>
		</table>
	  )}

	</div>
  )
}