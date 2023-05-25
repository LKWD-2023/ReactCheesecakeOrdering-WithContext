import React from 'react';
import { useOrderCount } from '../OrderCountContext';

const LivePreview = ({baseFlavor, toppings, specialRequests, quantity, deliveryDate, total}) => {

    const {setName} = useOrderCount();

    return (
        <div className="col-md-6 position-sticky" style={{ top: "2rem" }}>
            <h2 className="mb-4">Live Preview</h2>
            <div className="card" style={{ width: "18rem" }}>
                <img
                    src="/cheesecake.jpg"
                    className="card-img-top"
                    alt="Cheesecake"
                />
                <div className="card-body" onClick={() => setName('')}>
                    <h5 className="card-title">Your Custom Cheesecake</h5>
                    <p className="card-text">Base: {baseFlavor}</p>
                    <p className="card-text">Toppings: {toppings.join(', ')}</p>
                    <p className="card-text">Special Requests: {specialRequests}</p>
                    <p className="card-text">Quantity: {quantity}</p>
                    <p className="card-text">Delivery Date: {deliveryDate}</p>
                    <p className="card-text fw-bold">Total: ${total.toFixed(2)}</p>
                </div>
            </div>
        </div>
    )
}

export default LivePreview;