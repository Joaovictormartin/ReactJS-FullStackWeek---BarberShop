import Image from "next/image";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { getServerSession } from "next-auth";

import {
  getBarbershop,
  getBarbershopOrderById,
} from "@/app/_actions/get-barbershop";
import Header from "../_components/header";
import { authOptions } from "@/app/_lib/auth";
import Search from "@/app/(home)/_components/search";
import { getBookgin } from "@/app/_actions/get-bookgin";
import BookingItem from "@/app/_components/booking-item";
import BarberShopItem from "@/app/(home)/_components/barbershop-item";

export default async function Home() {
  const session = await getServerSession(authOptions);

  const [barbershops, recommendedBarbershops, confirmedBookings] =
    await Promise.all([
      getBarbershop(),
      getBarbershopOrderById("asc"),
      getBookgin(),
    ]);

  return (
    <div>
      <Header />

      <div className="px-5 pt-5">
        <h2 className="text-xl font-bold">
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
                <BookingItem key={booking.id} bookings={booking} />
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
