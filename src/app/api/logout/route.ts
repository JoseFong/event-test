import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req:Request){
    try{
        const cookieStore = await cookies()
        cookieStore.delete("userId")
        return NextResponse.json({status:200})
    }catch(e:any){
        return NextResponse.json({message:"Error 500: "+e.message},{status:500})
    }
}