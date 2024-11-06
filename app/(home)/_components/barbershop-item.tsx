"use client";

import Image from "next/image";
import { StarIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Barbershop } from "@prisma/client";

import { Badge } from "@/app/_components/ui/badge";
import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";

interface BarberShopItemProps {
  barbershop: Barbershop;
}

const BarberShopItem = ({ barbershop }: BarberShopItemProps) => {
  const route = useRouter();

  const handleBookingClick = () => route.push(`/barbershops/${barbershop.id}`);

  return (
    <Card className="min-w-[167px] max-w-[167px] rounded-2xl">
      <CardContent className="px-1 py-0">
        <div className=" relative h-[159px] w-full mt-1">
          <div className="absolute top-2 left-2 z-50">
            <Badge variant={"secondary"} className="opacity-90 flex items-center gap-1">
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
          <h2 className="font-bold mt-2 overflow-hidden text-ellipsis text-nowrap">
            {barbershop.name}
          </h2>

          <p className="text-sm text-gray-400 overflow-hidden text-ellipsis text-nowrap">
            {barbershop.address}
          </p>

          <Button variant={"secondary"} className="w-full mt-3" onClick={handleBookingClick}>
            Reservar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BarberShopItem;
