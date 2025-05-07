"use client";

import { Event, User } from "@/generated/prisma";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AllUsers from "./AllUsers";
import { Skeleton } from "./ui/skeleton";
import GetPassword from "./GetPassword";
import EditUser from "./EditUser";

function HomePage({ user }: { user: any }) {
  const router = useRouter();
  const [events, setEvents] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [getPasswordModalOpen, setGetPasswordModalOpen] = useState(false);

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

  return (
    <div className="p-2 flex flex-col items-start">
      <h1 className="text-lg font-bold">
        Bienvenido(a), {user.name} {user.lastname}
      </h1>
      <GetPassword
        open={getPasswordModalOpen}
        setOpen={setGetPasswordModalOpen}
        onSuccess={onPasswordSuccess}
      />
      <EditUser user={user} open={editModalOpen} setOpen={setEditModalOpen} />
      <button
        onClick={() => setGetPasswordModalOpen(true)}
        className="underline"
      >
        Configurar cuenta
      </button>
      <button onClick={logout} className="underline">
        Cerrar sesión
      </button>

      <h1 className="font-bold text-lg mt-3">Eventos</h1>
      {loadingEvents ? (
        <div className="flex flex-col gap-1">
          <div className="flex flex-row gap-1">
            <Skeleton className="w-6 h-6" />
            <Skeleton className="w-20 h-6" />
            <Skeleton className="w-20 h-6" />
          </div>
          <div className="flex flex-row gap-1">
            <Skeleton className="w-6 h-6" />
            <Skeleton className="w-20 h-6" />
            <Skeleton className="w-20 h-6" />
          </div>
        </div>
      ) : (
        <table className="mt-1">
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
                <td className="border-2 border-solid border-black p-1">
                  {e.id}
                </td>
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
      )}

      {user.type === "superadmin" && <AllUsers user={user} />}
    </div>
  );
}

export default HomePage;
