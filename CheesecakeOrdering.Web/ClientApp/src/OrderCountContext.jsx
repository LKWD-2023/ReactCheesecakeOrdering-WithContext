import React, { useState, useEffect, createContext, useContext } from 'react';
import axios from 'axios';

const OrderCountContext = createContext();

const OrderCountContextComponent = ({ children }) => {
    const [orderCount, setOrderCount] = useState(0);
    const [name, setName] = useState('');

    const refreshOrderCounts = async () => {
        const { data } = await axios.get('/api/cheesecakeordering/getcount');
        setOrderCount(data.count);
    }

    useEffect(() => {
        refreshOrderCounts();
    }, []);

    return (
        <OrderCountContext.Provider value={{ orderCount, refreshOrderCounts, name, setName }}>
            {children}
        </OrderCountContext.Provider>
    )

}

const useOrderCount = () => {
    return useContext(OrderCountContext);
}

export { OrderCountContextComponent, useOrderCount };