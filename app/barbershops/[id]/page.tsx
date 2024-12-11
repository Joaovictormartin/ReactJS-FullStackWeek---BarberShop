import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";

import { db } from "@/app/_lib/prisma";
import { authOptions } from "@/app/_lib/auth";
import ServiceItem from "./_component/service-item";
import PhoneItem from "@/app/_components/phone-item";
import BarbershopInfo from "./_component/barbershop-info";

interface BarbershopDetailsPageProps {
  params: { id: string };
}

const BarbershopDetailsPage = async ({
  params,
}: BarbershopDetailsPageProps) => {
  const { id } = await params;
  const session = await getServerSession(authOptions);

  if (!id) return;

  const barbershop = await db.barbershop.findUnique({
    where: { id },
    include: { services: true },
  });

  if (!barbershop) {
    return notFound();
  }

  return (
    <div>
      <BarbershopInfo barbershop={barbershop} />

      <div className="flex flex-col gap-3 border-b border-solid border-secondary px-5 py-6">
        <h2 className="text-xs font-bold uppercase text-gray-400">Serviços</h2>

        <div className="flex flex-col gap-4">
          {barbershop.services.map((service) => (
            <ServiceItem
              key={service.id}
              service={service}
              barbershop={barbershop}
              isAuthenticated={!!session?.user}
            />
          ))}
        </div>
      </div>

      <div className="space-y-3 p-5">
        <h2 className="text-xs font-bold uppercase text-gray-400">Contato</h2>

        {barbershop.phones.map((phone) => (
          <PhoneItem key={phone} phone={phone} />
        ))}
      </div>
    </div>
  );
};

export default BarbershopDetailsPage;
