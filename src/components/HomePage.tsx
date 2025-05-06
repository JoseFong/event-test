"use client";

import { Event } from "@/generated/prisma";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function HomePage({ user }: { user: any }) {
  const router = useRouter();
  const [events, setEvents] = useState([]);

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

  useEffect(() => {
    fetchEventsFromUser();
  }, []);

  return (
    <div className="p-2">
      <h1 className="text-lg font-bold">
        Bienvenido(a), {user.name} {user.lastname}
      </h1>
      <button onClick={logout} className="underline">
        Cerrar sesión
      </button>
      <table>
        <thead>
          <tr>
            <th className="border-2 border-solid border-black p-1">Id</th>
            <th className="border-2 border-solid border-black p-1">Evento</th>
            <th className="border-2 border-solid border-black p-1">Dia</th>
          </tr>
        </thead>
        <tbody>
          {events.map((e: Event) => (
            <tr key={e.id}>
              <td className="border-2 border-solid border-black p-1">{e.id}</td>
              <td className="border-2 border-solid border-black p-1">
                {e.name}
              </td>
              <td className="border-2 border-solid border-black p-1">
                {e.date}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default HomePage;
