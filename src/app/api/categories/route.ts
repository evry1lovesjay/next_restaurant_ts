// import { PrismaClient } from '@prisma/client'
import { NextResponse } from "next/server"

// const prisma = new PrismaClient()

// const prisma = new PrismaClient();

// async function main() {
//     await prisma.category.create({
//         data:{
//             title: 'Italian Pastas',
//             desc: "Savor the taste of perfection with our exquisite Italian handmade pasta menu.",
//             color: "white",
//             slug: 'pastas',
//         },
//     }
//     )
  
//     const allCategories = await prisma.category.findMany()
//     console.dir(allCategories, { depth: null })
//   }

//   main()
//   .then(async () => {
//     await prisma.$disconnect()
//   })
//   .catch(async (e) => {
//     console.error(e)
//     await prisma.$disconnect()
//     process.exit(1)
//   })

// export const GET = async ()=>{
//     try {
//         const allCategories = await prisma.category.findMany()
//         return new NextResponse(JSON.stringify(allCategories), {status:200})
//     } catch (error) {
//         console.log(error)
//         return new NextResponse(JSON.stringify({message: "Something went wrong!"}), {status:500})
//     }
// }

// export const POST =()=>{
//     return new NextResponse("Hello Post", {status:200})
// }

//   main()
//   .then(async () => {
//     await prisma.$disconnect()
//   })
//   .catch(async (e) => {
//     console.error(e)
//     await prisma.$disconnect()
//     process.exit(1)
//   })

import connect from "@/utils/db";
import Category from "@/models/Category";

export const GET = async () => {
    // const url = new URL(request.url);
  
    try {
      await connect();
  
      const allCategories = await Category.find();
      console.log(allCategories)
  
      return new NextResponse(JSON.stringify(allCategories), { status: 200 });
    } catch (err) {
      return new NextResponse("Connection Errorrrr", { status: 500 });
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

export const POST =()=>{
    return new NextResponse("Hello Post", {status:200})
}


