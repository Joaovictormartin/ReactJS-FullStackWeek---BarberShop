"use client";

import Image from "next/image";
import { Barbershop } from "@prisma/client";
import { ChevronLeftIcon, MapPin, MenuIcon, StarIcon } from "lucide-react";

import { Button } from "@/app/_components/ui/button";
import { useRouter } from "next/navigation";

interface BarbershopInfoProps {
  barbershop: Barbershop;
}

const BarbershopInfo = ({ barbershop }: BarbershopInfoProps) => {
  const route = useRouter();

  const handleBackClick = () => route.back();

  return (
    <div>
      <div className="w-full h-[250px] relative">
        <Button
          size={"icon"}
          variant={"outline"}
          onClick={handleBackClick}
          className="z-50 top-4 left-4 absolute"
        >
          <ChevronLeftIcon />
        </Button>

        <Button size={"icon"} variant={"outline"} className="z-50 top-4 right-4 absolute">
          <MenuIcon />
        </Button>

        <Image
          fill
          alt={barbershop.name}
          src={barbershop.imageUrl}
          style={{ objectFit: "cover" }}
          className="opacity-75"
        />
      </div>

      <div className="px-5 pt-3 pb-6 border-b border-solid border-secondary space-y-1 ">
        <h1 className="text-xl font-bold">{barbershop.name}</h1>
        <div className="flex item-center gap-1">
          <MapPin className="stroke-primary" size={18} />
          <p className="text-sm">{barbershop.address}</p>
        </div>
        <div className="flex item-center gap-1">
          <StarIcon className="stroke-primary" size={18} />
          <p className="text-sm">5,0 889 avaliações</p>
        </div>
      </div>
    </div>
  );
};

export default BarbershopInfo;
