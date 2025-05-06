"use client";
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

function Register() {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [confirmPassword, setConfirmedPassword] = useState("");

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
    <div className="p-2">
      <h1 className="text-lg font-bold">Registrarse</h1>
      <div className="flex flex-col gap-1">
        <label>Correo</label>
        <input
          placeholder="Correo"
          className="bg-zinc-100 rounded-md py-1 px-2"
          value={mail}
          onChange={(e) => setMail(e.target.value)}
        />
        <label>Nombre</label>
        <input
          placeholder="Nombre"
          className="bg-zinc-100 rounded-md py-1 px-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Apellido</label>
        <input
          placeholder="Apellido"
          className="bg-zinc-100 rounded-md py-1 px-2"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <label>Contraseña</label>
        <input
          type="password"
          placeholder="Contraseña"
          className="bg-zinc-100 rounded-md py-1 px-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label>Confirmar Contraseña</label>
        <input
          type="password"
          placeholder="Confirmar contraseña"
          className="bg-zinc-100 rounded-md py-1 px-2"
          value={confirmPassword}
          onChange={(e) => setConfirmedPassword(e.target.value)}
        />
        <button
          onClick={register}
          className="bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 active:bg-blue-700 p-1"
        >
          Registrarse
        </button>
      </div>
    </div>
  );
}

export default Register;
