// import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from "next/server"
import connect from "@/utils/db";
import Product from "@/models/Product";

// FETCH ALL PRODUCTS
export const GET = async (req:NextRequest) => {
    // const url = new URL(request.url);

    const {searchParams} = new URL(req.url)
    const cat = searchParams.get("cat")

    const filters = {
      // ...(cat ? {category:{categoryTitle:cat}} : {isFeatured: true})
      ...(cat ? {"category.categoryTitle": cat} :  {isFeatured: true})
    }
  
    try {
      await connect();
  
      const allProducts = await Product.find(filters);
      console.log(allProducts)
  
      return new NextResponse(JSON.stringify(allProducts), { status: 200 });
    } catch (err) {
      return new NextResponse("Database Error", { status: 500 });
    }
  };

// export const GET = async (request, { params }) => {
//   const { id } = params;

//   try {
//     await connect();

//     const post = await Category.findById(id);

//     return new NextResponse(JSON.stringify(post), { status: 200 });
//   } catch (err) {
//     return new NextResponse("Database Error", { status: 500 });
//   }
// };

// export const DELETE = async (request, { params }) => {
//   const { id } = params;

//   try {
//     await connect();

//     await Category.findByIdAndDelete(id);

//     return new NextResponse("Post has been deleted", { status: 200 });
//   } catch (err) {
//     return new NextResponse("Database Error", { status: 500 });
//   }
// };


// export const GET =()=>{
//     return new NextResponse("Hello GET", {status:200})
// }

// export const POST =()=>{
//     return new NextResponse("Hello Post", {status:200})
// }


export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();

    const newProduct = new Product(body)

    const product = await newProduct.save( )

    return new NextResponse(JSON.stringify(product), { status: 201 });
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};
