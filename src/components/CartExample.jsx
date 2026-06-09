import React, { memo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
  selectCartItems,
  selectTotalItems,
  selectTotalPrice,
} from '../store/slices/cartSlice';
import { ShoppingCart, Plus, Minus, Trash2 } from 'lucide-react';

// Static data outside the component — allocated once, never re-created
const SAMPLE_PRODUCTS = [
  { id: 1, name: 'Laptop', price: 999 },
  { id: 2, name: 'Phone', price: 699 },
  { id: 3, name: 'Headphones', price: 199 },
];

const CartExample = memo(() => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const totalItems = useSelector(selectTotalItems);
  const totalPrice = useSelector(selectTotalPrice);

  const handleAddToCart = useCallback(
    (product) => dispatch(addToCart(product)),
    [dispatch],
  );
  const handleIncrease = useCallback(
    (id) => dispatch(increaseQuantity(id)),
    [dispatch],
  );
  const handleDecrease = useCallback(
    (id) => dispatch(decreaseQuantity(id)),
    [dispatch],
  );
  const handleRemove = useCallback(
    (id) => dispatch(removeFromCart(id)),
    [dispatch],
  );
  const handleClear = useCallback(() => dispatch(clearCart()), [dispatch]);

  return (
    <div className='p-6 max-w-4xl mx-auto'>
      <h2 className='text-2xl font-bold mb-6 flex items-center gap-2'>
        <ShoppingCart className='w-6 h-6' />
        Redux Shopping Cart Demo
      </h2>

      <div className='mb-8'>
        <h3 className='text-xl font-semibold mb-4'>Available Products</h3>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          {SAMPLE_PRODUCTS.map((product) => (
            <div
              key={product.id}
              className='border rounded-lg p-4 hover:shadow-lg transition'
            >
              <h4 className='font-semibold text-center'>{product.name}</h4>
              <p className='text-center text-gray-600 mb-3'>${product.price}</p>
              <button
                type='button'
                onClick={() => handleAddToCart(product)}
                className='w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600'
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className='bg-gray-50 rounded-lg p-6'>
        <div className='flex justify-between items-center mb-4'>
          <h3 className='text-xl font-semibold'>
            Your Cart ({totalItems} items)
          </h3>
          {cartItems.length > 0 && (
            <button
              type='button'
              onClick={handleClear}
              className='text-red-500 hover:text-red-700 flex items-center gap-1'
            >
              <Trash2 className='w-4 h-4' />
              Clear Cart
            </button>
          )}
        </div>

        {cartItems.length === 0 ? (
          <p className='text-gray-500 text-center py-8'>Your cart is empty</p>
        ) : (
          <>
            <div className='space-y-4'>
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className='flex items-center justify-between bg-white p-4 rounded'
                >
                  <div className='flex items-center gap-4'>
                    <div>
                      <h4 className='font-semibold'>{item.name}</h4>
                      <p className='text-gray-600'>${item.price}</p>
                    </div>
                  </div>

                  <div className='flex items-center gap-4'>
                    <div className='flex items-center gap-2'>
                      <button
                        type='button'
                        onClick={() => handleDecrease(item.id)}
                        className='p-1 bg-gray-200 rounded hover:bg-gray-300'
                      >
                        <Minus className='w-4 h-4' />
                      </button>
                      <span className='font-semibold w-8 text-center'>
                        {item.quantity}
                      </span>
                      <button
                        type='button'
                        onClick={() => handleIncrease(item.id)}
                        className='p-1 bg-gray-200 rounded hover:bg-gray-300'
                      >
                        <Plus className='w-4 h-4' />
                      </button>
                    </div>

                    <p className='font-semibold w-20 text-right'>
                      ${item.price * item.quantity}
                    </p>

                    <button
                      type='button'
                      onClick={() => handleRemove(item.id)}
                      className='text-red-500 hover:text-red-700'
                    >
                      <Trash2 className='w-5 h-5' />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className='mt-6 pt-4 border-t border-gray-300'>
              <div className='flex justify-between items-center text-xl font-bold'>
                <span>Total:</span>
                <span className='text-green-600'>${totalPrice.toFixed(2)}</span>
              </div>
              <button
                type='button'
                className='w-full mt-4 bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 font-semibold'
              >
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
});

CartExample.displayName = 'CartExample';

export default CartExample;
