"use client";

import { z } from "zod";
import { SearchIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormItem,
  FormField,
  FormControl,
  FormMessage,
} from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import { Button } from "@/app/_components/ui/button";

const formSchema = z.object({
  search: z.string({ required_error: "Campo obrigatório" }).trim().min(1),
});

const Search = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: "",
    },
  });

  function handleSubmit(values: z.infer<typeof formSchema>) {
    router.push(`/barbershops?search=${values.search}`);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex w-full items-center gap-2"
      >
        <FormField
          name="search"
          control={form.control}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input placeholder="Busque por uma barbearia" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">
          <SearchIcon size={20} />
        </Button>
      </form>
    </Form>
  );
};

export default Search;
