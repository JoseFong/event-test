"use client";
import { Button } from "@/components/ui/button";
import { isEmpty } from "@/utils/validations";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Image from "next/image";
import openEye from "@/imgs/open-eye.png";
import closeEye from "@/imgs/closed-eye.png";

function Login() {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

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
    <div className="min-w-screen min-h-screen flex items-center justify-center bg-zinc-200">
      <div className="bg-wintermain p-8 text-white shadow-xl rounded-xl flex flex-col gap-2">
        <h1 className="text-white text-xl font-bold">Iniciar Sesión</h1>
        <div className="flex flex-col gap-1">
          <label>Correo</label>
          <input
            className="bg-zinc-100 py-1 px-2 rounded-lg text-black"
            placeholder="Correo"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
          />
          <div className="flex flex-row gap-2 items-center mt-2">
            <label>Contraseña</label>
            {showPassword ? (
              <Image
                src={closeEye}
                alt={"Ocultar contraseña"}
                className="cursor-pointer w-6 h-6"
                onClick={() => setShowPassword(!showPassword)}
              />
            ) : (
              <Image
                src={openEye}
                alt={"Mostrar contraseña"}
                className="cursor-pointer w-6 h-6"
                onClick={() => setShowPassword(!showPassword)}
              />
            )}
          </div>
          {showPassword ? (
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
        </div>
        <Button onClick={login} className="mt-2" variant={"secondary"}>
          Iniciar sesión
        </Button>
        <Button onClick={goToRegister} className="text-white" variant={"link"}>
          Registrar usuario
        </Button>
      </div>
    </div>
  );
}

export default Login;
