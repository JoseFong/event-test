import prisma from "@/libs/prisma";
import bcrypt from "bcryptjs";
import { deleteEventsFromUser } from "./eventController";

export async function getAllUsers(){
    return await prisma.user.findMany()
}

export async function createUser(data:any){
    const hashed = await bcrypt.hash(data.password,10)

    if(data.mail==="fomi03@gmail.com"){
        return prisma.user.create({
            data:{
                mail:data.mail,
                name:data.name,
                lastname:data.lastname,
                password:hashed,
                type: "superadmin"
            }
        })
    }else{
        return prisma.user.create({
            data:{
                mail:data.mail,
                name:data.name,
                lastname:data.lastname,
                password:hashed,
                type: "normal"
            }
        })
    }    
}

export async function deleteUser(id:number){
    await deleteEventsFromUser(id)
    await prisma.user.delete({
        where: {
            id:id
        }
    })
}

export async function updateUserInfo(id:number,data:any){
    await prisma.user.update({
        where:{
            id:id
        },
        data:{
            mail:data.mail,
            name:data.name,
            lastname:data.lastname
        }
    })
}

export async function changeUserPassword(id:number,data:any){
    const hashed = await bcrypt.hash(data.password,10)
    await prisma.user.update({
        where:{
            id:id
        },
        data:{
            password: hashed
        }
    })
}

export async function getUserFromMail(mail:string){
    return await prisma.user.findFirst({
        where:{
            mail:mail
        }
    })
}