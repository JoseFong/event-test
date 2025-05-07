import prisma from "@/libs/prisma";
import { buildCalendarObj, sortEventsByDate } from "@/utils/dateLogic";

export async function getEventsFromUser(id:number){
    const events = await prisma.event.findMany({
        where:{
            userId:id
        }
    })

    const sortedEvents:any = sortEventsByDate(events)
    return sortedEvents
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