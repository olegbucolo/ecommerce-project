import { Header } from '../components/Header';
import { Link, useParams } from 'react-router';
import { useEffect, useState } from 'react';
import './Tracking.css';
import axios from 'axios';
import dayjs from 'dayjs';

export function Tracking({ cart }) {
    const { orderId, productId } = useParams();

    const [order, setOrder] = useState(null);

    useEffect(() => {
        const fetchAtOrderId = async () => {
            const response = await axios.get(`/api/orders/${orderId}?expand=products`)
            console.log('data', response.data)
            setOrder(response.data);
        }
        fetchAtOrderId();

    }, [orderId])
    if (!order) { return null };
    let currProduct = order.products.find(p => p.productId === productId);
    console.log('estimatedDelivery', currProduct.estimatedDeliveryTimeMs)
    console.log('quantity', currProduct.quantity)
    
    return (
        <>
            <link rel="icon" type="image/svg+xml" href="/tracking-favicon.png" />

            <Header cart={cart} />

            {order && (<div className="tracking-page">
                <div className="order-tracking">
                    <Link to="/orders" className="back-to-orders-link link-primary" >
                        View all orders
                    </Link>

                    <div className="delivery-date">
                        Arriving on {dayjs(currProduct.estimatedDeliveryTimeMs).format('MMMM D')}
                    </div>

                    <div className="product-info">
                        {currProduct.product.name}
                    </div>

                    <div className="product-info">
                        Quantity: {currProduct.quantity}
                    </div>

                    <img className="product-image" src={currProduct.product.image} />

                    <div className="progress-labels-container">
                        <div className="progress-label">
                            Preparing
                        </div>
                        <div className="progress-label current-status">
                            Shipped
                        </div>
                        <div className="progress-label">
                            Delivered
                        </div>
                    </div>

                    <div className="progress-bar-container">
                        <div className="progress-bar"></div>
                    </div>
                </div>
            </div>)}
        </>
    )
}