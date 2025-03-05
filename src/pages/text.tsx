// src/pages/text.tsx
import { useSelector, useDispatch } from 'react-redux';
import { toggleCart, removeFromCart } from '../Redux/slice/cartSlice';
import { RootState } from '../Redux/store';
import ProductList from './product';

const Cart = () => {
  const cartItems = useSelector((state: RootState) => state.reducer.cart.cartItems);
  const cartToggle = useSelector((state: RootState) => state.reducer.cart.cartToggle);
  const dispatch = useDispatch();

  const handleToggleCart = () => {
    dispatch(toggleCart());
  };

  const handleRemoveFromCart = (id: number) => {
    dispatch(removeFromCart(id));
  };

  return (
    <div>
      <button onClick={handleToggleCart}>
        Cart ({cartItems.length})
      </button>
      {cartToggle && (
        <div>
          <h2>Cart</h2>
          <ul>
            {cartItems.map(item => (
              <li key={item.id}>
                {item.name} - {item.price}
                <button onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
              </li>
            ))}
          </ul>
        </div>
      )}
      <ProductList />
    </div>
  );
};
export default Cart;