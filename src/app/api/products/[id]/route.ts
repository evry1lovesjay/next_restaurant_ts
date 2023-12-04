import Product from '@/models/Product';
import { getAuthSession } from '@/utils/auth';
import { NextRequest, NextResponse } from 'next/server';
import connect from "@/utils/db";

// GET SINGLE PRODUCT
export const GET = async (req:NextRequest, {params}: {params: {id: string}}) =>{

    const {id} = params

    try {
        const singleProduct = await Product.findOne({_id:id})
            
        return new NextResponse(
            JSON.stringify(singleProduct),{status: 200}
        )
        
    } catch (error) {
        console.log(error)
        return new NextResponse(
            JSON.stringify({message: "Something went wrong while fetching single product!!!"}),{status: 500}
        )
    }
}

// DELETE SINGLE PRODUCT
export const DELETE = async (req:NextRequest, {params}:{params: {id: string}}) => {
    const {id} = params

    console.log("id from params",id)

    await connect()

    const session = await getAuthSession()

    if(session?.user.isAdmin){
        
        try{
            await Product.findByIdAndDelete({_id:id})
            
            return new NextResponse(JSON.stringify("Product has been deleted"), {status: 200})
        } catch (err){
            console.log(err)
            return new NextResponse(
                JSON.stringify({message: "Something went wrong!"}),
                {status: 500}
                )
            }
    }

    return new NextResponse(
        JSON.stringify({message: "You are not allowed to perform that operation!"}),
        {status: 403}
    )
}