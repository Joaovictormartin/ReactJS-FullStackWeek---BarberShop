"use client";

import Image from "next/image";
import { toast } from "sonner";
import { set } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useMemo, useState } from "react";
import { Barbershop, BarbershopService, Booking } from "@prisma/client";

import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/_components/ui/sheet";
import { Button } from "@/_components/ui/button";
import { Calendar } from "@/_components/ui/calendar";
import { getBookings } from "@/_actions/get-bookings";
import SignInDialog from "@/_components/sign-in-dialog";
import { Card, CardContent } from "@/_components/ui/card";
import { createBooking } from "@/_actions/create-booking";
import BookingSummary from "@/_components/booking-summary";
import { getTimeList } from "@/barbershops/[id]/_helpes/hours";
import { Dialog, DialogContent } from "@/_components/ui/dialog";

interface ServiceItemProps {
  service: BarbershopService;
  barbershop: Pick<Barbershop, "name">;
}

const ServiceItem = ({ service, barbershop }: ServiceItemProps) => {
  const router = useRouter();
  const { data } = useSession();

  const [dayBookings, setDayBookings] = useState<Booking[]>([]);
  const [signInDialogIsOpen, setSignInDialogIsOpen] = useState(false);
  const [bookingSheetIsOpen, setBookingSheetIsOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | undefined>(
    undefined,
  );

  useEffect(() => {
    const fetch = async () => {
      if (!selectedDay) return;
      const bookings = await getBookings({
        date: selectedDay,
        serviceId: service.id,
      });
      setDayBookings(bookings);
    };

    fetch();
  }, [selectedDay, service.id]);

  const selectedDate = useMemo(() => {
    if (!selectedDay || !selectedTime) return;

    return set(selectedDay, {
      hours: Number(selectedTime?.split(":")[0]),
      minutes: Number(selectedTime?.split(":")[1]),
    });
  }, [selectedDay, selectedTime]);

  const handleBookingClick = () => {
    if (data?.user) return setBookingSheetIsOpen(true);
    return setSignInDialogIsOpen(true);
  };

  const handleBookingSheetOpenChange = () => {
    setDayBookings([]);
    setSelectedDay(undefined);
    setSelectedTime(undefined);
    setBookingSheetIsOpen(false);
  };

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDay(date);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleCreateBooking = async () => {
    try {
      if (!selectedDate) return;
      await createBooking({
        serviceId: service.id,
        date: selectedDate,
      });
      handleBookingSheetOpenChange();
      toast.success("Reserva criada com sucesso!", {
        action: {
          label: "Ver agendamentos",
          onClick: () => router.push("/bookings"),
        },
      });
    } catch (error) {
      console.error(error);
      toast.error("Erro ao criar reserva!");
    }
  };

  const timeList = useMemo(() => {
    if (!selectedDay) return [];
    return getTimeList({ bookings: dayBookings, selectedDay });
  }, [dayBookings, selectedDay]);

  return (
    <>
      <Card>
        <CardContent className="flex items-center gap-3 p-3">
          <div className="relative max-h-[110px] min-h-[110px] min-w-[110px] max-w-[110px]">
            <Image
              alt={service.name}
              src={service.imageUrl}
              fill
              className="rounded-lg object-cover"
            />
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-semibold">{service.name}</h3>
            <p className="text-sm text-gray-400">{service.description}</p>

            <div className="flex items-center justify-between">
              <p className="text-sm font-bold text-primary">
                {Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(Number(service.price))}
              </p>

              <Sheet
                open={bookingSheetIsOpen}
                onOpenChange={handleBookingSheetOpenChange}
              >
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={handleBookingClick}
                >
                  Reservar
                </Button>

                <SheetContent className="px-0">
                  <SheetHeader>
                    <SheetTitle>Fazer Reserva</SheetTitle>
                  </SheetHeader>

                  <div className="border-b border-solid py-5">
                    <Calendar
                      mode="single"
                      locale={ptBR}
                      selected={selectedDay}
                      onSelect={handleDateSelect}
                      fromDate={new Date()}
                      styles={{
                        cell: { width: "100%" },
                        button: { width: "100%" },
                        nav_button_previous: { width: "32px", height: "32px" },
                        nav_button_next: { width: "32px", height: "32px" },
                        caption: { textTransform: "capitalize" },
                        head_cell: {
                          width: "100%",
                          textTransform: "capitalize",
                        },
                      }}
                    />
                  </div>

                  {selectedDay && (
                    <div className="flex gap-3 overflow-x-auto border-b border-solid p-5 [&::-webkit-scrollbar]:hidden">
                      {timeList.length > 0 ? (
                        timeList.map((time) => (
                          <Button
                            key={time}
                            className="rounded-full"
                            onClick={() => handleTimeSelect(time)}
                            variant={
                              selectedTime === time ? "default" : "outline"
                            }
                          >
                            {time}
                          </Button>
                        ))
                      ) : (
                        <p className="text-xs">
                          Não há horários disponíveis para este dia.
                        </p>
                      )}
                    </div>
                  )}

                  {selectedDate && (
                    <div className="p-5">
                      <BookingSummary
                        service={service}
                        barbershop={barbershop}
                        selectedDate={selectedDate}
                      />
                    </div>
                  )}
                  <SheetFooter className="mt-5 px-5">
                    <Button
                      onClick={handleCreateBooking}
                      disabled={!selectedDay || !selectedTime}
                    >
                      Confirmar
                    </Button>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog
        open={signInDialogIsOpen}
        onOpenChange={(open) => setSignInDialogIsOpen(open)}
      >
        <DialogContent className="w-[90%]">
          <SignInDialog />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ServiceItem;
