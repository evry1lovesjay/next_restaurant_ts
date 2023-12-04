// import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from "next/server"
import connect from "@/utils/db";
import Product from "@/models/Product";
import { getAuthSession } from "@/utils/auth";
import Order from "@/models/Order";

// FETCH ALL ORDERS
export const GET = async (req:NextRequest) => {

    const session = await getAuthSession()

    if(session){
      try {
        await connect();

        if(session.user.isAdmin){
          const allOrders = await Order.find()
          return new NextResponse(JSON.stringify(allOrders), { status: 200 });
        }

        const allOrders = await Order.find({userEmail: session.user.email})
        return new NextResponse(JSON.stringify(allOrders), { status: 200 });

      } catch (err) {
        return new NextResponse(JSON.stringify({message: "Connection Error"}), { status: 500 });
      }
  }else{
    return new NextResponse(JSON.stringify({message: "Get Lost!!!, You are not authenticated!!!"}), { status: 401 });
    };

}

// CREATE ORDER
export const POST = async (req:NextRequest)=>{

  const session = await getAuthSession()

//   const newReview = new Review({
//     userId: req.userId,
//     gigId: req.body.gigId,
//     desc: req.body.desc,
//     star: req.body.star,
// })

  if(session){
    try {
      const body = await req.json();

      const newOrder = new Order(body)

        const order = await newOrder.save( )
        return new NextResponse(JSON.stringify(order), { status: 201 });

         } catch (err) {
      return new NextResponse(JSON.stringify({message: "Connection Error"}), { status: 500 });
    }
  }else{
    return new NextResponse(JSON.stringify({message: "Get Lost!!!, You are not authenticated!!!"}), { status: 401 });
  };

}


