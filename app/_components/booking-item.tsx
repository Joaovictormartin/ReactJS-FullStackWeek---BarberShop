"use client";

import { useState } from "react";

import Image from "next/image";
import { toast } from "sonner";
import { ptBR } from "date-fns/locale";
import { Loader2 } from "lucide-react";
import { Prisma } from "@prisma/client";
import { format, isFuture } from "date-fns";

import {
  Sheet,
  SheetTitle,
  SheetHeader,
  SheetContent,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/app/_components/ui/sheet";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/app/_components/ui/alert-dialog";
import { Badge } from "@/app/_components/ui/badge";
import { Button } from "@/app/_components/ui/button";
import BookingInfo from "@/app/_components/booking-info";
import { Card, CardContent } from "@/app/_components/ui/card";
import { cancelBooking } from "@/app/_actions/cancel-bookgin";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";

interface BookingItemProps {
  bookings: Prisma.BookingGetPayload<{
    include: { service: true; barbershop: true };
  }>;
}

const BookingItem = ({ bookings }: BookingItemProps) => {
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  const isBookingConfirmed = isFuture(bookings.date);
  const variantBadge = isBookingConfirmed ? "default" : "secondary";
  const statusBookgin = isBookingConfirmed ? "Confirmado" : "Finalizado";

  const handleCancelBooking = async () => {
    setIsDeleteLoading(true);

    try {
      await cancelBooking(bookings.id);

      toast.success("Reserva cancelada com sucesso!");
    } catch (error) {
      console.error("Failed to cancel booking:", error);
    } finally {
      setIsDeleteLoading(false);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Card className="min-w-full">
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
      </SheetTrigger>

      <SheetContent className="px-0">
        <SheetHeader className="border-b border-solid border-secondary px-5 pb-6 text-left">
          <SheetTitle>Informações da Reserva</SheetTitle>
        </SheetHeader>

        <div className="px-5">
          <div className="relative mt-6 h-[180px] w-full">
            <Image
              fill
              src="/BarberShopCard.png"
              alt={bookings.barbershop.name}
            />

            <div className="absolute bottom-4 w-full px-5">
              <Card>
                <CardContent className="flex gap-2 p-3">
                  <Avatar>
                    <AvatarImage src={bookings.barbershop.imageUrl} />
                  </Avatar>

                  <div className="flex flex-col">
                    <h2 className="font-bold">{bookings.barbershop.name}</h2>
                    <h3 className="overflow-hidden text-ellipsis text-nowrap text-xs">
                      {bookings.barbershop.address}
                    </h3>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <Badge variant={variantBadge} className="my-3">
            {statusBookgin}
          </Badge>

          <BookingInfo booking={bookings} />

          <SheetFooter className="mt-3 flex flex-row gap-3">
            <SheetClose asChild>
              <Button className="w-full" variant={"secondary"}>
                Voltar
              </Button>
            </SheetClose>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  className="w-full"
                  variant={"destructive"}
                  disabled={!isBookingConfirmed || isDeleteLoading}
                >
                  Cancelar Reserva
                </Button>
              </AlertDialogTrigger>

              <AlertDialogContent className="w-[90%]">
                <AlertDialogHeader>
                  <AlertDialogTitle>Cancelar Reserva</AlertDialogTitle>
                  <AlertDialogDescription>
                    Tem certeza que deseja cancelar esse agendamento?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex-row gap-3">
                  <AlertDialogCancel className="mt-0 w-full">
                    Voltar
                  </AlertDialogCancel>
                  <AlertDialogAction
                    className="w-full"
                    disabled={isDeleteLoading}
                    onClick={handleCancelBooking}
                  >
                    {isDeleteLoading && (
                      <Loader2 className="mr-2 size-4 animate-spin" />
                    )}
                    Confirmar
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default BookingItem;
