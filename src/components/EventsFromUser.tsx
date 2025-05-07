"use client";
import React, { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import toast from "react-hot-toast";
import axios from "axios";
import { Event } from "@/generated/prisma";

function EventsFromUser({ user }: { user: any }) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await axios.get("/api/eventsFromUser/" + user.id);
        setEvents(res.data);
      } catch (e: any) {
        if (e.response && e.response.data && e.response.data.message) {
          toast.error(e.response.data.message);
        } else {
          toast.error(e.message);
        }
      }
    }

    fetchEvents();
  }, [user]);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="underline">Ver eventos</button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Registrar Evento</AlertDialogTitle>
          <AlertDialogDescription className="text-black flex flex-col gap-1">
            <table className="mt-1">
              <thead>
                <tr>
                  <th className="border-2 border-solid border-black p-1">Id</th>
                  <th className="border-2 border-solid border-black p-1">
                    Evento
                  </th>
                  <th className="border-2 border-solid border-black p-1">
                    Dia
                  </th>
                  <th className="border-2 border-solid border-black p-1">
                    Duracion
                  </th>
                </tr>
              </thead>
              <tbody>
                {events.map((e: Event) => (
                  <tr key={e.id}>
                    <td className="border-2 border-solid border-black p-1">
                      {e.id}
                    </td>
                    <td className="border-2 border-solid border-black p-1">
                      {e.name}
                    </td>
                    <td className="border-2 border-solid border-black p-1">
                      {e.date}
                    </td>
                    <td className="border-2 border-solid border-black p-1">
                      {e.allday === 1 ? (
                        <>Todo el día</>
                      ) : (
                        <>
                          {e.end === "" ? (
                            <>{e.start}</>
                          ) : (
                            <>
                              {e.start} - {e.end}
                            </>
                          )}
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cerrar</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default EventsFromUser;
