import { changeUserPassword } from "@/Controllers/UserController";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import { cookies } from "next/headers";

export async function PATCH(req:Request){
    try{
        const cookieStore = await cookies()
        const cookie = cookieStore.get("userId")
        if(!cookie){
            return NextResponse.json({message:"Error al obtener los usuarios."},{status:400})
        }else{
            const decoded:any = jwt.verify(cookie.value,process.env.JWT_SECRET!)
            const body = await req.json()

            const url = new URL(req.url)
            const pathname = url.pathname
            const id = pathname.split("/").pop() || ""
            const idNum:number = parseInt(id)

            await changeUserPassword(idNum,body)
            return NextResponse.json({status:200})
        } 
        
    }catch(e:any){
        return NextResponse.json({message:"Error 500: "+e.message},{status:500})
    }
}