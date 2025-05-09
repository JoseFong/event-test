import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
import jwt from "jsonwebtoken";
import AdminToolsComp from "@/components/AdminTools";

async function AdminTools() {
  let decoded: any;
  try {
    const cookieStore = await cookies();
    const cookie = cookieStore.get("userId");
    if (!cookie) {
      redirect("/login");
    }
    decoded = jwt.verify(cookie.value, process.env.JWT_SECRET!);
    if (decoded.type !== "superadmin") {
      redirect("/login");
    }
  } catch (e: any) {
    redirect("/login");
  }

  return (
    <div className="flex flex-col gap-2">
      AdminTools
      <AdminToolsComp user={decoded} />
    </div>
  );
}

export default AdminTools;
