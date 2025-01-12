import { getServerSession } from "next-auth";

import { authOptions } from "@/_lib/auth";
import Header from "@/_components/header";
import BookingItem from "@/_components/booking-item";
import SignInDialog from "@/_components/sign-in-dialog";
import { getConfirmedBookings } from "@/_actions/get-confirmed-bookings";
import { getConcludedBookings } from "@/_actions/get-concluded-bookings";
import { Dialog } from "@/_components/ui/dialog";

const Bookings = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return (
      <div className="mt-20 flex flex-col items-center justify-center">
        <Dialog>
          <SignInDialog />
        </Dialog>
      </div>
    );
  }

  const [confirmedBookings, concludedBookings] = await Promise.all([
    getConfirmedBookings(),
    getConcludedBookings(),
  ]);

  return (
    <>
      <Header />
      <div className="space-y-3 p-5">
        <h1 className="text-xl font-bold">Agendamentos</h1>
        {confirmedBookings.length === 0 && concludedBookings.length === 0 && (
          <p className="text-gray-400">Você não tem agendamentos.</p>
        )}

        {confirmedBookings.length > 0 && (
          <>
            <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
              Confirmados
            </h2>
            {confirmedBookings.map((booking) => (
              <BookingItem
                key={booking.id}
                booking={JSON.parse(JSON.stringify(booking))}
              />
            ))}
          </>
        )}

        {concludedBookings.length > 0 && (
          <>
            <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
              Finalizados
            </h2>
            {concludedBookings.map((booking) => (
              <BookingItem
                key={booking.id}
                booking={JSON.parse(JSON.stringify(booking))}
              />
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default Bookings;
