"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getMonthName } from "@/utils/dateLogic";
import Calendar from "./Calendar";
import EventsSideBar from "./EventsSideBar";
import MainOptions from "./MainOptions";
import MainOptionsV2 from "./MainOptionsV2";

function HomePage({ user }: { user: any }) {
  const [events, setEvents] = useState([]);

  const [season, setSeason] = useState("sp");

  const [title, setTitle] = useState("");

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

  function getSeason() {
    const now = new Date();
    const month = now.getMonth() + 3;
    if (month >= 3 && month < 6) setSeason("sp");
    if (month >= 6 && month < 9) setSeason("su");
    if (month >= 9 && month < 12) setSeason("fa");
    if (month === 12 || month === 1 || month === 2) setSeason("wi");
  }

  useEffect(() => {
    getSeason();
    fetchEventsFromUser();
    const titleAux = getMonthName();
    setTitle(titleAux);
  }, [user]);

  return (
    <div className="min-w-screen min-h-screen flex flex-row bg-zinc-100">
      <div
        className={`${season === "sp" && "bg-springmain"} ${
          season === "su" && "bg-summermain"
        } ${season === "fa" && "bg-fallmain"} ${
          season === "wi" && "bg-wintermain"
        } bg-black w-screen fixed shadow-lg flex items-center justify-center lg:hidden`}
      >
        <MainOptionsV2 user={user} events={events} />
      </div>
      <div
        className={` ${season === "sp" && "bg-springmain"} ${
          season === "su" && "bg-summermain"
        } ${season === "fa" && "bg-fallmain"} ${
          season === "wi" && "bg-wintermain"
        } min-h-screen p-10 text-white shadow-lg w-1/3 h-screen overflow-y-auto hidden lg:block`}
      >
        <MainOptions user={user} />
        <EventsSideBar events={events} user={user} />
      </div>
      <div className="min-h-screen lg:w-2/3 w-full flex items-center justify-center flex-col">
        <h1
          className={`font-bold text-4xl mb-3 ${
            season === "sp" && "text-springsec"
          } ${season === "su" && "text-summersec"} ${
            season === "fa" && "text-fallsec"
          } ${season === "wi" && "text-wintersec"}`}
        >
          {title}
        </h1>
        <Calendar user={user} events={events} />
      </div>
    </div>
  );
}

export default HomePage;
