import Order from "@/models/Order"
import { NextResponse, NextRequest } from "next/server"

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

export const POST = async (req:NextRequest,{params}:{params:{orderId:string}}) => {
    
    const {orderId} = params
    const order = await Order.findById({_id:orderId})

    if(order){
        const paymentIntent = await stripe.paymentIntents.create({
            amount: 100 * 100,
            currency: "usd",
            automatic_payment_methods: {
                enabled: true
            }
        })

        await Order.findByIdAndUpdate({_id:orderId}, {
            intent_id: paymentIntent.id
        })

        return new NextResponse(JSON.stringify({clientSecret:paymentIntent.client_secret}), {status:200})
    }else{
        return new NextResponse(JSON.stringify({message:"Order not found!"}), {status:404})
    }
}