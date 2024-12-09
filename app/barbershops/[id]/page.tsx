import { getServerSession } from "next-auth";

import { db } from "@/app/_lib/prisma";
import { authOptions } from "@/app/_lib/auth";
import ServiceItem from "./_component/service-item";
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

  if (!barbershop) return;

  return (
    <div>
      <BarbershopInfo barbershop={barbershop} />

      <div className="flex flex-col gap-4 px-5 py-6">
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
  );
};

export default BarbershopDetailsPage;
