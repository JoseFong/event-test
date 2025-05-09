"use client";
import { User } from "@/generated/prisma";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ConfirmDeleteUser from "./ConfirmDeleteUser";
import EditUser from "./EditUser";

function AdminToolsComp({ user }: { user: any }) {
  const [users, setUsers] = useState([]);
  const [editUserModal, setEditUserModal] = useState(false);

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

  return (
    <table className="m-3">
      <thead>
        <tr>
          <th className="border-2 border-black p-1">Id</th>
          <th className="border-2 border-black p-1">Nomre</th>
          <th className="border-2 border-black p-1">Apellido</th>
          <th className="border-2 border-black p-1">Correo</th>
          <th className="border-2 border-black p-1">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {users.map((u: User) => (
          <tr key={u.id}>
            <td className="border-2 border-black p-1">{u.id}</td>
            <td className="border-2 border-black p-1">{u.name}</td>
            <td className="border-2 border-black p-1">{u.lastname}</td>
            <td className="border-2 border-black p-1">{u.mail}</td>
            <td className="border-2 border-black p-1">
              {user.id !== u.id && (
                <ConfirmDeleteUser user={u} fetchAllUsers={fetchUsers} />
              )}

              <button
                onClick={() => setEditUserModal(true)}
                className="underline"
              >
                Editar
              </button>
              <EditUser
                user={u}
                open={editUserModal}
                setOpen={setEditUserModal}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default AdminToolsComp;
