import React from "react";
import { Link } from "react-router-dom";
import { useOrderCount } from '../OrderCountContext';

const Home = () => {
    const { orderCount } = useOrderCount();

    return (
        <>
            <div className="d-flex align-items-center justify-content-center" style={{ height: '100vh', backgroundColor: '#eee' }}>
                <div className="text-center">
                    <h1 className="display-4">Welcome to the Cheesecake Factory</h1>
                    <h3 className="display-4">The total amount of orders is currently: {orderCount}</h3>
                    <p className="lead">
                        <Link to='/order'>
                            <button className="btn btn-dark btn-lg">
                                Click here to order your own custom cheesecake
                            </button>
                        </Link>
                    </p>
                </div>
            </div>
        </>
    )
}

export default Home;