"use server";

import { endOfDay, startOfDay } from "date-fns";

import { db } from "@/_lib/prisma";

export const getDayBookings = async (barbershopId: string, date: Date) => {
  const booking = await db.booking.findMany({
    where: {
      barbershopId,
      date: {
        lte: endOfDay(date),
        gte: startOfDay(date),
      },
    },
  });

  return booking;
};
