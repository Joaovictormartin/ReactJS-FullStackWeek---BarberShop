"use client";

import Image from "next/image";
import { signIn } from "next-auth/react";

import {
  DialogTitle,
  DialogHeader,
  DialogDescription,
} from "@/_components/ui/dialog";
import { Button } from "@/_components/ui/button";

const SignInDialog = () => {
  const handleLoginWithGoogleClick = () => signIn("google");

  return (
    <>
      <DialogHeader>
        <DialogTitle>Faça login na plataforma</DialogTitle>
        <DialogDescription>
          Conecte-se usando sua conta do Google.
        </DialogDescription>
      </DialogHeader>

      <Button
        variant="outline"
        className="gap-1 font-bold"
        onClick={handleLoginWithGoogleClick}
      >
        <Image
          width={18}
          height={18}
          src="/svg/google.svg"
          alt="Fazer login  com o Google"
        />
        Google
      </Button>
    </>
  );
};

export default SignInDialog;
