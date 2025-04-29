import prisma from "@/libs/prisma";
import bcrypt from "bcryptjs";

export async function getAllUsers(){
    return await prisma.user.findMany()
}

export async function deleteUser(id:number){
    await prisma.user.delete({
        where:{
            id: id
        }
    })
}

export async function createUser(data:any){
    const hashed = await bcrypt.hash(data.password,10)

    return prisma.user.create({
        data:{
            mail:data.mail,
            name:data.name,
            lastname:data.lastname,
            password:hashed
        }
    })
}