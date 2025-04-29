"use client";
import { User } from "@/generated/prisma";
import {
  isEmpty,
  validMail,
  validName,
  validPassword,
} from "@/utils/validations";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

function HomePage() {
  const [users, setUsers] = useState([]);
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function showMessage() {
    toast.success("Hola!");
  }

  async function fetchUsers() {
    try {
      const res = await axios.get("/api/users");
      setUsers(res.data);
    } catch (e: any) {
      if (e.response && e.response.data && e.response.data.message) {
        toast.error(e.response.data.message);
      } else {
        toast.error(e.message);
      }
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchDeleteUser(userId: any) {
    try {
      const body = {
        userId: userId,
      };
      const res = await axios.post("/api/deleteUser", body);
      toast.success("Usuario eliminado exitosamente.");
      fetchUsers();
    } catch (e: any) {
      if (e.response && e.response.data && e.response.data.message) {
        toast.error(e.response.data.message);
      } else {
        toast.error(e.message);
      }
    }
  }

  async function registerUser() {
    try {
      if (
        isEmpty(mail) ||
        isEmpty(password) ||
        isEmpty(confirmPassword) ||
        isEmpty(name) ||
        isEmpty(lastname)
      )
        throw new Error("Complete todos los campos");

      if (!validMail(mail)) throw new Error("Ingrese un correo válido");

      if (!validName(name))
        throw new Error("Su nombre no puede contener números");

      if (!validName(lastname))
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
        lastname: lastname.trim(),
      };

      const res = await axios.post("/api/users", body);
      toast.success("Usuario registrado exitosamente");
      fetchUsers();
    } catch (e: any) {
      if (e.response && e.response.data && e.response.data.message) {
        toast.error(e.response.data.message);
      } else {
        toast.error(e.message);
      }
    }
  }

  return (
    <div>
      <button
        onClick={showMessage}
        className="bg-blue-700 text-white py-1 px-5 rounded-xl hover:bg-blue-800 active:bg-blue-900 transition-colors"
      >
        Presioname!
      </button>
      {users.map((u: User) => (
        <div key={u.id}>
          {u.id} {u.mail} {u.password} {u.name} {u.lastname}{" "}
          <button
            onClick={() => fetchDeleteUser(u.id)}
            className="text-red-500 underline"
          >
            Eliminar
          </button>
        </div>
      ))}
      <div className="flex flex-col">
        <label>Email</label>
        <input
          placeholder="Email"
          className="bg-zinc-200 py-1 px-2 rounded-md"
          value={mail}
          onChange={(e) => setMail(e.target.value)}
        />
        <label>Nombre</label>
        <input
          placeholder="Nombre"
          className="bg-zinc-200 py-1 px-2 rounded-md"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Apellido</label>
        <input
          placeholder="Apellido"
          className="bg-zinc-200 py-1 px-2 rounded-md"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
        />
        <label>Contraseña</label>
        <input
          type="password"
          placeholder="Contraseña"
          className="bg-zinc-200 py-1 px-2 rounded-md"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label>Confirmar Contraseña</label>
        <input
          type="password"
          placeholder="Confirmar Contraseña"
          className="bg-zinc-200 py-1 px-2 rounded-md"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button
          onClick={registerUser}
          className="bg-blue-700 text-white py-1 px-5 rounded-xl hover:bg-blue-800 active:bg-blue-900 transition-colors"
        >
          Registrar
        </button>
      </div>
    </div>
  );
}

export default HomePage;
//what
