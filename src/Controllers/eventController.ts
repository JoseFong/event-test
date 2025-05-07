import prisma from "@/libs/prisma";

export async function getEventsFromUser(id:number){
    return await prisma.event.findMany({
        where:{
            userId:id
        }
    })
}

export async function deleteEventsFromUser(id:number ){
    await prisma.event.deleteMany({
        where:{
            userId: id
        }
    })
}