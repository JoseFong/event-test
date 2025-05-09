import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
import jwt from "jsonwebtoken";
import EventsFromUser from "@/components/EventsFromUser";

async function AdminTools() {
  try {
    const cookieStore = await cookies();
    const cookie = cookieStore.get("userId");
    if (!cookie) redirect("/login");
    const decoded: any = jwt.verify(cookie.value, process.env.JWT_SECRET!);
    if (decoded.type !== "superadmin") redirect("/login");
  } catch (e: any) {
    redirect("/login");
  }

  return <EventsFromUser />;
}

export default AdminTools;
