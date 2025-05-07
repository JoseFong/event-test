import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { deleteEvent, updateEvent } from "@/Controllers/eventController"

export async function DELETE(req:Request){
    try{
            const cookieStore = await cookies()
            const cookie = cookieStore.get("userId")
            if(!cookie) return NextResponse.json({message:"Error al eliminar el evento"},{status:400})
            const decoded:any = jwt.verify(cookie.value,process.env.JWT_SECRET!)
            
            const url = new URL(req.url)
            const pathname = url.pathname
            const id = pathname.split("/").pop() || ""
            const idNum:number = parseInt(id)
            
            await deleteEvent(idNum)

            return NextResponse.json({status:200})
        }catch(e:any){
            return NextResponse.json({message:"Error 500: "+e.message},{status:500})
        }
}

export async function PATCH(req:Request){
    try{
            const cookieStore = await cookies()
            const cookie = cookieStore.get("userId")
            if(!cookie) return NextResponse.json({message:"Error al editar el evento"},{status:400})
            const decoded:any = jwt.verify(cookie.value,process.env.JWT_SECRET!)
            
            const url = new URL(req.url)
            const pathname = url.pathname
            const id = pathname.split("/").pop() || ""
            const idNum:number = parseInt(id)
            
            const body = await req.json()

            await updateEvent(idNum,body)

            return NextResponse.json({status:200})
        }catch(e:any){
            return NextResponse.json({message:"Error 500: "+e.message},{status:500})
        }
}