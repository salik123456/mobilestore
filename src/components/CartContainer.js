import React from 'react';
import CartItem from './CartItem';
import { useSelector, useDispatch } from 'react-redux';
import { openModal } from '../features/modal/ModalSlice';

const CartContainer = () => {
  const { cartItems, amount, total } = useSelector((store) => store.cart);
  const dispatch = useDispatch();

  if (amount < 1) {
    return (
      <section>
        <header>
          <h2 className='text-center'>Your bag</h2>
          <h4 className='empty-cart'>is empty</h4>
        </header>
      </section>
    );
  }

  return (
    <section className='cart' >
      <header>
        <h2 className='text-center' >Your bag</h2>
      </header>
      <div>
        {cartItems.map((item) => (
          <CartItem key={item.id} {...item} />
        ))}
      </div>
      <footer>
        <hr />
        <div className='cart-total'>
          <h4>
            Total <span>${total.toFixed(2)}</span>
          </h4>
        </div>
        <button className='btn clear-btn' onClick={() => dispatch(openModal())}>
          Clear Cart
        </button>
      </footer>
    </section>
  );
};

export default CartContainer;
