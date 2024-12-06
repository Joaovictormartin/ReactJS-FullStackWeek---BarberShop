"use server";

import { endOfDay, startOfDay } from "date-fns";

import { db } from "@/app/_lib/prisma";

export const getDayBookings = async (date: Date) => {
  const booking = await db.booking.findMany({
    where: {
      date: {
        lte: endOfDay(date),
        gte: startOfDay(date),
      },
    },
  });

  return booking;
};
