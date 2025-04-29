import { deleteEventsFromUser } from "@/Controllers/eventController";
import { createUser, deleteUser, getAllUsers } from "@/Controllers/UserController";
import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET(req:Request){
    try{
        const users = await getAllUsers()
        return NextResponse.json(users)
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
            return NextResponse.json(user)
        }else{
            console.log("Ya hay user con este correo")
            return NextResponse.json({message:"Ya existe un usuario con ese correo"},{status:500})
        }
    }catch(e:any){
        return NextResponse.json({message:"Error 500: "+e.message},{status:500})
    }
}