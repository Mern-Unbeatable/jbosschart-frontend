import React, { memo, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSEO } from '../../hooks/useSEO';

const Checkout = memo(() => {
  const navigate = useNavigate();
  const location = useLocation();
  const { product, quantity } = location.state || {};

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
  });

  useSEO({
    title: 'Checkout',
    description: 'Complete your purchase',
    keywords: ['checkout', 'purchase', 'order'],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const subtotal = product ? product.price * quantity : 0;
  const deliveryFee = 15.0;
  const discount = -0.0;
  const total = subtotal + deliveryFee + discount;

  const handleConfirmPurchase = () => {
    if (!formData.fullName || !formData.email || !formData.phone || !formData.address || !formData.city || !formData.postalCode) {
      alert('Please fill in all fields');
      return;
    }
    alert(`Order confirmed! Total: €${total.toFixed(2)}`);
    navigate('/webshop');
  };

  if (!product) {
    return (
      <div className='min-h-screen bg-[#FBFDFF] flex items-center justify-center'>
        <div className='text-center'>
          <h1 className='text-3xl font-bold mb-4'>No product selected</h1>
          <button
            onClick={() => navigate('/webshop')}
            className='bg-[#E2AB0B] text-white px-6 py-2 rounded-lg'
          >
            Back to Webshop
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-[#FBFDFF] pt-8 md:pt-12 pb-14'>
      <div className='container mx-auto px-4 lg:px-6'>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-12'>
          {/* Left: Customer Information - 2 columns */}
          <div className='lg:col-span-2'>
            <h2 className='text-2xl md:text-3xl font-bold text-gray-800 mb-4'>Customer Information</h2>

            <div className='space-y-6'>
              {/* Full Name */}
              <div>
                <label className='block text-base font-semibold text-gray-700 mb-2'>Full Name</label>
                <input
                  type='text'
                  name='fullName'
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder='Enter your full name...'
                  className='w-full px-4 py-3 border border-[#00000033] bg-white rounded-lg focus:outline-none focus:border-[#E2AB0B]'
                />
              </div>

              {/* Email Address */}
              <div>
                <label className='block text-base font-semibold text-gray-700 mb-2'>Email Address</label>
                <input
                  type='email'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  placeholder='name@example.com'
                  className='w-full px-4 py-3 border border-[#00000033] bg-white rounded-lg focus:outline-none focus:border-[#E2AB0B]'
                />
              </div>

              {/* Phone Number */}
              <div>
                <label className='block text-base font-semibold text-gray-700 mb-2'>Phone Number</label>
                <input
                  type='tel'
                  name='phone'
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder='Enter your phone number...'
                  className='w-full px-4 py-3 border border-[#00000033] bg-white rounded-lg focus:outline-none focus:border-[#E2AB0B]'
                />
              </div>

              {/* Detailed Address */}
              <div>
                <label className='block text-base font-semibold text-gray-700 mb-2'>Detailed Address</label>
                <textarea
                  name='address'
                  value={formData.address}
                  onChange={handleChange}
                  placeholder='Street name, House no. Apartment...'
                  rows='4'
                  className='w-full px-4 py-3 border border-[#00000033] bg-white rounded-lg focus:outline-none focus:border-[#E2AB0B]'
                />
              </div>

              {/* City */}
              <div>
                <label className='block text-base font-semibold text-gray-700 mb-2'>City</label>
                <input
                  type='text'
                  name='city'
                  value={formData.city}
                  onChange={handleChange}
                  placeholder='Hopwell Junction'
                  className='w-full px-4 py-3 border border-[#00000033] bg-white rounded-lg focus:outline-none focus:border-[#E2AB0B]'
                />
              </div>

              {/* Postal Code */}
              <div>
                <label className='block text-base font-semibold text-gray-700 mb-2'>Postal Code</label>
                <input
                  type='text'
                  name='postalCode'
                  value={formData.postalCode}
                  onChange={handleChange}
                  placeholder='Zip 12345'
                  className='w-full px-4 py-3 border border-[#00000033] bg-white rounded-lg focus:outline-none focus:border-[#E2AB0B]'
                />
              </div>
            </div>
          </div>

          {/* Right: Order Summary */}
          <div className='lg:col-span-1'>
            <div className='bg-[#FCF7E7] rounded-lg p-4 md:p-6 sticky top-34'>
              <h2 className='text-2xl font-bold text-gray-800 mb-4'>Order Summary</h2>

              <div className='space-y-4 mb-6 border-b border-[#E2AB0B] pb-4'>
                {/* Subtotal */}
                <div className='flex justify-between items-center'>
                  <span className='text-gray-600'>Subtotal ({quantity} items)</span>
                  <span className='font-semibold text-gray-900'>€{subtotal.toFixed(2)}</span>
                </div>

                {/* Delivery Fee */}
                <div className='flex justify-between items-center'>
                  <span className='text-gray-600'>Delivery Fee</span>
                  <span className='font-semibold text-gray-900'>€{deliveryFee.toFixed(2)}</span>
                </div>

                {/* Discount */}
                <div className='flex justify-between items-center'>
                  <span className='text-gray-600'>Discount</span>
                  <span className='font-semibold text-gray-900'>${discount.toFixed(2)}</span>
                </div>
              </div>

              {/* Total */}
              <div className='flex justify-between items-center mb-4'>
                <span className='text-lg font-bold text-gray-800'>Total</span>
                <span className='text-2xl font-bold text-gray-900'>€{total.toFixed(2)}</span>
              </div>

              {/* Confirm Purchase Button */}
              <button
                onClick={handleConfirmPurchase}
                className='w-full bg-[#E2AB0B]  text-white font-bold py-3 rounded-lg transition-colors text-lg'
              >
                Confirm Purchase
              </button>
            </div>
          </div>
        </div>

        {/* Ads Placeholder */}
        <div className='w-full mt-24 bg-gray-50 rounded-2xl py-20 flex items-center justify-center border border-gray-200'>
          <span className='text-gray-400 font-bold text-2xl'>Ads</span>
        </div>
      </div>
    </div>
  );
});

Checkout.displayName = 'Checkout';

export default Checkout;
