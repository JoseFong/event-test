import React from "react";
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
import ConfirmDeleteEvent from "./ConfirmDeleteEvent";
import EditEvent from "./EditEvent";

function DayDetails({
  events,
  open,
  setOpen,
}: {
  events: any[];
  open: any;
  setOpen: any;
}) {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <div />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Eventos en el día</AlertDialogTitle>
          <AlertDialogDescription className="text-black">
            aqui se mostrarían los eventos del día
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DayDetails;
