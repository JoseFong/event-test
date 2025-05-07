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

export async function createEvent(id:number,data:any){
    await prisma.event.create({
        data:{
            name:data.name,
            date:data.date,
            allday: parseInt(data.allDay),
            userId: id,
            start:data.start,
            end:data.end
        }
    })
}

export async function deleteEvent(id:number){
    await prisma.event.delete({
        where:{
            id:id
        }
    })
}

export async function updateEvent(id:number,data:any){
    await prisma.event.update({
        where:{
            id:id
        },
        data:{
            name:data.name,
            date:data.date,
            allday:parseInt(data.allDay),
            start:data.start,
            end:data.end
        }
    })
}