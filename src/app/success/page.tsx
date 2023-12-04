"use client";

import React, { useEffect } from 'react'
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

const Successpage = () => {
  const searchParams = useSearchParams();
  const payment_intent = searchParams.get("payment_intent")
  const router = useRouter()


  useEffect(()=>{
    const makeRequest = async ()=>{
      try{
        const res = await fetch(`http://localhost:3000/api/confirm/${payment_intent}`, {
          method:"PUT"
        })
        const data = await res.json()
        router.push("/orders")
    }catch(err){
      console.log(err)
    }
    }
    makeRequest()
  },[payment_intent, router])

  return (
    <div>Payment successful. You are being redirected to the orders page.
     Please do not close this page.</div>
  )
}

export default Successpage 