import { NextAuthOptions, getServerSession, User as UserM} from 'next-auth';
import GoogleProvider from "next-auth/providers/google";
// import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/User";
import clientPromise from '@/app/api/auth/lib/mongodb';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import connect from './db';

declare module "next-auth"{
    interface  Session{
        user:UserM & {
            isAdmin: Boolean
        }
    }
}

declare module "next-auth/jwt"{
    interface  JWT{
            isAdmin: Boolean
    }
}

export const authOptions: NextAuthOptions = {
    // adapter: MongoDBAdapter(clientPromise),

    session:{
        strategy:'jwt'
    },

    providers: [
        // CredentialsProvider({
        //     id: "credentials",
        //     name: "Credentials",
        //     async authorize(credentials) {
        //     //Check if the user exists.
        //     await connect();

        //     try {
        //         const user = await User.findOne({
        //         email: credentials.email,
        //         });

        //         if (user) {
        //         const isPasswordCorrect = await bcrypt.compare(
        //             credentials.password,
        //             user.password
        //         );

        //         if (isPasswordCorrect) {
        //             console.log(user)
        //             return user;
                    
        //         } else {
        //             throw new Error("Wrong Credentials!");
        //         }
        //         } else {
        //         throw new Error("User not found!");
        //         }
        //     } catch (err) {
        //         throw new Error(err);
        //     }
        //     },
        // }),
        // GithubProvider({
        //     clientId: process.env.GITHUB_ID as string,
        //     clientSecret: process.env.GITHUB_SECRET as string,
        // }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID!,
            clientSecret: process.env.GOOGLE_SECRET!,
            // clientId: process.env.GOOGLE_CLIENT_ID as string,
            // clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
    ],

    pages: {
        error: "/dashboard/login",
    },

    // callbacks:{
    //     async session({token, session}){
    //         if(token){
    //             session.user.isAdmin = token.isAdmin
    //         }

    //         return session
    //     },

    //     async jwt({token, session}){

    //         const userInDb = await User.find
    //         if(token){
    //             session.user.isAdmin = token.isAdmin
    //         }

    //         return session
    //     }
    // }

    callbacks: {
        async signIn(params) {
            const {user, account} = params
            if (account === null) {
                // Handle the case where 'account' is null, if needed
                return false; // Return false to indicate that the sign-in should not proceed
                }
          // If signing in with Google
          if (account.provider === 'google') {
            const existingUser = await User.findOne({ email: user.email });
      
            if (existingUser) {
              // Update the existing user record with the isAdmin field, if necessary
              if (typeof existingUser.isAdmin === 'undefined') {
                existingUser.isAdmin = false; // Default value, adjust as necessary
                await existingUser.save();
              }
            } else {
              // If the user doesn't exist in the database, create a new user record
              await User.create({
                email: user.email,
                name: user.name,
                image: user.image,
                isAdmin: false,  // Default value, adjust as necessary
                provider: account.provider
              });
            }
          }
      
          return true;
        },

        async jwt({token}){

            // const user = await getUserByEmail({ email: token.email });
            // token.user = user;
            // if(token){
            //     session.user.isAdmin = token.isAdmin
            // }

            const userInDb = await User.findOne({email: token.email})
            token.isAdmin = userInDb?.isAdmin

            return token
        },

        async session({token, session}){

          // session.user = token.user

            if(token){
                session.user.isAdmin = token.isAdmin
            }
 
            return session
        },

      },

}

export const getAuthSession = ()=>getServerSession(authOptions)

// async function getUserByEmail({email}){
//   const user = await User.findOne({email}).select("-password")
//   if(!user) throw new Error("Email does not exist!!!")

//   return {...user._doc, _id: user._id.toString()}
// }