'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import React, { Suspense } from 'react'
import { use } from 'react'
import Link from 'next/link'
import { useAuth } from '../../../../components/authprovider'

export default function ItemPage({ params }) {
	const router = useRouter();
	const resolvedParams = use(params);
	const { id } = resolvedParams;

	const [item, setItem] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');
	const [quantity, setQuantity] = useState(1);
	const [isEditing, setIsEditing] = useState(false);
    const { user } = useAuth();
  
	useEffect(() => {
		const fetchItem = async () => {
			try {
				const response = await fetch(`/api/items/${id}`);
				const data = await response.json();

				if (!response.ok) {
					throw new Error(data.error || 'Failed to fetch item');
				}

				setQuantity(data.quantity);

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

	const lessThings = () => {
		setQuantity(prevQuantity => Math.max(1, prevQuantity - 1));
	}

	const moreThings = () => {
		setQuantity(prevQuantity => prevQuantity + 1);
	}

	const cancelEditing = () => {
		setQuantity(item.quantity);
		setIsEditing(false);
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setLoading(true);
		try {
			const res = await fetch(`/api/items/${id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					itemName: e.target.name.value,
					description: e.target.description.value,
					quantity: quantity
				}),
			})
			const data = await res.json()
			if (!res.ok) {
				throw new Error(data.error || 'Update failed')
			}
			router.push('/account')
		} catch (err) {
			setError(err.message)
		} finally {
			setLoading(false)
		}
	}

	const handleDelete = async () => {
		setError("");
		try {
			const res = await fetch(`/api/items/${id}`, {
				method: 'DELETE',
			});

			if (!res.ok) {
				const data = await res.json();
				throw new Error(data.error || 'Deletion failed');
			}

			router.push('/account');
		} catch (err) {
			setError(err.message);
		}
	};

	if (!user) return null;

	if (loading) return < div > Loading... < /div>
	if (error) return < div > Error: { error } < /div>
	if (!item) return < div > No item found < /div>

	return (
	  <Suspense fallback={<div>Loading...</div>}>
	  	<div id="main-form">
	  		<h1>Item Detail</h1>
	  		<form onSubmit={handleSubmit}>
	  			<label htmlFor="name">Item Name</label>
	  			{ isEditing
	  			? <input id="name" name="name" type="text" required placeholder="Couch" defaultValue={item.itemName} />
	  			: <b>{item.itemName}</b>
	  			}
	  			<label htmlFor="description">Description</label>
	  			{ isEditing
	  			? <input id="description" name="description" type="text" required placeholder="Blue sofa with various cat claw marks" defaultValue={item.description} />
	  			: <b>{item.description}</b>
	  			}
	  			<label htmlFor="quantity">Quantity</label>
	  			<div>
	  				<b>{quantity}</b>
	  				{ isEditing &&
	  				<>
	  					<span className="text-link" onClick={lessThings}>Less</span>
	  					<span className="text-link" onClick={moreThings}>More</span>
				  </>
	  				}
	  			</div>
	  			{ error && isEditing && (
	  			<div className="yuck-error">
	  				{error}
	  			</div>
	  			)}
	  			{ isEditing &&
	  			<div>
	  				<button type="submit" disabled={loading} className="i-am-a-button">
	  					{loading ? 'Updating...' : 'Update Item'}
	  				</button>
	  				<button onClick={cancelEditing} className="i-am-a-button">Cancel</button>
	  			</div>
	  			}
	  		</form>
	  		{ !isEditing &&
	  		<div>
	  			<Link className="i-am-a-button" href="/account">Close</Link>
	  			<button onClick={()=> setIsEditing(true)} className="i-am-a-button">Edit</button>
				<button onClick={handleDelete} className="i-am-a-button">Delete</button>
	  		</div>
	  		}
	  	</div>
	  </Suspense>
  )
}