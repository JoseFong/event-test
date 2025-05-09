"use client";
import { Event } from "@/generated/prisma";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ConfirmDeleteEvent from "./ConfirmDeleteEvent";
import EditEvent from "./EditEvent";

function EventsFromUser() {
  const [events, setEvents] = useState([]);
  const [userId, setUserId] = useState("");
  const [editEventModal, setEditEventModal] = useState(false);
  const [deleteEventModal, setDeleteEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>();

  async function fetchEventsFromUser(id: string) {
    try {
      const res = await axios.get("/api/eventsFromUser/" + id);
      setEvents(res.data);
    } catch (e: any) {
      alert(e.message);
    }
  }

  function deleteEvent(e: any) {
    setSelectedEvent(e);
    setDeleteEventModal(true);
  }

  function editEvent(e: any) {
    setSelectedEvent(e);
    setEditEventModal(true);
  }

  useEffect(() => {
    const str = window.location.href;
    const id: any = str.split("/").pop();
    setUserId(id);
    fetchEventsFromUser(id);
  }, []);

  return (
    <div className="flex flex-col p-2 gap-2">
      {selectedEvent && (
        <ConfirmDeleteEvent
          event={selectedEvent}
          open={deleteEventModal}
          setOpen={setDeleteEventModal}
        />
      )}
      <p>EventsFromUser {userId}</p>
      <table>
        <thead>
          <tr>
            <th className="p-1 border-2 border-black">Id</th>
            <th className="p-1 border-2 border-black">Name</th>
            <th className="p-1 border-2 border-black">Date</th>
            <th className="p-1 border-2 border-black">AllDay</th>
            <th className="p-1 border-2 border-black">Start</th>
            <th className="p-1 border-2 border-black">End</th>
            <th className="p-1 border-2 border-black">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {events.map((e: Event) => (
            <tr key={e.id}>
              <td className="p-1 border-2 border-black">{e.id}</td>
              <td className="p-1 border-2 border-black">{e.name}</td>
              <td className="p-1 border-2 border-black">{e.date}</td>
              <td className="p-1 border-2 border-black">{e.allday}</td>
              <td className="p-1 border-2 border-black">{e.start}</td>
              <td className="p-1 border-2 border-black">{e.end}</td>
              <td className="p-1 border-2 border-black">
                <button className="underline" onClick={() => deleteEvent(e)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EventsFromUser;
