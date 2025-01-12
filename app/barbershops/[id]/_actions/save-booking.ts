"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/_lib/prisma";

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

  revalidatePath("/home");
  revalidatePath("/bookings");
};
