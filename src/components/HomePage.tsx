"use client";

import { Event, User } from "@/generated/prisma";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import GetPassword from "./GetPassword";
import EditUser from "./EditUser";
import AddEvent from "./AddEvent";
import {
  getMonthName,
  isThisMonth,
  isThisWeek,
  isToday,
} from "@/utils/dateLogic";
import Calendar from "./Calendar";
import { Skeleton } from "./ui/skeleton";
import { getSeasonalColors } from "@/utils/colors";

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
      const res = await axios.get("/api/events");
      setEvents(res.data);
    } catch (e: any) {
      if (e.response && e.response.data && e.response.data.message) {
        toast.error(e.response.data.message);
      } else {
        toast.error(e.message);
      }
    }
  }

  function onPasswordSuccess() {
    setGetPasswordModalOpen(false);
    setEditModalOpen(true);
  }

  useEffect(() => {
    setLoadingEvents(true);
    fetchEventsFromUser();
  }, [user]);

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
      setLoadingEvents(false);
    }
  }, [events]);

  const { mcb, mct, scb, sct } = getSeasonalColors();
  const title = getMonthName();
  console.log(mcb + " " + sct);

  return (
    <div className="min-w-screen min-h-screen flex flex-row">
      <div className={`${mcb} min-h-screen p-10 text-white shadow-lg w-1/3`}>
        <div className="flex flex-row gap-3">
          <h1 className="font-bold text-4xl">
            Bienvenido(a) {user.name} {user.lastname}
          </h1>
          <button
            className="w-10"
            onClick={() => setGetPasswordModalOpen(true)}
          >
            <img
              src="https://img.icons8.com/m_rounded/512/FFFFFF/settings.png"
              className="hover:opacity-70 transition-all hover:scale-110"
            />
          </button>
          <GetPassword
            open={getPasswordModalOpen}
            setOpen={setGetPasswordModalOpen}
            onSuccess={onPasswordSuccess}
          />
          <EditUser
            user={user}
            open={editModalOpen}
            setOpen={setEditModalOpen}
          />
          <button className="w-10" onClick={logout}>
            <img
              src="https://static-00.iconduck.com/assets.00/logout-icon-2048x2046-yqonjwjv.png"
              className="hover:opacity-70 transition-all hover:scale-110"
            />
          </button>
        </div>
        <div className="h-2 w-full bg-white rounded-lg mt-2"></div>
        <div className="flex items-center justify-center mt-2">
          <AddEvent user={user} fetchEventsFromUser={fetchEventsFromUser} />
        </div>
        <div className=" flex items-center justify-center mt-5">
          <h1 className="text-white text-2xl font-bold">Tus eventos de hoy</h1>
        </div>
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
        <div className=" flex items-center justify-center mt-5">
          <h1 className="text-white text-2xl font-bold">
            Tus eventos de esta semana
          </h1>
        </div>
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
      </div>
      <div className="min-h-screen w-2/3 flex items-center justify-center flex-col">
        <h1 className={`${sct} font-bold text-4xl mb-3`}>{title}</h1>
        <Calendar events={events} />
      </div>
    </div>
  );
}

export default HomePage;
