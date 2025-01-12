import Image from "next/image";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { getServerSession } from "next-auth";

import {
  getBarbershop,
  getBarbershopOrderById,
} from "@/_actions/get-barbershop";
import Header from "../_components/header";
import { authOptions } from "@/_lib/auth";
import Search from "@/(home)/_components/search";
import BookingItem from "@/_components/booking-item";
import BarberShopItem from "@/(home)/_components/barbershop-item";
import { getConfirmedBookings } from "@/_actions/get-confirmed-bookings";

export default async function Home() {
  const session = await getServerSession(authOptions);

  const [barbershops, confirmedBookings, recommendedBarbershops] =
    await Promise.all([
      getBarbershop(),
      getConfirmedBookings(),
      getBarbershopOrderById("asc"),
    ]);

  return (
    <div>
      <Header />

      <div className="px-5 pt-5">
        <h2 className="text-xl font-bold capitalize">
          {session?.user && `Olá, ${session?.user.name?.split(" ")[0]}`}
        </h2>
        <p className="text-sm capitalize">
          {format(new Date(), "EEEE',' dd 'de' MMMM", { locale: ptBR })}
        </p>
      </div>

      <div className="mt-6 px-5">
        <Search />

        <div className="relative mt-6 h-[150px] w-full px-5">
          <Image
            fill
            src="/BannerHome.png"
            className="rounded-xl object-cover"
            alt="Agende nos melhores com FSW Barber"
          />
        </div>
      </div>

      <div className="mt-6">
        {confirmedBookings.length > 0 && (
          <>
            <h2 className="mb-3 px-5 text-xs font-bold uppercase text-gray-400">
              Agendamentos
            </h2>

            <div className="flex gap-3 overflow-x-auto px-5 [&::-webkit-scrollbar]:hidden">
              {confirmedBookings.map((booking) => (
                <BookingItem
                  key={booking.id}
                  booking={JSON.parse(JSON.stringify(booking))}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="mt-6">
        <h2 className="mb-3 px-5 text-xs font-bold uppercase text-gray-400">
          Recomendados
        </h2>

        <div className="flex gap-4 overflow-x-auto px-5 [&::-webkit-scrollbar]:hidden">
          {recommendedBarbershops.map((barbershop) => (
            <div key={barbershop.id} className="min-w-[167px] max-w-[167px]">
              <BarberShopItem barbershop={barbershop} />
            </div>
          ))}
        </div>
      </div>

      <div className="mb-[4.5rem] mt-6">
        <h2 className="mb-3 px-5 text-xs font-bold uppercase text-gray-400">
          Populares
        </h2>

        <div className="flex gap-4 overflow-x-auto px-5 [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop) => (
            <div key={barbershop.id} className="min-w-[167px] max-w-[167px]">
              <BarberShopItem barbershop={barbershop} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
