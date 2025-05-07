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
import { User } from "@/generated/prisma";
import toast from "react-hot-toast";
import {
  isEmpty,
  validMail,
  validName,
  validPassword,
} from "@/utils/validations";
import axios from "axios";

function EditUser({
  user,
  open,
  setOpen,
}: {
  user: User;
  open: any;
  setOpen: any;
}) {
  const [mail, setMail] = useState(user.mail);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState(user.name);
  const [lastname, setlastname] = useState(user.lastname);

  const initlastname = user.lastname;
  const initmail = user.mail;
  const initname = user.name;

  async function editInfo() {
    try {
      if (isEmpty(mail) || isEmpty(name) || isEmpty(lastname))
        throw new Error("Complete todos los campos.");

      if (!validName(name))
        throw new Error("Su nombre no puede contener números");
      if (!validName(lastname))
        throw new Error("Su  no puede contener números");
      if (!validMail(mail)) throw new Error("Ingrese un correo válido");

      const data = {
        name: name,
        lastname: lastname,
        mail: mail,
      };

      const res = await axios.patch("/api/users/" + user.id, data);
      toast.success(
        "Información actualizada exitosamente, refresque la página para ver los cambios"
      );
      setOpen(false);
    } catch (e: any) {
      if (e.response && e.response.data && e.response.data.message) {
        toast.error(e.response.data.message);
      } else {
        toast.error(e.message);
      }
    }
  }

  async function changePassword() {
    try {
      if (!validPassword(password))
        throw new Error(
          "Su contraseña debe de tener al menos 8 caracteres, contener una mayúscula, una minúscula y una letra"
        );

      if (password !== confirmPassword)
        throw new Error("Las contraseñas no coinciden");
      const data = {
        password: password,
      };

      const res = await axios.patch("/api/changePassword/" + user.id, data);
      toast.success("Contraseña actualizada correctamente");
      setOpen(false);
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
      <AlertDialogTrigger>
        <div />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Editar información de {user?.name} {user?.lastname}
          </AlertDialogTitle>
          <AlertDialogDescription>
            <div className="flex flex-col">
              <div className="text-black flex flex-row gap-4 h-full">
                <div className="flex flex-col gap-1">
                  <h1 className="font-bold">Editar información</h1>
                  <label>Correo</label>
                  <input
                    placeholder="Correo"
                    className="bg-zinc-200 rounded-md py-1 px-2"
                    value={mail}
                    onChange={(e) => setMail(e.target.value)}
                  />
                  <label>Nombre</label>
                  <input
                    placeholder="Nombre"
                    className="bg-zinc-200 rounded-md py-1 px-2"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <label>Apellido</label>
                  <input
                    placeholder="Apellido"
                    className="bg-zinc-200 rounded-md py-1 px-2"
                    value={lastname}
                    onChange={(e) => setlastname(e.target.value)}
                  />
                  {mail === initmail &&
                  name === initname &&
                  lastname === initlastname ? (
                    <button
                      disabled
                      className="opacity-50 mt-2 border-2 border-black border-solid py-2 px-3 rounded-xl"
                    >
                      Editar
                    </button>
                  ) : (
                    <button
                      onClick={editInfo}
                      className="mt-2 border-2 border-black border-solid py-2 px-3 rounded-xl transition-colors hover:bg-zinc-200 active:bg-zinc-300"
                    >
                      Editar
                    </button>
                  )}
                </div>
                <div className="bg-black w-0.5 h-full"></div>
                <div className="flex flex-col gap-1">
                  <h1 className="font-bold">Modificar contraseña</h1>
                  <label>Contraseña</label>
                  <input
                    type="password"
                    placeholder="Contraseña"
                    className="bg-zinc-200 rounded-md py-1 px-2"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label>Confirmar Contraseña</label>
                  <input
                    type="password"
                    placeholder="Confirmar Contraseña"
                    className="bg-zinc-200 rounded-md py-1 px-2"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  {password === "" || confirmPassword === "" ? (
                    <button
                      disabled
                      className="mt-2 border-2 border-black border-solid py-2 px-3 rounded-xl opacity-50"
                    >
                      Cambiar Contraseña
                    </button>
                  ) : (
                    <button
                      onClick={changePassword}
                      className="mt-2 border-2 border-black border-solid py-2 px-3 rounded-xl hover:bg-zinc-200 active:bg-zinc-300 transition-colors"
                    >
                      Cambiar Contraseña
                    </button>
                  )}
                </div>
              </div>
              <p className="mt-3">
                Es posible que tenga que cerrar sesión y volver a iniciar para
                ver todos los cambios
              </p>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default EditUser;
