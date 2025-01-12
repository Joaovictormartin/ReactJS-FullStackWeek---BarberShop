"use client";

import Image from "next/image";
import { StarIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Barbershop } from "@prisma/client";

import { Badge } from "@/_components/ui/badge";
import { Button } from "@/_components/ui/button";
import { Card, CardContent } from "@/_components/ui/card";

interface BarberShopItemProps {
  barbershop: Barbershop;
}

const BarberShopItem = ({ barbershop }: BarberShopItemProps) => {
  const route = useRouter();

  const handleBookingClick = () => route.push(`/barbershops/${barbershop.id}`);

  return (
    <Card className="min-w-full max-w-full rounded-2xl">
      <CardContent className="px-1 py-0">
        <div className="relative mt-1 h-[159px] w-full">
          <div className="absolute left-2 top-2 z-50">
            <Badge
              variant={"secondary"}
              className="flex items-center gap-1 opacity-90"
            >
              <StarIcon size={12} className="fill-primary text-primary" />
              <span className="text-xs">5,0</span>
            </Badge>
          </div>

          <Image
            fill
            width={0}
            height={0}
            sizes="100vw"
            alt={barbershop.name}
            className="rounded-2xl"
            src={barbershop.imageUrl}
            style={{ objectFit: "cover" }}
          />
        </div>

        <div className="px-2 pb-3">
          <h2 className="mt-2 overflow-hidden text-ellipsis text-nowrap font-bold">
            {barbershop.name}
          </h2>

          <p className="overflow-hidden text-ellipsis text-nowrap text-sm text-gray-400">
            {barbershop.address}
          </p>

          <Button
            variant={"secondary"}
            className="mt-3 w-full"
            onClick={handleBookingClick}
          >
            Reservar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BarberShopItem;
