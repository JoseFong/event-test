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
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { isEmpty, validTimes } from "@/utils/validations";
import axios from "axios";
import { Event } from "@/generated/prisma";

function EditEvent({
  user,
  event,
  open,
  setOpen,
}: {
  user: any;
  event: Event;
  open: any;
  setOpen: any;
}) {
  const [name, setName] = useState(event.name);
  const [date, setDate] = useState(event.date);
  const [allDay, setAllDay] = useState(event.allday);
  const [start, setStart] = useState("" + event.start);
  const [end, setEnd] = useState("" + event.end);

  const initname = event.name;
  const initdate = event.date;
  const initallday = event.allday;
  const initstart = "" + event.start;
  const initend = "" + event.end;

  async function edit() {
    try {
      if (isEmpty(name) || isEmpty(date))
        throw new Error("Complete todos los campos");

      if (allDay === 0) {
        if (isEmpty(start)) throw new Error("Ingrese una hora de inicio");
        if (!isEmpty(end)) {
          if (!validTimes(start, end))
            throw new Error("Ingrese horas válidas para el evento");
        }
      }

      let body;
      if (allDay === 0) {
        body = {
          name: name,
          date: date,
          allDay: 0,
          start: start,
          end: end,
        };
      } else {
        body = {
          name: name,
          date: date,
          allDay: 1,
          start: "",
          end: "",
        };
      }

      const res = await axios.patch("/api/events/" + event.id, body);
      toast.success("Evento registrado exitosamente");
      window.location.reload();
      setOpen(false);
    } catch (e: any) {
      if (e.response && e.response.data && e.response.data.message) {
        toast.error(e.response.data.message);
      } else {
        toast.error(e.message);
      }
    }
  }

  function toggleAllDay() {
    setAllDay(0);
    if (allDay === 0) setAllDay(1);
  }

  useEffect(() => {
    setName(event.name);
    setDate(event.date);
    setAllDay(event.allday);
    setStart("" + event.start);
    setEnd("" + event.end);
  }, [open]);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{event.name}</AlertDialogTitle>
          <AlertDialogDescription className="text-black flex flex-col gap-1">
            <label>Nombre</label>
            <input
              placeholder="Nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-zinc-100 py-1 px-2 rounded-md"
            />
            <label>Fecha</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="bg-zinc-100 py-1 px-2 rounded-md"
            />
            <div className="flex flex-row gap-2 items-center">
              <label>¿El evento dura todo el día?</label>
              {allDay === 0 ? (
                <button
                  onClick={toggleAllDay}
                  className="w-5 h-5 rounded-full border-2 border-black hover:bg-zinc-100 active:bg-zinc-200"
                ></button>
              ) : (
                <button
                  onClick={toggleAllDay}
                  className="w-5 h-5 rounded-full border-2 border-black bg-pink-600 hover:bg-pink-700 active:bg-pink-800"
                ></button>
              )}
            </div>
            {allDay === 0 && (
              <>
                <label>Inicio</label>
                <input
                  type="time"
                  className="bg-zinc-100 py-1 px-2 rounded-md"
                  value={start}
                  onChange={(e) => setStart(e.target.value)}
                />
                <label>
                  Fin<span className="text-xs"> (Opcional)</span>
                </label>
                <input
                  type="time"
                  className="bg-zinc-100 py-1 px-2 rounded-md"
                  value={end}
                  onChange={(e) => setEnd(e.target.value)}
                />
              </>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cerrar
          </Button>
          {initname === name &&
          initallday === allDay &&
          initdate === date &&
          initstart === start &&
          initend === end ? (
            <Button disabled onClick={edit}>
              Editar
            </Button>
          ) : (
            <Button onClick={edit}>Editar</Button>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default EditEvent;
