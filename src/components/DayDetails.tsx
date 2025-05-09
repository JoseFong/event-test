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
import ConfirmDeleteEvent from "./ConfirmDeleteEvent";
import EditEvent from "./EditEvent";

function DayDetails({
  user,
  events,
  open,
  setOpen,
}: {
  user: any;
  events: any[];
  open: any;
  setOpen: any;
}) {
  const [selectedEvent, setSelectedEvent] = useState();
  const [editEventModal, setEditEventModal] = useState(false);
  const [deleteEventModal, setDeleteEventModal] = useState(false);

  function editEvent(e: any) {
    setSelectedEvent(e);
    setEditEventModal(true);
  }

  function deleteEvent(e: any) {
    setSelectedEvent(e);
    setDeleteEventModal(true);
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <div />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Eventos en el día</AlertDialogTitle>
          <AlertDialogDescription className="text-black">
            {selectedEvent && (
              <>
                {" "}
                <ConfirmDeleteEvent
                  event={selectedEvent}
                  open={deleteEventModal}
                  setOpen={setDeleteEventModal}
                />
                <EditEvent
                  user={user}
                  event={selectedEvent}
                  open={editEventModal}
                  setOpen={setEditEventModal}
                />
              </>
            )}
            <table className="text-lg">
              <thead>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </thead>
              <tbody>
                {events.map((e: Event) => (
                  <tr key={e.id}>
                    <td className="p-1 border-r-2 border-black">{e.name}</td>
                    <td className="p-1 border-r-2 border-black">
                      {e.allday === 1 ? (
                        <>Todo el día</>
                      ) : (
                        <>
                          {e.end !== "" ? (
                            <>
                              {e.start} - {e.end}
                            </>
                          ) : (
                            <>{e.start}</>
                          )}
                        </>
                      )}
                    </td>
                    <td className="p-1 gap-1 flex">
                      <button
                        onClick={() => editEvent(e)}
                        className="p-1 bg-zinc-400 hover:bg-zinc-500 w-10 h-10 rounded-lg"
                      >
                        <img src="https://static-00.iconduck.com/assets.00/cog-settings-icon-2048x1619-0lz5tnft.png" />
                      </button>
                      <button
                        onClick={() => deleteEvent(e)}
                        className="p-1 bg-red-500 hover:bg-red-600 w-10 h-10 rounded-lg"
                      >
                        <img src="https://img.icons8.com/ios11/512/FFFFFF/delete.png" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cerrar</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DayDetails;
