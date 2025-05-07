"use client";
import { Event } from "@/generated/prisma";
import React from "react";

function EventInfo({ e }: { e: Event }) {
  return (
    <div className="text-white bg-zinc-700 p-3 rounded-lg shadow-lg">
      {e.name} | {e.date}
    </div>
  );
}

export default EventInfo;
