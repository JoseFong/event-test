"use client";
import { Button } from "@/components/ui/button";
import {
  isEmpty,
  validMail,
  validName,
  validPassword,
} from "@/utils/validations";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Image from "next/image";
import closedEye from "@/imgs/closed-eye.png";
import openEye from "@/imgs/open-eye.png";

function Register() {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [confirmPassword, setConfirmedPassword] = useState("");

  const [showingPassword, setShowingPassword] = useState(false);

  const router = useRouter();

  async function register() {
    try {
      if (
        isEmpty(mail) ||
        isEmpty(password) ||
        isEmpty(confirmPassword) ||
        isEmpty(name) ||
        isEmpty(lastName)
      )
        throw new Error("Complete todos los campos");

      if (!validMail(mail)) throw new Error("Ingrese un correo válido");

      if (!validName(name))
        throw new Error("Su nombre no puede contener números");

      if (!validName(lastName))
        throw new Error("Su apellido no puede contener números");

      if (!validPassword(password))
        throw new Error(
          "Su contraseña deberá contener al menos 8 caracteres, una mayúscula y un número"
        );

      if (password !== confirmPassword)
        throw new Error("Sus contraseñas no coinciden");

      const body = {
        mail: mail.trim(),
        password: password.trim(),
        name: name.trim(),
        lastname: lastName.trim(),
      };

      const res = await axios.post("/api/users", body);
      toast.success("Usuario registrado exitosamente");
      router.push("/");
    } catch (e: any) {
      if (e.response && e.response.data && e.response.data.message) {
        toast.error(e.response.data.message);
      } else {
        toast.error(e.message);
      }
    }
  }

  return (
    <div className="min-w-screen min-h-screen flex items-center justify-center bg-zinc-200">
      <div className="bg-wintermain p-8 text-white shadow-xl rounded-xl flex flex-col gap-2">
        <h1 className="text-white text-xl font-bold">Registar Usuario</h1>
        <div className="flex flex-col gap-1">
          <label>Correo</label>
          <input
            className="bg-zinc-100 py-1 px-2 rounded-lg text-black"
            placeholder="Correo"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
          />
          <label>Nombre</label>
          <input
            className="bg-zinc-100 py-1 px-2 rounded-lg text-black"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label>Apellido</label>
          <input
            className="bg-zinc-100 py-1 px-2 rounded-lg text-black"
            placeholder="Apellido"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <div className="flex flex-row gap-2 items-center mt-1">
            <label>Contraseña</label>
            {showingPassword ? (
              <Image
                src={closedEye}
                alt="Mostrar Contraseña"
                className="w-6 h-6 cursor-pointer"
                onClick={() => setShowingPassword(!showingPassword)}
              />
            ) : (
              <Image
                src={openEye}
                alt="Ocultar Contraseña"
                className="w-6 h-6 cursor-pointer"
                onClick={() => setShowingPassword(!showingPassword)}
              />
            )}
          </div>
          {showingPassword ? (
            <input
              className="bg-zinc-100 py-1 px-2 rounded-lg text-black"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          ) : (
            <input
              type="password"
              className="bg-zinc-100 py-1 px-2 rounded-lg text-black"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          )}

          <label>Confirmar Contraseña</label>
          {showingPassword ? (
            <input
              className="bg-zinc-100 py-1 px-2 rounded-lg text-black"
              placeholder="Confirmar Contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmedPassword(e.target.value)}
            />
          ) : (
            <input
              type="password"
              className="bg-zinc-100 py-1 px-2 rounded-lg text-black"
              placeholder="Confirmar Contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmedPassword(e.target.value)}
            />
          )}
        </div>
        <Button onClick={register} className="mt-2" variant={"secondary"}>
          Registrar
        </Button>
      </div>
    </div>
  );
}

export default Register;
