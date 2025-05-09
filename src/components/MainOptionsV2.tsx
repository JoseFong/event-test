"use client";
import React, { useState } from "react";
import GetPassword from "./GetPassword";
import EditUser from "./EditUser";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import SideBarV2 from "./SideBarV2";

function MainOptionsV2({ user, events }: { user: any; events: any[] }) {
  const [getPasswordModalOpen, setGetPasswordModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [showSideBar, setShowSideBar] = useState(false);

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
    <div className="flex p-2 w-full items-center justify-center">
      {showSideBar && (
        <SideBarV2
          user={user}
          events={events}
          setShowSideBar={setShowSideBar}
        />
      )}
      <button
        onClick={() => setShowSideBar(true)}
        className="w-10 absolute left-3 shadow-md p-1"
      >
        <img src="https://img.icons8.com/ios11/512/FFFFFF/menu--v2.png" />
      </button>
      <div className="flex flex-row gap-2 items-center justify-center">
        <h1 className="sm:block hidden text-2xl font-bold text-white">
          Bienvenido {user.name} {user.lastname}
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
    </div>
  );
}

export default MainOptionsV2;
