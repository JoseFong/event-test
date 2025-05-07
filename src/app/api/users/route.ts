import { createUser, getAllUsers} from "@/Controllers/UserController";
import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import {cookies} from "next/headers"

export async function GET(req:Request){
    try{
        const cookieStore = await cookies()
        const cookie = cookieStore.get("userId")
        if(!cookie){
            return NextResponse.json({message:"Error al obtener los usuarios."},{status:400})
        }else{
            const decoded:any = jwt.verify(cookie.value,process.env.JWT_SECRET!)
            if(decoded.type!=="superadmin"){
                return NextResponse.json({message:"Error al obtener los usuarios."},{status:400})
            }else{
                console.log("fetching users")
                const users = await getAllUsers()
                return NextResponse.json(users)
            }
        }
    }catch(e:any){
        return NextResponse.json({message:"Error 500: "+e.message},{status:500})
    }
}

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
                {id:user.id,name:user.name,mail:user.mail,lastname:user.lastname,type:user.type },
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
        }else{
            console.log("Ya hay un usuario con este correo")
            return NextResponse.json({message:"Ya existe un usuario con ese correo"},{status:500})
        }
    }catch(e:any){
        return NextResponse.json({message:"Error 500: "+e.message},{status:500})
    }
}

