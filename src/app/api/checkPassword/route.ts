import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import prisma from "@/libs/prisma";
import bcrypt from "bcryptjs";

export async function POST(req:Request){
    try{
        const cookieStore = await cookies()
        const cookie = cookieStore.get("userId")
        console.log("entrando a checkpassword")
        if(!cookie){
            return NextResponse.json({message:"Hubo un error al procesar la solicitud"},{status:400})
        }else{
            const decoded:any = jwt.verify(cookie.value,process.env.JWT_SECRET!)
            const id:number = parseInt(decoded.id)

            console.log(id)

            const body = await req.json()
            const user = await prisma.user.findFirst({
                where:{
                    id:id
                }
            })

            console.log(user)
            if(!user) return NextResponse.json({message:"Hubo un error al procesar la solicitud"},{status:400})
            const valid = await bcrypt.compare(body.password,user?.password)
            console.log(valid)
            if(!valid) return NextResponse.json({message:"Contraseña incorrecta"},{status:400})
                return NextResponse.json({status:200})
        }
        
        
    }catch(e:any){
        return NextResponse.json({message:"Error 500: "+e.message},{status:500})
    }
}