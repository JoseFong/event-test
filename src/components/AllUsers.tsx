"use client";
import { User } from "@/generated/prisma";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ConfirmDeleteUser from "./ConfirmDeleteUser";
import EditUser from "./EditUser";
import { Skeleton } from "./ui/skeleton";

function AllUsers({ user }: { user: any }) {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState<User>();
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [editModalOpen, setEditModalOpen] = useState(false);

  async function fetchAllUsers() {
    try {
      setLoadingUsers(true);
      const res = await axios.get("/api/users");
      setUsers(res.data);
      setLoadingUsers(false);
    } catch (e: any) {
      if (e.response && e.response.data && e.response.data.message) {
        toast.error(e.response.data.message);
      } else {
        toast.error(e.message);
      }
    }
  }

  useEffect(() => {
    if (user.type === "superadmin") {
      fetchAllUsers();
    }
  }, [user]);

  return (
    <div className="mt-3">
      <h1 className="font-bold text-lg">Listado de usuarios</h1>
      {loadingUsers ? (
        <div className="flex flex-col gap-1">
          <div className="flex flex-row gap-1">
            <Skeleton className="h-5 w-36" />
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-5 w-20" />
          </div>
          <div className="flex flex-row gap-1">
            <Skeleton className="h-5 w-36" />
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-5 w-20" />
          </div>
        </div>
      ) : (
        <table className="mt-1">
          <thead>
            <tr>
              <th className="border-2 border-solid border-black p-1">Correo</th>
              <th className="border-2 border-solid border-black p-1">Nombre</th>
              <th className="border-2 border-solid border-black p-1">
                Apellido
              </th>
              <th className="border-2 border-solid border-black p-1">Tipo</th>
              <th className="border-2 border-solid border-black p-1">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((u: User) => (
              <tr key={u.id}>
                <td className="border-2 border-solid border-black p-1">
                  {u.mail}
                </td>
                <td className="border-2 border-solid border-black p-1">
                  {u.name}
                </td>
                <td className="border-2 border-solid border-black p-1">
                  {u.lastname}
                </td>
                <td className="border-2 border-solid border-black p-1">
                  {u.type}
                </td>
                <td className="border-2 border-solid border-black p-1">
                  {u.id !== user.id && (
                    <ConfirmDeleteUser user={u} fetchAllUsers={fetchAllUsers} />
                  )}
                  <button className="underline mr-2">
                    <button
                      onClick={() => setEditModalOpen(true)}
                      className="underline"
                    >
                      Editar
                    </button>
                    <EditUser
                      user={u}
                      open={editModalOpen}
                      setOpen={setEditModalOpen}
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AllUsers;
