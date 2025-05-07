import prisma from "@/libs/prisma";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken"

export async function POST(req:Request){
    try{
        const body = await req.json()
        const user = await prisma.user.findFirst({
            where:{
                mail:body.mail
            }
        })
        if(!user){
            return NextResponse.json({message:"Credenciales incorrectas"},{status:400})
        }else{
            const compare = await bcrypt.compare(body.password,user.password)
            if(!compare){
                return NextResponse.json({message:"Credenciales incorrectas"},{status:400})
            }else{
                const token = jwt.sign(
                    {id:user.id,name:user.name,mail:user.mail,lastname:user.lastname,type:user.type},
                    process.env.JWT_SECRET!,
                    {expiresIn:"7d"}
               )
                
                const cookieStore = await cookies()
                const cookie = cookieStore.get("userId")
               if(cookie){
                cookieStore.delete("userId")
               }

                cookieStore.set({
                    name: "userId",
                    value: token,
                    httpOnly: true,
                    path:"/",
                    maxAge: 7*24*60*60
                })
                return NextResponse.json({status:200})
            }
        }
    }catch(e:any){
        return NextResponse.json({message:"Error 500: "+e.message},{status:500})
    }
}