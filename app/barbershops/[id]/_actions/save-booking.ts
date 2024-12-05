"use server";

import { db } from "@/app/_lib/prisma";

interface SaveBookingProps {
  barbershopId: string;
  serviceId: string;
  userId: string;
  date: Date;
}

export const saveBooking = async (params: SaveBookingProps) => {
  await db.booking.create({
    data: {
      date: params.date,
      userId: params.userId,
      serviceId: params.serviceId,
      barbershopId: params.barbershopId,
    },
  });
};
