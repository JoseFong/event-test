"use client";
import React, { useState } from "react";
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
import { Event } from "@/generated/prisma";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

function ConfirmDeleteEvent({ event }: { event: Event }) {
  const [open, setOpen] = useState(false);

  const router = useRouter();

  async function deleteEvent() {
    try {
      const res = await axios.delete("/api/events/" + event.id);
      toast.success("Evento eliminado exitosamente");
      window.location.reload();
    } catch (e: any) {
      if (e.response && e.response.data && e.response.data.message) {
        toast.error(e.response.data.message);
      } else {
        toast.error(e.message);
      }
    }
  }
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <button className="underline">Eliminar</button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            ¿Está seguro que quiere eliminar el evento {event.name}?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-black">
            Esta acción es permanente y no habrá forma de recuperar la
            información
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <Button onClick={deleteEvent}>Aceptar</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default ConfirmDeleteEvent;
