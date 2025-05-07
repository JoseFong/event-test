"use client";

import { Event, User } from "@/generated/prisma";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import GetPassword from "./GetPassword";
import EditUser from "./EditUser";
import AddEvent from "./AddEvent";
import { isThisMonth, isThisWeek, isToday } from "@/utils/dateLogic";
import EventInfo from "./EventInfo";
import Calendar from "./Calendar";

function HomePage({ user }: { user: any }) {
  const router = useRouter();
  const [events, setEvents] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [getPasswordModalOpen, setGetPasswordModalOpen] = useState(false);

  const [eventsToday, setEventsToday] = useState<Event[]>([]);
  const [eventsWeek, setEventsWeek] = useState<Event[]>([]);
  const [eventsMonth, setEventsMonth] = useState<Event[]>([]);
  const [eventsElse, setEventsElse] = useState<Event[]>([]);

  async function logout() {
    try {
      const res = await axios.post("/api/logout");
      router.push("/login");
    } catch (e: any) {
      if (e.response && e.response.data && e.response.data.message) {
        toast.error(e.response.data.message);
      } else {
        toast.error(e.message);
      }
    }
  }

  async function fetchEventsFromUser() {
    try {
      setLoadingEvents(true);
      const res = await axios.get("/api/events");
      setEvents(res.data);
      setLoadingEvents(false);
    } catch (e: any) {
      if (e.response && e.response.data && e.response.data.message) {
        toast.error(e.response.data.message);
      } else {
        toast.error(e.message);
      }
    }
  }

  useEffect(() => {
    fetchEventsFromUser();
  }, [user]);

  function onPasswordSuccess() {
    setGetPasswordModalOpen(false);
    setEditModalOpen(true);
  }

  useEffect(() => {
    setEventsToday([]);
    setEventsWeek([]);
    setEventsMonth([]);
    setEventsElse([]);
    if (events.length > 0) {
      events.map((e: Event) => {
        if (isToday(e.date)) {
          setEventsToday((eventsToday) => [...eventsToday, e]);
        } else if (isThisWeek(e.date)) {
          setEventsWeek((eventsWeek) => [...eventsWeek, e]);
        } else if (isThisMonth(e.date)) {
          setEventsMonth((eventsMonth) => [...eventsMonth, e]);
        } else {
          setEventsElse((eventsElse) => [...eventsElse, e]);
        }
      });
    }
  }, [events]);

  return (
    <div className="min-w-screen min-h-screen bg-zinc-800 p-8 flex flex-col gap-5">
      <div className="flex flex-row gap-2 items-center">
        <h1 className="text-3xl text-white font-bold">
          Bienvenido/a {user.name} {user.lastname}
        </h1>
        <button className="w-7" onClick={() => setGetPasswordModalOpen(true)}>
          <img
            src="https://img.icons8.com/m_rounded/512/FFFFFF/settings.png"
            className="hover:opacity-70 transition-all"
          />
        </button>
        <button className="w-7" onClick={logout}>
          <img
            src="https://static-00.iconduck.com/assets.00/logout-icon-2048x2046-yqonjwjv.png"
            className="hover:opacity-70 transition-all"
          />
        </button>
        <GetPassword
          open={getPasswordModalOpen}
          setOpen={setGetPasswordModalOpen}
          onSuccess={onPasswordSuccess}
        />
        <EditUser user={user} open={editModalOpen} setOpen={setEditModalOpen} />
      </div>
      <div className="flex flex-row gap-5">
        <div className="flex flex-col w-2/5 gap-3">
          <div>
            <AddEvent user={user} fetchEventsFromUser={fetchEventsFromUser} />
          </div>
          <div className="flex flex-col gap-3 w-full">
            <h1 className="font-bold text-xl text-white">Tus eventos de hoy</h1>
            {eventsToday.length === 0 ? (
              <div className="text-white bg-zinc-700 p-3 rounded-lg shadow-lg">
                No tienes eventos hoy
              </div>
            ) : (
              <>
                {eventsToday.map((e: any) => (
                  <EventInfo e={e} key={e.id} />
                ))}
              </>
            )}
            <h1 className="font-bold text-xl text-white">
              Tus eventos de esta semana
            </h1>
            {eventsWeek.length === 0 ? (
              <div className="text-white bg-zinc-700 p-3 rounded-lg shadow-lg">
                No tienes eventos esta semana
              </div>
            ) : (
              <>
                {eventsWeek.map((e: any) => (
                  <EventInfo e={e} key={e.id} />
                ))}
              </>
            )}
            <h1 className="font-bold text-xl text-white">
              Tus eventos de este mes
            </h1>
            {eventsMonth.length === 0 ? (
              <div className="text-white bg-zinc-700 p-3 rounded-lg shadow-lg">
                No tienes eventos este mes
              </div>
            ) : (
              <>
                {eventsMonth.map((e: any) => (
                  <EventInfo e={e} key={e.id} />
                ))}
              </>
            )}
            <h1 className="font-bold text-xl text-white">Otros eventos</h1>
            {eventsElse.length === 0 ? (
              <div className="text-white bg-zinc-700 p-3 rounded-lg shadow-lg">
                No tienes otros eventos
              </div>
            ) : (
              <>
                {eventsElse.map((e: any) => (
                  <EventInfo e={e} key={e.id} />
                ))}
              </>
            )}
          </div>
        </div>
        <Calendar events={events} />
      </div>
    </div>
  );
}

export default HomePage;
