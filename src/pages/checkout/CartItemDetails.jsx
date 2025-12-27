import axios from 'axios';
import { formatMoney } from '../../utils/money';
import { DeliveryOptions } from './DeliveryOptions';
import { useState } from 'react';

export function CartItemDetails({ cartItem, deliveryOptions, loadCart }) {

    const [isUpdatingQuantity, setIsUpdatingQuantity] = useState(false);
    const [quantity, setQuantity] = useState(cartItem.quantity);

    const deleteCartItem = async () => {
        await axios.delete(`/api/cart-items/${cartItem.productId}`)
        await loadCart();
    }

    const updateQuantity = async () => {

        if (isUpdatingQuantity) {
            await axios.put(`/api/cart-items/${cartItem.productId}`, {
                quantity: parseInt(quantity)
            })
            await loadCart();
            setIsUpdatingQuantity(false);
        } else {

            setIsUpdatingQuantity(true);
        }
    }

    const updateQuantityInputKey = (e) =>{
        if(e.key === 'Enter'){
            updateQuantity();
        }else if(e.key === "Escape"){
            setQuantity(cartItem.quantity);
            setIsUpdatingQuantity(false);
        }
    }


    const updateQuantityInput = (event) => {
        setQuantity(event.target.value);
    }

    return (
        <div className="cart-item-details-grid">
            <img className="product-image"
                src={cartItem.product.image} />

            <div className="cart-item-details">
                <div className="product-name">
                    {cartItem.product.name}
                </div>
                <div className="product-price">
                    {formatMoney(cartItem.product.priceCents)}
                </div>
                <div className="product-quantity">
                    <span>
                        Quantity:
                        {
                            isUpdatingQuantity
                                ? <input
                                    className="product-quantity-update"
                                    type="text"
                                    value={quantity}
                                    onChange={updateQuantityInput} 
                                    onKeyDown={updateQuantityInputKey}/>
                                : <span className="quantity-label">{cartItem.quantity}</span>
                        }
                    </span>
                    <span className="update-quantity-link link-primary"
                        onClick={updateQuantity}
                    >
                        Update
                    </span>
                    <span className="delete-quantity-link link-primary"
                        onClick={deleteCartItem}>
                        Delete
                    </span>
                </div>
            </div>

            <DeliveryOptions cartItem={cartItem} deliveryOptions={deliveryOptions} loadCart={loadCart} />
        </div>
    )
}