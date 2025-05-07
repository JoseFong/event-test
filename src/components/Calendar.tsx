"use client";
import { Event } from "@/generated/prisma";
import { buildCalendarObj } from "@/utils/dateLogic";
import React, { useEffect, useState } from "react";

function Calendar({ events }: { events: Event[] }) {
  const [eventsForCalendar, setEventsForCalendar] = useState<Day[]>([]);

  type Day = {
    id: number; // ID del día, que es solo un índice en este caso
    date: string; // Fecha del día en formato string
    events: Event[]; // Array de eventos que ocurren ese día
  };

  useEffect(() => {
    if (events.length > 0) {
      const efc: Day[] = buildCalendarObj(events);
      setEventsForCalendar(efc);
    }
  }, [events]);

  return (
    <div className="text-white grid grid-cols-7 text-sm">
      <div className="border-2 border-white p-1">Domingo</div>
      <div className="border-2 border-white p-1">Lunes</div>

      <div className="border-2 border-white p-1">Martes</div>
      <div className="border-2 border-white p-1">Miercoles</div>
      <div className="border-2 border-white p-1">Jueves</div>
      <div className="border-2 border-white p-1">Viernes</div>
      <div className="border-2 border-white p-1">Sabado</div>
      {eventsForCalendar.map((d: Day) => (
        <div className="border-2 border-white p-1">
          <div>{d.date}</div>
          <>
            {d.events.map((e: Event) => (
              <>{e.name}</>
            ))}
          </>
        </div>
      ))}
    </div>
  );
}

export default Calendar;
