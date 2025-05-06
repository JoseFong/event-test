import { createUser} from "@/Controllers/UserController";
import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import {cookies} from "next/headers"


export async function POST(req:Request){
    try{
        const body = await req.json()
        const user = await prisma.user.findFirst({
            where:{
                mail:body.mail
            }
        })
        if(!user){
            const user = await createUser(body)

            const token = jwt.sign(
                {id:user.id,name:user.name,mail:user.mail,lastname:user.lastname},
                process.env.JWT_SECRET!,
                {expiresIn:"7d"}
            )

            const cookieStore = await cookies()
            cookieStore.set({
                name: "userId",
                value: token,
                httpOnly: true,
                path:"/",
                maxAge: 7*24*60*60
            })
            return NextResponse.json({status:200})
        }else{
            console.log("Ya hay un usuario con este correo")
            return NextResponse.json({message:"Ya existe un usuario con ese correo"},{status:500})
        }
    }catch(e:any){
        return NextResponse.json({message:"Error 500: "+e.message},{status:500})
    }
}