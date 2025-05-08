"use client";
import { Event } from "@/generated/prisma";
import { buildCalendarObj, getMonthName } from "@/utils/dateLogic";
import React, { useEffect, useState } from "react";
import DayDetails from "./DayDetails";
import { Skeleton } from "./ui/skeleton";
import { getSeasonalColors } from "@/utils/colors";

function Calendar({ events }: { events: Event[] }) {
  const now = new Date();
  const todayStr = now.getDate() + "";

  const [loadingEvents, setLoadingEvents] = useState(true);
  const [eventsForCalendar, setEventsForCalendar] = useState<Day[]>([]);

  type Day = {
    id: number; // ID del día, que es solo un índice en este caso
    date: string; // Fecha del día en formato string
    events: Event[]; // Array de eventos que ocurren ese día
  };

  useEffect(() => {
    setLoadingEvents(true);
    if (events.length > 0) {
      const efc: Day[] = buildCalendarObj(events);
      setEventsForCalendar(efc);
      setLoadingEvents(false);
    }
  }, [events]);

  const [openDayDetails, setOpenDayDetails] = useState(false);
  const [selectedDay, setSelectedDay] = useState<any>(null);

  function openModal(d: any) {
    setSelectedDay(d);
    setOpenDayDetails(true);
  }

  const { mcb, mct, scb, sct } = getSeasonalColors();

  return (
    <div className="flex items-center justify-center text-md">
      {selectedDay && (
        <DayDetails
          events={selectedDay?.events}
          open={openDayDetails}
          setOpen={setOpenDayDetails}
        />
      )}
      {loadingEvents ? (
        <Skeleton className="bg-zinc-700 w-80 h-80" />
      ) : (
        <div className="text-zinc-900 grid grid-cols-7 gap-4">
          <div className="flex items-center justify-center">
            <div className={`${sct} font-bold`}>DOM</div>
          </div>
          <div className="flex items-center justify-center">
            <div className={`${sct} font-bold`}>LUN</div>
          </div>
          <div className="flex items-center justify-center">
            <div className={`${sct} font-bold`}>MAR</div>
          </div>
          <div className="flex items-center justify-center">
            <div className={`${sct} font-bold`}>MIE</div>
          </div>
          <div className="flex items-center justify-center">
            <div className={`${sct} font-bold`}>JUE</div>
          </div>
          <div className="flex items-center justify-center">
            <div className={`${sct} font-bold`}>VIE</div>
          </div>
          <div className="flex items-center justify-center">
            <div className={`${sct} font-bold`}>SAB</div>
          </div>
          {eventsForCalendar.map((d: Day) => (
            <>
              {d.date !== "" ? (
                <div
                  onClick={d.events.length > 0 ? () => openModal(d) : undefined}
                  className={`flex items-center justify-center  h-16 w-16 rounded-full ${
                    d.date === todayStr && "border-4 border-black"
                  } ${
                    d.events.length > 0 &&
                    `${scb} hover:scale-110 transition-all cursor-pointer text-white`
                  } `}
                >
                  {d.date}
                </div>
              ) : (
                <div></div>
              )}
            </>
          ))}
        </div>
      )}
    </div>
  );
}

export default Calendar;
