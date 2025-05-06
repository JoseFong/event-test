"use client";
import { isEmpty } from "@/utils/validations";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

function Login() {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  async function login() {
    try {
      if (isEmpty(mail) || isEmpty(password))
        throw new Error("Complete todos los campos");

      const data = {
        mail: mail,
        password: password,
      };

      const res = await axios.post("/api/login", data);
      toast.success("Inicio de sesión exitoso");
      router.push("/");
    } catch (e: any) {
      if (e.response && e.response.data && e.response.data.message) {
        toast.error(e.response.data.message);
      } else {
        toast.error(e.message);
      }
    }
  }

  function goToRegister() {
    router.push("/register");
  }

  return (
    <div className="p-2">
      <h1 className="text-lg font-bold">Login</h1>
      <div className="flex flex-col gap-1">
        <label>Correo</label>
        <input
          placeholder="Correo"
          className="bg-zinc-100 rounded-md py-1 px-2"
          value={mail}
          onChange={(e) => setMail(e.target.value)}
        />
        <label>Contraseña</label>
        <input
          type="password"
          placeholder="Contraseña"
          className="bg-zinc-100 rounded-md py-1 px-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={login}
          className="bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 active:bg-blue-700 p-1"
        >
          Login
        </button>
        <button onClick={goToRegister} className="underline text-sm">
          Registrar nuevo usuario
        </button>
      </div>
    </div>
  );
}

export default Login;
