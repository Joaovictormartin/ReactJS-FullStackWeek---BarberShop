"use client";

import Image from "next/image";
import { Barbershop } from "@prisma/client";
import { useRouter } from "next/navigation";
import { ChevronLeftIcon, MapPin, MenuIcon, StarIcon } from "lucide-react";

import SideMenu from "@/_components/side-menu";
import { Button } from "@/_components/ui/button";
import { Sheet, SheetTrigger } from "@/_components/ui/sheet";

interface BarbershopInfoProps {
  barbershop: Barbershop;
}

const BarbershopInfo = ({ barbershop }: BarbershopInfoProps) => {
  const route = useRouter();

  const handleBackClick = () => route.replace("/");

  return (
    <div>
      <div className="relative h-[250px] w-full">
        <Button
          size={"icon"}
          variant={"outline"}
          onClick={handleBackClick}
          className="absolute left-4 top-4 z-50"
        >
          <ChevronLeftIcon />
        </Button>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              size={"icon"}
              variant={"outline"}
              className="absolute right-4 top-4 z-50"
            >
              <MenuIcon />
            </Button>
          </SheetTrigger>

          <SideMenu />
        </Sheet>

        <Image
          fill
          alt={barbershop.name}
          className="opacity-75"
          src={barbershop.imageUrl}
          style={{ objectFit: "cover" }}
        />
      </div>

      <div className="space-y-1 border-b border-solid border-secondary px-5 pb-6 pt-3">
        <h1 className="text-xl font-bold">{barbershop.name}</h1>
        <div className="item-center flex gap-2">
          <MapPin className="stroke-primary" size={18} />
          <p className="text-sm">{barbershop.address}</p>
        </div>
        <div className="item-center flex gap-2">
          <StarIcon className="stroke-primary" size={18} />
          <p className="text-sm">5,0 (889 avaliações)</p>
        </div>
      </div>

      <div className="space-y-3 border-b border-solid border-secondary p-5">
        <h2 className="text-xs font-bold uppercase text-gray-400">Sobre nós</h2>

        <p className="text-sm">{barbershop.description}</p>
      </div>
    </div>
  );
};

export default BarbershopInfo;
