import Order from "@/models/Order";
import { NextResponse, NextRequest  } from "next/server";

export const PUT = async (req:NextRequest,{ params }: { params: { intentId: string } }) => {
  const { intentId } = params;

  try {
    const updatedOrder = await Order.findOneAndUpdate(
      { intent_id: intentId },
      { $set: { status: "Being Prepared" } },
      { new: true } // To return the updated document
    );

    if (updatedOrder) {
      return new NextResponse(
        JSON.stringify({ message: "Order has been updated" }),
        { status: 200 }
      );
    } else {
      return new NextResponse(
        JSON.stringify({ message: "Order not found" }),
        { status: 404 }
      );
    }
  } catch (error) {
    console.log(error)
    return new NextResponse(
            JSON.stringify({ message: "Something went wrong!" }),
            { status: 500 }
          );
  }
}