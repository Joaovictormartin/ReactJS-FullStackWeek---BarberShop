import { ptBR } from "date-fns/locale";
import { Prisma } from "@prisma/client";
import { format, isFuture } from "date-fns";

import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";

interface BookingItemProps {
  bookings: Prisma.BookingGetPayload<{
    include: { service: true; barbershop: true };
  }>;
}

const BookingItem = ({ bookings }: BookingItemProps) => {
  const isBookingConfirmed = isFuture(bookings.date);
  const variantBadge = isBookingConfirmed ? "default" : "secondary";
  const statusBookgin = isBookingConfirmed ? "Confirmado" : "Finalizado";

  return (
    <Card>
      <CardContent className="flex px-0 py-0">
        <div className="flex flex-[3] flex-col gap-2 p-5">
          <Badge variant={variantBadge}>{statusBookgin}</Badge>
          <h2 className="font-bold">{bookings.service.name}</h2>

          <div className="flex items-center gap-2">
            <Avatar className="size-6">
              <AvatarImage src={bookings.barbershop.imageUrl} />
              <AvatarFallback>SF</AvatarFallback>
            </Avatar>

            <h3 className="text-sm">{bookings.barbershop.name}</h3>
          </div>
        </div>

        <div className="flex flex-1 flex-col items-center justify-center border-l border-solid border-secondary">
          <p className="text-sm capitalize">
            {format(bookings.date, "MMMM", { locale: ptBR })}
          </p>
          <p className="text-2xl">{format(bookings.date, "dd")}</p>
          <p className="text-sm">{format(bookings.date, "HH:mm")}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingItem;
