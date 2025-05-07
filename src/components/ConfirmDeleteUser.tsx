"use client";
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
import toast from "react-hot-toast";
import axios from "axios";

function ConfirmDeleteUser({
  user,
  fetchAllUsers,
}: {
  user: any;
  fetchAllUsers: () => void;
}) {
  async function deleteUser() {
    try {
      const res = await axios.delete("/api/users/" + user.id);
      fetchAllUsers();
    } catch (e: any) {
      if (e.response && e.response.data && e.response.data.message) {
        toast.error(e.response.data.message);
      } else {
        toast.error(e.message);
      }
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger className="underline text-red-500 mr-1">
        Eliminar
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            ¿Está seguro que quiere eliminar al usuario {user?.name}{" "}
            {user?.lastname}?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-black">
            Esta acción es permanente, no habrá forma de recuperar la
            información.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={deleteUser}>Continuar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default ConfirmDeleteUser;
