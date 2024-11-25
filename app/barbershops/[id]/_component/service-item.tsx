"use client";

import Image from "next/image";
import { signIn } from "next-auth/react";
import { Service } from "@prisma/client";

import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";

interface ServiceItemProps {
  service: Service;
  isAuthenticated?: boolean;
}

const ServiceItem = ({ service, isAuthenticated }: ServiceItemProps) => {
  const handleBookingClick = () => {
    if (!isAuthenticated) {
      return signIn("google");
    } else {
    }
  };

  return (
    <Card>
      <CardContent className="w-full p-3">
        <div className="flex items-center gap-4">
          <div className="relative max-h-[110px] min-h-[110px] min-w-[110px] max-w-[110px]">
            <Image
              fill
              alt={service.name}
              src={service.imageUrl}
              className="rounded-lg object-contain"
            />
          </div>

          <div className="flex w-full flex-col">
            <div className="font-bold">{service.name}</div>
            <div className="text-sm text-gray-400">{service.description}</div>

            <div className="mt-3 flex items-center justify-between">
              <p className="text-sm font-bold text-primary">
                {Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(Number(service.price))}
              </p>
              <Button variant={"secondary"} onClick={handleBookingClick}>
                Reservar
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceItem;
