import axios from 'axios';
import { useState, useEffect } from 'react';
import { PaymentSummary } from './PaymentSummary';
import './CheckoutPage.css';
import { OrderSummary } from './OrderSummary';
import { CheckoutHeader } from './CheckoutHeader';

export function CheckoutPage({ cart }) {
    const [deliveryOptions, setDeliveryOptions] = useState([])
    const [paymentSummary, setPaymentSummary] = useState(null)

    useEffect(() => {
        axios.get('/api/delivery-options?expand=estimatedDeliveryTime')
            .then((response) => {
                console.log('WAAAATTT', response.data)
                setDeliveryOptions(response.data)
            })

        axios.get('/api/payment-summary')
            .then((response) => {
                setPaymentSummary(response.data)
            })
    }, [])

    return (
        <>
            <link rel="icon" type="image/svg+xml" href="/cart-favicon.png" />
            <CheckoutHeader />
            <div className="checkout-page">
                <div className="page-title">Review your order</div>
                <div className="checkout-grid">
                    <OrderSummary cart={cart} deliveryOptions={deliveryOptions} />
                    <PaymentSummary paymentSummary={paymentSummary}/>

                </div>
            </div>
        </>

    )
}