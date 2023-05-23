import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { StripeTransactionFunction } from '../apiService';

const PaymentForm: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement!,
    });

    if (error) {
      console.error('[PaymentForm] error:', error);
    } else {
      console.log('[PaymentForm] paymentMethod:', paymentMethod);
      setPaymentSuccess(true);
      window.location.href = '/'; // navigate to homepage
    }
  };

  return (
    <div className='bg-white flex items-center justify-center'>
      <div className='bg-white p-8 rounded-lg max-w-md w-full'>
        <h2 className='text-2xl font-bold mb-4'>Payment</h2>
        {paymentSuccess ? (
          <p className='text-green-500 mb-4'>Payment successful!</p>
        ) : null}
        <form onSubmit={handleSubmit}>
          <label className='block text-xl font-semibold mb-2'>
            Card details
          </label>
          <CardElement
            className='p-4 bg-white border border-gray-300 rounded-lg mb-4'
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#374151',
                  '::placeholder': {
                    color: '#6B7280',
                  },
                },
                invalid: {
                  color: '#B91C1C',
                },
              },
            }}
          />
          <button
            type='submit'
            className='bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed'
            disabled={!stripe}
            onSubmit={StripeTransactionFunction}
          >
            Pay
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentForm;
