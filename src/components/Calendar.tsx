"use client";
import { Event } from "@/generated/prisma";
import { buildCalendarObj, getMonthName } from "@/utils/dateLogic";
import React, { useEffect, useState } from "react";
import DayDetails from "./DayDetails";
import { Skeleton } from "./ui/skeleton";
import { getSeasonalColors } from "@/utils/colors";

function Calendar({ events, user }: { events: any[]; user: any }) {
  const now = new Date();
  const todayStr = now.getDate() + "";

  const [loadingEvents, setLoadingEvents] = useState(true);
  const [eventsForCalendar, setEventsForCalendar] = useState<Day[]>([]);

  const [season, setSeason] = useState("");

  type Day = {
    id: number; // ID del día, que es solo un índice en este caso
    date: string; // Fecha del día en formato string
    events: Event[]; // Array de eventos que ocurren ese día
  };

  useEffect(() => {
    getSeason();
  }, []);

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

  function getSeason() {
    const now = new Date();
    const month = now.getMonth() + 3;
    if (month >= 3 && month < 6) setSeason("sp");
    if (month >= 6 && month < 9) setSeason("su");
    if (month >= 9 && month < 12) setSeason("fa");
    if (month === 12 || month === 1 || month === 2) setSeason("wi");
  }

  return (
    <div className="flex items-center justify-center text-md">
      {selectedDay && (
        <DayDetails
          user={user}
          events={selectedDay?.events}
          open={openDayDetails}
          setOpen={setOpenDayDetails}
        />
      )}
      {loadingEvents ? (
        <Skeleton className="w-[500px] h-[500px]" />
      ) : (
        <div className="text-zinc-900 grid grid-cols-7 gap-4">
          <div className="flex items-center justify-center">
            <div
              className={`${season === "sp" && "text-springsec"} ${
                season === "su" && "text-summersec"
              } ${season === "fa" && "text-fallsec"} ${
                season === "wi" && "text-wintersec"
              } font-bold`}
            >
              DOM
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div
              className={`${season === "sp" && "text-springsec"} ${
                season === "su" && "text-summersec"
              } ${season === "fa" && "text-fallsec"} ${
                season === "wi" && "text-wintersec"
              } font-bold`}
            >
              LUN
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div
              className={`${season === "sp" && "text-springsec"} ${
                season === "su" && "text-summersec"
              } ${season === "fa" && "text-fallsec"} ${
                season === "wi" && "text-wintersec"
              } font-bold`}
            >
              MAR
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div
              className={`${season === "sp" && "text-springsec"} ${
                season === "su" && "text-summersec"
              } ${season === "fa" && "text-fallsec"} ${
                season === "wi" && "text-wintersec"
              } font-bold`}
            >
              MIE
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div
              className={`${season === "sp" && "text-springsec"} ${
                season === "su" && "text-summersec"
              } ${season === "fa" && "text-fallsec"} ${
                season === "wi" && "text-wintersec"
              } font-bold`}
            >
              JUE
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div
              className={`${season === "sp" && "text-springsec"} ${
                season === "su" && "text-summersec"
              } ${season === "fa" && "text-fallsec"} ${
                season === "wi" && "text-wintersec"
              } font-bold`}
            >
              VIE
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div
              className={`${season === "sp" && "text-springsec"} ${
                season === "su" && "text-summersec"
              } ${season === "fa" && "text-fallsec"} ${
                season === "wi" && "text-wintersec"
              } font-bold`}
            >
              SAB
            </div>
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
                    `${season === "sp" && "bg-springsec"} ${
                      season === "su" && "bg-summersec"
                    } ${season === "fa" && "bg-fallsec"} ${
                      season === "wi" && "bg-wintersec"
                    } hover:scale-110 transition-all cursor-pointer text-white`
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
