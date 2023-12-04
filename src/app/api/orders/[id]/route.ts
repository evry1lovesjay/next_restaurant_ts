import Order from '@/models/Order';
import { NextRequest, NextResponse } from 'next/server';

export const PUT = async (req:NextRequest, {params}: {params: {id: string}}) =>{

    const {id} = params

    // console.log("id outside try", id)

    try {
        // console.log("id from try block", id)
        const body = await req.json()
        // console.log("the body", body)


        await Order.findOneAndUpdate({_id:id}, {$set:{status: body}},{new: true})
            
        return new NextResponse(
            JSON.stringify({message: "Order status updated!!!"}),{status: 201}
        )
        
    } catch (error) {
        console.log(error)
        return new NextResponse(
            JSON.stringify({message: "Something went wrong while updating status!!!"}),{status: 500}
        )
    }
}