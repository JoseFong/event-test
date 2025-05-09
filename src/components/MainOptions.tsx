"use client";
import React, { useState } from "react";
import EditUser from "./EditUser";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import GetPassword from "./GetPassword";
import AddEvent from "./AddEvent";

function MainOptions({ user }: { user: any }) {
  const [getPasswordModalOpen, setGetPasswordModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const router = useRouter();

  function onPasswordSuccess() {
    setGetPasswordModalOpen(false);
    setEditModalOpen(true);
  }

  async function logout() {
    try {
      const res = await axios.post("/api/logout");
      router.push("/login");
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
      <div className="flex flex-row gap-3">
        <h1 className="font-bold text-4xl">
          Bienvenido(a) {user.name} {user.lastname}
        </h1>
        <button className="w-10" onClick={() => setGetPasswordModalOpen(true)}>
          <img
            src="https://img.icons8.com/m_rounded/512/FFFFFF/settings.png"
            className="hover:opacity-70 transition-all hover:scale-110"
          />
        </button>
        <GetPassword
          open={getPasswordModalOpen}
          setOpen={setGetPasswordModalOpen}
          onSuccess={onPasswordSuccess}
        />
        <EditUser user={user} open={editModalOpen} setOpen={setEditModalOpen} />
        <button className="w-10" onClick={logout}>
          <img
            src="https://static-00.iconduck.com/assets.00/logout-icon-2048x2046-yqonjwjv.png"
            className="hover:opacity-70 transition-all hover:scale-110"
          />
        </button>
      </div>
      <div className="h-2 w-full bg-white rounded-lg mt-3 mb-1"></div>
      <div className="flex items-center justify-center mt-2">
        <AddEvent user={user} />
      </div>
    </div>
  );
}

export default MainOptions;
