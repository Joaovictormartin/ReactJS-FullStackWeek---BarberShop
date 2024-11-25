"use client";

import Link from "next/link";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";

import {
  CalendarIcon,
  HomeIcon,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  UserIcon,
} from "lucide-react";

import {
  Sheet,
  SheetTitle,
  SheetHeader,
  SheetTrigger,
  SheetContent,
} from "@/app/_components/ui/sheet";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/app/_components/ui/avatar";
import { Button } from "./ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";

const Header = () => {
  const { data } = useSession();
  const nameUser = data?.user?.name?.split("");

  const handleLoginClick = () => signIn("google");

  const handleLogoutClick = () => signOut();

  return (
    <Card>
      <CardContent className="flex items-center justify-between p-5">
        <Image src="/Logo.png" alt="FSW Barber" height={18} width={120} />

        <Sheet>
          <SheetTrigger asChild>
            <Button variant={"outline"} size={"icon"}>
              <MenuIcon size={18} />
            </Button>
          </SheetTrigger>

          <SheetContent className="p-0">
            <SheetHeader className="border-b border-solid border-secondary p-5 text-left">
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>

            {data?.user ? (
              <div className="flex items-center justify-between px-5 py-6">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={data?.user.image ?? ""} />
                    <AvatarFallback>{nameUser && nameUser[0]}</AvatarFallback>
                  </Avatar>

                  <h2 className="font-bold">{data?.user.name ?? ""}</h2>
                </div>

                <Button
                  size={"icon"}
                  variant={"outline"}
                  onClick={handleLogoutClick}
                >
                  <LogOutIcon size={18} />
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-3 px-5 py-6">
                <div className="flex items-center gap-2">
                  <UserIcon size={32} />
                  <h2 className="font-bold">Olá, faça seu login!</h2>
                </div>

                <Button
                  variant={"secondary"}
                  onClick={handleLoginClick}
                  className="w-full justify-start"
                >
                  <LogInIcon size={18} />
                  Fazer Login
                </Button>
              </div>
            )}

            <div className="flex flex-col gap-3 px-5">
              <Button
                asChild
                variant={"outline"}
                className="justify-start"
                onClick={handleLogoutClick}
              >
                <Link href="/">
                  <HomeIcon size={18} />
                  Início
                </Link>
              </Button>

              {data?.user && (
                <Button
                  asChild
                  variant={"outline"}
                  className="justify-start"
                  onClick={handleLogoutClick}
                >
                  <Link href="/bookings">
                    <CalendarIcon size={18} />
                    Agendamento
                  </Link>
                </Button>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </CardContent>
    </Card>
  );
};

export default Header;
