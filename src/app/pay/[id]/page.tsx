"use client"

import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import React, { useEffect, useState } from 'react'
import { StripeElementsOptions } from '@stripe/stripe-js';
import CheckoutForm from '@/components/CheckoutForm';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

const Paypage = ({params}:{params:{id:string}}) => {
  const [clientSecret, setClientSecret] = useState("")

  const {id} = params;


  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await fetch(
          `${baseUrl}/api/create-intent/${id}`,
          {
            method: "POST",
          }
        );
        const data = await res.json();
        setClientSecret(data.clientSecret);
      } catch (err) {
        console.log(err);
      }
    };

    makeRequest();
  }, [id]);
  
  const options:StripeElementsOptions = {
    clientSecret,
    appearance:{
      theme:"stripe",
      labels:"floating"
    }
  }

  return (
    <div>
      {clientSecret && stripePromise && (
        <div className="w-full h-screen">
          <Elements stripe={stripePromise} options={options}>
            <CheckoutForm />
          </Elements>
        </div>
      )}
    </div>
  )
}

export default Paypage