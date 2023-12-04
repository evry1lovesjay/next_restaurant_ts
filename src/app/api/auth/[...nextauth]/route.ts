import { authOptions } from "@/utils/auth"
import NextAuth from "next-auth/next"


const handler = NextAuth(authOptions)

export {handler as GET, handler as POST}

// const handler = NextAuth({
//     providers: [
//         // CredentialsProvider({
//         //     id: "credentials",
//         //     name: "Credentials",
//         //     async authorize(credentials) {
//         //     //Check if the user exists.
//         //     await connect();

//         //     try {
//         //         const user = await User.findOne({
//         //         email: credentials.email,
//         //         });

//         //         if (user) {
//         //         const isPasswordCorrect = await bcrypt.compare(
//         //             credentials.password,
//         //             user.password
//         //         );

//         //         if (isPasswordCorrect) {
//         //             console.log(user)
//         //             return user;
                    
//         //         } else {
//         //             throw new Error("Wrong Credentials!");
//         //         }
//         //         } else {
//         //         throw new Error("User not found!");
//         //         }
//         //     } catch (err) {
//         //         throw new Error(err);
//         //     }
//         //     },
//         // }),
//         // GithubProvider({
//         //     clientId: process.env.GITHUB_ID as string,
//         //     clientSecret: process.env.GITHUB_SECRET as string,
//         // }),
//         GoogleProvider({
//             clientId: process.env.GOOGLE_ID!,
//             clientSecret: process.env.GOOGLE_SECRET!,
//             // clientId: process.env.GOOGLE_CLIENT_ID as string,
//             // clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
//         }),
//     ],
//     adapter: MongoDBAdapter({
//         db: await clientPromise, // Initialize your MongoDB connection
//         collection: 'users',
//         }),
//     })

// export {handler as GET, handler as POST}


// // import NextAuth from "next-auth"
// import NextAuth from "next-auth/next"
// import GoogleProvider  from 'next-auth/providers/google';

// export const authOptions = {
//   // Configure one or more authentication providers
//   providers: [
    //     GoogleProvider({
        //       clientId: process.env.GOOGLE_ID!,
        //       clientSecret: process.env.GOOGLE_SECRET!,
        //     }),
        //     // ...add more providers here
//   ],
// }

// export default NextAuth(authOptions)



// import { NextAuthOptions, getServerSession} from 'next-auth';
// import GoogleProvider from "next-auth/providers/google";
// // import CredentialsProvider from "next-auth/providers/credentials";
// import User from "@/models/User";
// import clientPromise from '@/app/api/auth/lib/mongodb';
// import { MongoDBAdapter } from '@next-auth/mongodb-adapter';

// // declare module "next-auth"{
// //     interface  Session{
// //         user:User & {
// //             isAdmin: Boolean
// //         }
// //     }
// // }

// // declare module "next-auth/jwt"{
// //     interface  JWT{
// //             isAdmin: Boolean
// //     }
// // }

// const handler = NextAuth({    
//     session:{
//         strategy:'jwt'
//     },
//     adapter: MongoDBAdapter(clientPromise),
//     providers: [
//         // CredentialsProvider({
//         //     id: "credentials",
//         //     name: "Credentials",
//         //     async authorize(credentials) {
//         //     //Check if the user exists.
//         //     await connect();

//         //     try {
//         //         const user = await User.findOne({
//         //         email: credentials.email,
//         //         });

//         //         if (user) {
//         //         const isPasswordCorrect = await bcrypt.compare(
//         //             credentials.password,
//         //             user.password
//         //         );

//         //         if (isPasswordCorrect) {
//         //             console.log(user)
//         //             return user;
                    
//         //         } else {
//         //             throw new Error("Wrong Credentials!");
//         //         }
//         //         } else {
//         //         throw new Error("User not found!");
//         //         }
//         //     } catch (err) {
//         //         throw new Error(err);
//         //     }
//         //     },
//         // }),
//         // GithubProvider({
//         //     clientId: process.env.GITHUB_ID as string,
//         //     clientSecret: process.env.GITHUB_SECRET as string,
//         // }),
//         GoogleProvider({
//             clientId: process.env.GOOGLE_ID!,
//             clientSecret: process.env.GOOGLE_SECRET!,
//         }),
//     ],
//     database: {
//         type: 'mongodb',
//         // client: await init(), // Initialize your MongoDB connection
//         // adapter: require('@next-auth/mongodb-adapter').MongoDBAdapter,
//         adapter: MongoDBAdapter(clientPromise),
//         collection: 'users',
//         model: User, // Specify your custom User model
//     },

//     pages: {
//     error: "/dashboard/login",
//     },

//     // callbacks:{
//     //     async session({token, session}){
//     //         if(token){
//     //             session.user.isAdmin = token.isAdmin
//     //         }

//     //         return session
//     //     },

//     //     async jwt({token, session}){

//     //         const userInDb = await User.find
//     //         if(token){
//     //             session.user.isAdmin = token.isAdmin
//     //         }

//     //         return session
//     //     }
//     // }

//     callbacks: {
//         async signIn(user, account, profile) {
//           if (account.provider === 'google' && user.email === 'evry1lovesjay@gmail.com') {
//             user.isAdmin = true;
//             await user.save(); // Save the user document
//           }
//           return true;
//         },
//       },
// }) 

// export const getAuthSession = ()=>getServerSession(authOptions)



