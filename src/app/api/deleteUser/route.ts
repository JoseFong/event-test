import { deleteEventsFromUser } from "@/Controllers/eventController"
import { deleteUser } from "@/Controllers/UserController"
import { NextResponse } from "next/server"

export async function POST(req:Request){
    try{
        const body = await req.json()
        const id:number = parseInt(body.userId)
        await deleteEventsFromUser(id)
        await deleteUser(id)
        return NextResponse.json({status:200})
    }catch(e:any){
        return NextResponse.json({message:"Error 500: "+e.message},{status:500})
    }
}