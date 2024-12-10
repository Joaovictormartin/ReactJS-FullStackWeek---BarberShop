import { db } from "@/app/_lib/prisma";
import Header from "@/app/_components/header";
import BarberShopItem from "../(home)/_components/barbershop-item";

interface BarberShopsPageProps {
  searchParams: { search?: string };
}

const BarberShopsPage = async ({ searchParams }: BarberShopsPageProps) => {
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
        <h1 className="text-xs font-bold uppercase text-gray-400">
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
