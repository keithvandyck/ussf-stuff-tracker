'use client'
import { useState, useEffect } from 'react'
import React, { Suspense } from 'react'
import { use } from 'react'

export default function ItemPage({ params }) {
	const resolvedParams = use(params);
	const { id } = resolvedParams;

	const [item, setItem] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');

	useEffect(() => {
		const fetchItem = async () => {
			try {
				const response = await fetch(`/api/items/${id}`);
				const data = await response.json();

				if (!response.ok) {
					throw new Error(data.error || 'Failed to fetch item');
				}

				setItem(data);
				setLoading(false);
			} catch (err) {
				setError(err.message);
				setLoading(false);
			}
		};

		if (id) {
			fetchItem();
		}
	}, [id]);

	if (loading) return < div > Loading... < /div>
	if (error) return < div > Error: { error } < /div>
	if (!item) return < div > No item found < /div>

	return (
	  <Suspense fallback={<div>Loading...</div>}>
		  <div id="main-form">
			  <h1>Item Detail</h1>
				  <label htmlFor="name">Item Name</label>
				  <b>{item.itemName}</b>
				  <label htmlFor="description">Description</label>
				  <b>{item.description}</b>
				  <label htmlFor="quantity">Quantity</label>
				  <div>
					  <b>{item.quantity}</b>
				  </div>
		  </div>
	  </Suspense>
  )
}