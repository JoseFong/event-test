import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { getEventsFromUser } from "@/Controllers/eventController"

export async function GET(req:Request){
    try{
        const cookieStore = await cookies()
        const cookie = cookieStore.get("userId")
        if(!cookie){
            return NextResponse.json({message:"Error al obtener los eventos."},{status:400})
        }else{
            const decoded:any = jwt.verify(cookie.value,process.env.JWT_SECRET!)
            if(decoded.type!=="superadmin"){
                return NextResponse.json({message:"Error al obtener los eventos."},{status:400})
            }else{
                const url = new URL(req.url)
                const pathname = url.pathname
                const id = pathname.split("/").pop() || ""
                const idNum = parseInt(id)
                const events = await getEventsFromUser(idNum)
                return NextResponse.json(events)
            }
        }
    }catch(e:any){
        return NextResponse.json({message:"Error 500: "+e.message},{status:500})
    }
}