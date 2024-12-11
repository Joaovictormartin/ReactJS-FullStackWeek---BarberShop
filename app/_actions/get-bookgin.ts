"use server";

import { getServerSession } from "next-auth";

import { db } from "@/app/_lib/prisma";
import { authOptions } from "@/app/_lib/auth";

export const getBookgin = async () => {
  const session = await getServerSession(authOptions);

  return session?.user
    ? await db.booking.findMany({
        where: {
          userId: (session?.user as any).id,
          date: { gte: new Date() },
        },
        include: { service: true, barbershop: true },
      })
    : [];
};
