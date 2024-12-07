"use client";

import Link from "next/link";
import Image from "next/image";
import { MenuIcon } from "lucide-react";
import { Sheet, SheetTrigger } from "@/app/_components/ui/sheet";

import SideMenu from "@/app/_components/side-menu";
import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";

const Header = () => {
  return (
    <Card>
      <CardContent className="flex items-center justify-between p-5">
        <Link href="/">
          <Image src="/Logo.png" alt="FSW Barber" height={18} width={120} />
        </Link>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant={"outline"} size={"icon"}>
              <MenuIcon size={18} />
            </Button>
          </SheetTrigger>

          <SideMenu />
        </Sheet>
      </CardContent>
    </Card>
  );
};

export default Header;
