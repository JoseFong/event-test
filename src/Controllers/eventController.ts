import prisma from "@/libs/prisma";

export async function deleteEventsFromUser(id:number){
    await prisma.event.deleteMany({
        where:{
            userId:id
        }
    })
}