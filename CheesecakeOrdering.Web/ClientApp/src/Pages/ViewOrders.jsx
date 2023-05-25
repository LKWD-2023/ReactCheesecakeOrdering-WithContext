import React, { useState, useEffect } from "react";
import axios from "axios";
import dayjs from 'dayjs';
import { Link } from "react-router-dom";

const ViewOrders = () => {

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const getOrders = async () => {
            const { data } = await axios.get('/api/cheesecakeordering/getall');
            setOrders(data);
        }

        getOrders();
    }, []);

    return (
        <div className="d-flex justify-content-center">
            <table className="table text-center shadow-lg" style={{borderCollapse: "separate", borderSpacing: "0 15px", maxWidth: "80%"}}>
                <thead>
                    <tr style={{backgroundColor: "#212529", color: "white", borderRadius: "15px"}}>
                        <th>Name/Email</th>
                        <th>Base Flavor</th>
                        <th>Toppings</th>
                        <th>Special Requests</th>
                        <th>Quantity</th>
                        <th>Delivery Date</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order.id} style={{backgroundColor: "#f8f9fa", borderRadius: "15px"}}>
                            <td style={{paddingTop: "15px", paddingBottom: "15px"}}>
                                <Link to={`/order-details/${order.id}`}>
                                    {order.name} - {order.email}
                                </Link>
                            </td>
                            <td>{order.baseFlavor}</td>
                            <td>{order.toppings || 'N/A'}</td>
                            <td>{order.specialRequests || 'N/A'}</td>
                            <td>{order.quantity}</td>
                            <td>{dayjs(order.deliveryDate).format('MM/DD/YYYY')}</td>
                            <td>{`$${order.total.toFixed(2)}`}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
    
    
}

export default ViewOrders;