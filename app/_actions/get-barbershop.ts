"use server";

import { db } from "@/app/_lib/prisma";

const getBarbershop = async () => {
  return db.barbershop.findMany();
};

const getBarbershopOrderById = async (type: "asc" | "desc") => {
  return db.barbershop.findMany({ orderBy: { id: type } });
};

export { getBarbershop, getBarbershopOrderById };
