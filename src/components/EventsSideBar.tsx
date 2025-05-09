"use client";
import React, { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";
import { Event } from "@/generated/prisma";
import { isToday, isThisWeek } from "@/utils/dateLogic";
import EditEvent from "./EditEvent";

function EventsSideBar({ events, user }: { events: Event[]; user: any }) {
  const [eventsToday, setEventsToday] = useState<Event[]>([]);
  const [eventsWeek, setEventsWeek] = useState<Event[]>([]);
  const [eventsElse, setEventsElse] = useState<Event[]>([]);

  const [seeOtherEvents, setSeeOtherEvents] = useState(false);

  const [loadingEvents, setLoadingEvents] = useState(true);

  const [selectedEvent, setSelectedEvent] = useState();
  const [editEventModal, setEditEventModal] = useState(false);

  useEffect(() => {
    setEventsToday([]);
    setEventsWeek([]);
    setEventsElse([]);
    if (events.length > 0) {
      events.map((e: Event) => {
        if (isToday(e.date)) {
          setEventsToday((eventsToday) => [...eventsToday, e]);
        } else if (isThisWeek(e.date)) {
          setEventsWeek((eventsWeek) => [...eventsWeek, e]);
        } else {
          setEventsElse((eventsElse) => [...eventsElse, e]);
        }
      });
      setLoadingEvents(false);
    }
  }, [events]);

  function startEditingEvent(e: any) {
    setSelectedEvent(e);
    setEditEventModal(true);
  }

  return (
    <div>
      {selectedEvent && (
        <EditEvent
          user={user}
          event={selectedEvent}
          open={editEventModal}
          setOpen={setEditEventModal}
        />
      )}
      <div className=" flex items-center justify-center mt-5">
        <h1 className="text-white text-2xl font-bold">Tus eventos de hoy</h1>
      </div>
      {loadingEvents ? (
        <div className="flex flex-col gap-2">
          <Skeleton className="w-full h-16" />
          <Skeleton className="w-full h-16" />
        </div>
      ) : (
        <>
          {eventsToday.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {eventsToday.map((e: any) => (
                  <tr
                    key={e.id}
                    className="hover:scale-105 transition-all cursor-pointer"
                    onClick={() => startEditingEvent(e)}
                  >
                    <td className="p-2">
                      {e.allday ? (
                        <div className="flex items-center justify-end">
                          <div className="bg-white p-1 rounded-lg text-black flex w-auto h-auto text-sm shadow-md">
                            Todo el día
                          </div>
                        </div>
                      ) : (
                        <>
                          {e.end !== "" ? (
                            <div className="flex items-center justify-end">
                              <div className="bg-white p-1 rounded-lg text-black flex w-auto h-auto text-sm shadow-md">
                                {e.start} - {e.end}
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-center justify-end">
                              <div className="bg-white p-1 rounded-lg text-black flex w-auto h-auto text-sm shadow-md">
                                {e.start}
                              </div>
                            </div>
                          )}
                        </>
                      )}
                    </td>
                    <td>{e.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="w-full flex items-center justify-center">
              <p className="text-lg">No tienes eventos hoy</p>
            </div>
          )}
        </>
      )}

      <div className=" flex items-center justify-center mt-5">
        <h1 className="text-white text-2xl font-bold">
          Tus eventos de esta semana
        </h1>
      </div>
      {loadingEvents ? (
        <div className="flex flex-col gap-2">
          <Skeleton className="w-full h-16" />
          <Skeleton className="w-full h-16" />
        </div>
      ) : (
        <>
          {eventsWeek.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {eventsWeek.map((e: any) => (
                  <tr
                    key={e.id}
                    className="hover:scale-105 transition-all cursor-pointer"
                    onClick={() => startEditingEvent(e)}
                  >
                    <td className="p-2">
                      <div className="flex items-center justify-end">
                        <div className="bg-white p-1 rounded-lg text-black flex w-auto h-auto text-sm shadow-md">
                          {e.date}
                        </div>
                      </div>
                    </td>
                    <td>{e.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="w-full flex items-center justify-center">
              <p className="text-lg">No tienes eventos hoy</p>
            </div>
          )}
        </>
      )}

      {loadingEvents ? (
        <Skeleton className="w-full h-32 mt-5" />
      ) : (
        <>
          {eventsElse.length > 0 && (
            <>
              <div className=" flex items-center justify-center mt-5 gap-2">
                <h1 className="text-white text-2xl font-bold">Otros eventos</h1>{" "}
                {seeOtherEvents ? (
                  <button
                    onClick={() => setSeeOtherEvents(!seeOtherEvents)}
                    className="w-5 h-1 bg-white rounded-md hover:scale-110 transition-all"
                  ></button>
                ) : (
                  <button
                    onClick={() => setSeeOtherEvents(!seeOtherEvents)}
                    className="hover:scale-110 transition-all"
                  >
                    <img
                      className="w-5 h-5"
                      src="https://www.clker.com/cliparts/L/q/T/i/P/S/add-button-white-hi.png"
                    />
                  </button>
                )}
              </div>
              {seeOtherEvents && (
                <table>
                  <thead>
                    <tr>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {eventsElse.map((e: any) => (
                      <tr
                        key={e.id}
                        className="hover:scale-105 transition-all cursor-pointer"
                        onClick={() => startEditingEvent(e)}
                      >
                        <td className="p-2">
                          <div className="flex items-center justify-end">
                            <div className="bg-white p-1 rounded-lg text-black flex w-auto h-auto text-sm shadow-md">
                              {e.date}
                            </div>
                          </div>
                        </td>
                        <td>{e.name}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}

export default EventsSideBar;
