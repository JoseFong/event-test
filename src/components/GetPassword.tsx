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
import { Button } from "./ui/button";
import toast from "react-hot-toast";
import axios from "axios";

function GetPassword({
  open,
  setOpen,
  onSuccess,
}: {
  open: any;
  setOpen: any;
  onSuccess: () => void;
}) {
  const [password, setPassword] = useState("");

  function closeModal() {
    setOpen(false);
  }

  useEffect(() => {
    setPassword("");
  }, [setOpen, open]);

  async function accept() {
    try {
      const body = {
        password: password,
      };
      const res = await axios.post("/api/checkPassword", body);
      onSuccess();
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
        <div />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Para continuar ingrese su contraseña
          </AlertDialogTitle>
          <AlertDialogDescription>
            <input
              className="bg-zinc-100 text-black py-1 px-2 rounded-lg text-md w-full"
              placeholder="Contraseña"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button onClick={closeModal} variant={"outline"}>
            Cancelar
          </Button>
          <Button onClick={accept}>Aceptar</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default GetPassword;
