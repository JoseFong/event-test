import prisma from "@/libs/prisma";

export async function getEventsFromUser(id:number){
    return await prisma.event.findMany({
        where:{
            userId:id
        }
    })
}