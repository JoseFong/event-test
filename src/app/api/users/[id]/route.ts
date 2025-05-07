import { deleteUser, getUserFromMail, updateUserInfo } from "@/Controllers/UserController";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import { cookies } from "next/headers";

export async function DELETE(req:Request){
    try{
        const cookieStore = await cookies()
        const cookie = cookieStore.get("userId")
        if(!cookie){
            return NextResponse.json({message:"Error al obtener los usuarios."},{status:400})
        }else{
            const decoded:any = jwt.verify(cookie.value,process.env.JWT_SECRET!)
            const url = new URL(req.url)
            const pathname = url.pathname
            const id = pathname.split("/").pop() || ""
            const idNum:number = parseInt(id)
    
            await deleteUser(idNum)
            return NextResponse.json({status:200})
        }
        
    }catch(e:any){
        return NextResponse.json({message:"Error 500: "+e.message},{status:500})
    }
}

export async function PATCH(req:Request){
    try{
        const cookieStore = await cookies()
        const cookie = cookieStore.get("userId")
        if(!cookie){
            return NextResponse.json({message:"Error al obtener los usuarios."},{status:400})
        }else{
            const decoded:any = jwt.verify(cookie.value,process.env.JWT_SECRET!)
            const url = new URL(req.url)
            const pathname = url.pathname
            const id = pathname.split("/").pop() || ""
            const idNum = parseInt(id)

            const body = await req.json()
            const mail = body.mail+""

            const user = await getUserFromMail(mail)
            if(user && user.id!==idNum){
                return NextResponse.json({message:"Ya existe un usuario con ese correo"},{status:400})
            }else{
                await updateUserInfo(idNum,body)
                return NextResponse.json({status:200})
            }
        } 
    }catch(e:any){
        return NextResponse.json({message:"Error 500: "+e.message},{status:500})
    }
}

/*
const cookieStore = await cookies()
        const cookie = cookieStore.get("userId")
        if(!cookie){
            return NextResponse.json({message:"Error al obtener los usuarios."},{status:400})
        }else{
            const decoded:any = jwt.verify(cookie.value,process.env.JWT_SECRET!)
            
        } 
            */