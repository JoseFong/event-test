import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import { createEvent, getEventsFromUser } from "@/Controllers/eventController";


export async function GET(req:Request){
    try{
        const cookieStore = await cookies()
        const cookie = cookieStore.get("userId")
        if(!cookie){
            return NextResponse.json({message:"Error al conseguir los eventos"},{status:400})
        }else{
            const decoded:any = jwt.verify(cookie.value,process.env.JWT_SECRET!)
            const id:number = parseInt(decoded.id)
            const events = await getEventsFromUser(id)
            return NextResponse.json(events)
        }
    }catch(e:any){
        return NextResponse.json({message:"Error 500: "+e.message},{status:500})
    }
}

export async function POST(req:Request){
    try{
        const cookieStore = await cookies()
        const cookie = cookieStore.get("userId")
        if(!cookie) return NextResponse.json({message:"Error al registrar el evento"},{status:400})
        const decoded:any = jwt.verify(cookie.value,process.env.JWT_SECRET!)
        const id:number = parseInt(decoded.id)

        const body = await req.json()

        await createEvent(id,body)
        return NextResponse.json({status:200})
    }catch(e:any){
        return NextResponse.json({message:"Error 500: "+e.message},{status:500})
    }
}