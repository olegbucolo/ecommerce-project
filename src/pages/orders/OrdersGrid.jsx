import { Link } from 'react-router';
import { OrderDetailsGrid } from './OrderDetailsGrid';
import { Fragment } from 'react';
import { OrderHeader } from './OrderHeader';

export function OrdersGrid({ orders }) {
    return (
        <div className="orders-grid">
            {orders.map((order) => {
                return (
                    <div key={order.id} className="order-container">

                        <OrderHeader order={order} />

                        <OrderDetailsGrid order={order} />
                    </div>
                )
            })}

        </div>
    )
}