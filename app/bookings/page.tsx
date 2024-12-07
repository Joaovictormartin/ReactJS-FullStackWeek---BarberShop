import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { db } from "@/app/_lib/prisma";
import Header from "@/app/_components/header";
import BookingItem from "@/app/_components/booking-item";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const Bookings = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) redirect("/");

  const [confirmedBookings, finishedBookings] = await Promise.all([
    db.booking.findMany({
      where: {
        userId: (session.user as any).id,
        date: { gte: new Date() },
      },
      include: { service: true, barbershop: true },
    }),
    db.booking.findMany({
      where: {
        userId: (session.user as any).id,
        date: { lt: new Date() },
      },
      include: { service: true, barbershop: true },
    }),
  ]);

  return (
    <div>
      <Header />

      <div className="px-5 py-6">
        <h1 className="text-xl font-bold">Agendamentos</h1>

        {confirmedBookings.length === 0 && finishedBookings.length === 0 && (
          <h2 className="mb-3 mt-6 text-sm font-bold uppercase text-gray-400">
            Confirmados
          </h2>
        )}

        <div className="flex flex-col gap-3">
          {confirmedBookings.map((booking) => (
            <BookingItem key={booking.id} bookings={booking} />
          ))}
        </div>

        <h2 className="mb-3 mt-6 text-sm font-bold uppercase text-gray-400">
          Finalizados
        </h2>

        <div className="flex flex-col gap-3">
          {finishedBookings.map((booking) => (
            <BookingItem key={booking.id} bookings={booking} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Bookings;
