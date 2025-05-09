import React, { useEffect, useState } from "react";
import AddEvent from "./AddEvent";
import EventsSideBar from "./EventsSideBar";

function SideBarV2({
  user,
  events,
  setShowSideBar,
}: {
  user: any;
  events: any[];
  setShowSideBar: any;
}) {
  const [season, setSeason] = useState("");
  const [today, setToday] = useState("");
  const [slideIn, setSlideIn] = useState(false);

  function getSeason() {
    const now = new Date();
    const month = now.getMonth() + 3;
    if (month >= 3 && month < 6) setSeason("sp");
    if (month >= 6 && month < 9) setSeason("su");
    if (month >= 9 && month < 12) setSeason("fa");
    if (month === 12 || month === 1 || month === 2) setSeason("wi");
  }

  function getToday() {
    let dia = "";
    const now = new Date();
    const day = now.getDay();
    if (day === 0) dia = "Domingo";
    if (day === 1) dia = "Lunes";
    if (day === 2) dia = "Martes";
    if (day === 3) dia = "Miércoles";
    if (day === 4) dia = "Jueves";
    if (day === 5) dia = "Viernes";
    if (day === 6) dia = "Sábado";
    setToday(dia + " " + now.getDate());
  }

  useEffect(() => {
    getSeason();
    getToday();
    setTimeout(() => setSlideIn(true), 10); // entrada suave
  }, []);

  const handleClose = () => {
    setSlideIn(false); // animación de salida
    setTimeout(() => {
      setShowSideBar(false); // desmontar después de la transición
    }, 300); // mismo tiempo que la duración de transición
  };

  return (
    <div className="w-screen h-screen absolute inset-0 z-10 text-white">
      <div
        className="bg-black w-full h-full z-10 opacity-50"
        onClick={handleClose}
      ></div>
      <div
        className={`overflow-y-auto ${season === "sp" && "bg-springmain"} ${
          season === "su" && "bg-summermain"
        } ${season === "fa" && "bg-fallmain"} ${
          season === "wi" && "bg-wintermain"
        } z-20 absolute top-0 left-0 h-screen shadow-xl p-5 flex flex-col gap-5 items-center transition-all duration-300 ease-in-out ${
          slideIn ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-row gap-3 items-center justify-center">
          <h1 className="text-3xl font-bold">{today}</h1>
          <button
            className="absolute top-2 right-4 font-bold text-2xl"
            onClick={handleClose}
          >
            X
          </button>
        </div>
        <AddEvent user={user} />
        <EventsSideBar events={events} user={user} />
      </div>
    </div>
  );
}

export default SideBarV2;
