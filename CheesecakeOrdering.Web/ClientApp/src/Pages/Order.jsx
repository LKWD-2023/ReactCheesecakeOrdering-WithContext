import React, { useState } from "react";
import LivePreview from "../Components/LivePreview";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useOrderCount } from "../OrderCountContext";

const baseFlavors = ['Choose...', 'Classic', 'Chocolate', 'Red Velvet', 'Brownie'];

const toppings = [
    "Chocolate Chips",
    "Caramel Drizzle",
    "Whipped Cream",
    "Pecans",
    "Almonds",
    "Toasted Coconut",
    "Graham Cracker Crumble",
    "Cookie Dough",
    "Mint Chocolate Chips",
    "Caramelized Bananas",
    "Rainbow Sprinkles",
    "Powdered Sugar",
    "White Chocolate Shavings",
    "Peanut Butter Drizzle",
    "Dark Chocolate Drizzle"
];

const Order = () => {

    const { refreshOrderCounts, name, setName } = useOrderCount();
    const navigate = useNavigate();

    // const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [baseFlavor, setBaseFlavor] = useState(baseFlavors[0]);
    const [selectedToppings, setSelectedToppings] = useState([]);
    const [specialRequests, setSpecialRequests] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [deliveryDate, setDeliveryDate] = useState('');
    const [isSubmitting, setIsSumbitting] = useState(false);

    const onFlavorChange = e => {
        setBaseFlavor(e.target.value);
    }

    const onToppingsChange = topping => {
        if (selectedToppings.includes(topping)) {
            setSelectedToppings(selectedToppings.filter(t => t !== topping));
        } else {
            setSelectedToppings([...selectedToppings, topping]);
        }
    }

    const computeTotal = () => {
        if (baseFlavor === baseFlavors[0]) {
            return 0;
        }

        return (49.99 + (selectedToppings.length * 3.95)) * quantity;
    }

    const isFormValid = !!name && !!email && baseFlavor !== baseFlavors[0] && +quantity > 0 && !!deliveryDate;

    const onSubmitClick = async () => {
        setIsSumbitting(true);
        await axios.post('/api/cheesecakeordering/add', {
            name,
            email,
            baseFlavor,
            toppings: selectedToppings.join(', '),
            specialRequests,
            quantity,
            deliveryDate,
            total: computeTotal()
        });
        setIsSumbitting(false);
        await refreshOrderCounts();
        navigate('/success');
    }

    return (
        <>
            <h1 className="text-center my-4">Cheesecake Factory Order Form</h1>
            <div className="row">
                <div className="col-md-6">
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input value={name} onChange={e => setName(e.target.value)} type="text" className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Cheesecake Base Flavor ($49.99)</label>
                        <select onChange={onFlavorChange} value={baseFlavor} className="form-select">
                            {baseFlavors.map((f) => <option key={f}>{f}</option>)}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Toppings (each topping adds an additional $3.95)</label>
                        {toppings.map(t => {
                            return <div key={t} className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    checked={selectedToppings.includes(t)}
                                    onChange={() => onToppingsChange(t)}
                                />
                                <label className="form-check-label">{t}</label>
                            </div>
                        })}

                    </div>
                    <div className="mb-3">
                        <label className="form-label">Special Requests</label>
                        <textarea onChange={e => setSpecialRequests(e.target.value)} value={specialRequests} className="form-control" rows={3} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Quantity</label>
                        <input value={quantity} onChange={e => setQuantity(e.target.value)} type="number" className="form-control" min={1} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Delivery Date</label>
                        <input value={deliveryDate} onChange={e => setDeliveryDate(e.target.value)} type="date" className="form-control" />
                    </div>
                    <button type="submit" onClick={onSubmitClick} disabled={!isFormValid || isSubmitting} className="btn btn-primary">
                        {isSubmitting ? 'Submitting...' : 'Submit Order'}
                    </button>
                </div>
                <LivePreview baseFlavor={baseFlavor}
                    toppings={selectedToppings}
                    deliveryDate={deliveryDate}
                    quantity={quantity}
                    specialRequests={specialRequests}
                    total={computeTotal()}
                />
            </div>
        </>

    )
}

export default Order;