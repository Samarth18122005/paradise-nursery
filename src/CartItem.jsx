import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => {
      const cost = parseFloat(item.cost.replace('$', ''));
      return total + cost * item.quantity;
    }, 0).toFixed(2);
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem({ name: item.name }));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem({ name: item.name }));
  };

  const calculateTotalCost = (item) => {
    const cost = parseFloat(item.cost.replace('$', ''));
    return (cost * item.quantity).toFixed(2);
  };

  const handleCheckoutShopping = () => {
    alert('Coming Soon');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Shopping Cart</h2>
      <h3>Total Cart Amount: ${calculateTotalAmount()}</h3>
      
      {cart.map(item => (
        <div key={item.name} style={{ display: 'flex', gap: '20px', borderBottom: '1px solid #ccc', padding: '10px 0', alignItems: 'center' }}>
          <img src={item.image} alt={item.name} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
          <div style={{ flexGrow: 1 }}>
            <h3>{item.name}</h3>
            <p>Unit Price: {item.cost}</p>
            <p>Subtotal: ${calculateTotalCost(item)}</p>
            <div>
              <button onClick={() => handleDecrement(item)}>-</button>
              <span style={{ margin: '0 10px' }}>{item.quantity}</span>
              <button onClick={() => handleIncrement(item)}>+</button>
            </div>
            <button onClick={() => handleRemove(item)} style={{ marginTop: '10px', backgroundColor: '#ff4d4d', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '3px' }}>Delete</button>
          </div>
        </div>
      ))}

      <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
        <button onClick={onContinueShopping} style={{ padding: '10px 15px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px' }}>Continue Shopping</button>
        <button onClick={handleCheckoutShopping} style={{ padding: '10px 15px', backgroundColor: '#2196F3', color: 'white', border: 'none', borderRadius: '4px' }}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;
