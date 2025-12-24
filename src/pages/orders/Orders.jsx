import { Header } from '../../components/Header';
import axios from 'axios';
import { OrdersGrid } from './OrdersGrid';
import { useState, useEffect, Fragment } from 'react';
import './Orders.css';

export function Orders({ cart }) {

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrdersData = async () => {
            let response = await axios.get('/api/orders?expand=products')
            setOrders(response.data)
        }
        fetchOrdersData();
    }, [])

    return (
        <>
            <link rel="icon" type="image/svg+xml" href="/orders-favicon.png" />

            <Header cart={cart} />

            <div className="orders-page">
                <div className="page-title">Your Orders</div>

                <OrdersGrid orders={orders} />
            </div>
        </>
    )

}