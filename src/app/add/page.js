'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function AddItem() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  
  const lessThings = () => {
	  setQuantity(prevQuantity => Math.max(1, prevQuantity - 1));
  }
  
  const moreThings = () => {
	  setQuantity(prevQuantity => prevQuantity + 1);
  }

  const handleSubmit = async (e) => {
	e.preventDefault();
	setError("");
	setLoading(true);

	try {
	  const res = await fetch('/api/items', {
		method: 'POST',
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
		throw new Error(data.error || 'Submission failed')
	  }
	  router.push('/account')
	} catch (err) {
	  setError(err.message)
	} finally {
	  setLoading(false)
	}
  }

  return (
	  <div id="main-form">
		  <h1>Register</h1>
		  <form onSubmit={handleSubmit}>
			  <label htmlFor="name">Item Name</label>
			  <input id="name" name="name" type="text" required placeholder="Couch" />
			  <label htmlFor="description">Description</label>
			  <input id="description" name="description" type="text" required placeholder="Blue sofa with various cat claw marks" />
			  <label htmlFor="quantity">Quantity</label>
			  <div>
			  	<b>{quantity}</b>
					<span className="text-link" onClick={lessThings}>Less</span> 
					<span className="text-link" onClick={moreThings}>More</span>

			  </div>
			  {error && (
			  <div className="yuck-error">
				  {error}
			  </div>
			  )}
			  <button type="submit" disabled={loading} className="i-am-a-button">
				  {loading ? 'Adding...' : 'Add Item'}
			  </button>
			  <Link className="i-am-a-button" href="/account">Cancel</Link>

		  </form>
	  </div>
  )
}
