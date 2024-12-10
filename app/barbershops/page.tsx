import { db } from "@/app/_lib/prisma";
import { redirect } from "next/navigation";

import Header from "@/app/_components/header";
import Search from "@/app/(home)/_components/search";
import BarberShopItem from "@/app/(home)/_components/barbershop-item";

interface BarberShopsPageProps {
  searchParams: { search?: string };
}

const BarberShopsPage = async ({ searchParams }: BarberShopsPageProps) => {
  if (!searchParams.search) redirect("/");

  const barbershops = await db.barbershop.findMany({
    where: {
      name: {
        contains: searchParams.search,
        mode: "insensitive",
      },
    },
  });

  return (
    <>
      <Header />

      <div className="px-5 py-6">
        <Search defaultValues={{ search: searchParams.search }} />

        <h1 className="mt-5 text-xs font-bold uppercase text-gray-400">
          Resultados para "{searchParams.search}"
        </h1>

        <div className="mt-3 grid grid-cols-2 gap-4">
          {barbershops.map((barbershop) => (
            <div key={barbershop.id} className="w-full">
              <BarberShopItem barbershop={barbershop} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BarberShopsPage;
