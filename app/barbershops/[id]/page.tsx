import { db } from "@/app/_lib/prisma";
import BarbershopInfo from "./_component/barbershop-info";
import ServiceItem from "./_component/service-item";

interface BarbershopDetailsPageProps {
  params: { id: string };
}

const BarbershopDetailsPage = async ({ params }: BarbershopDetailsPageProps) => {
  const { id } = await params;
  if (!id) return;

  const barbershop = await db.barbershop.findUnique({
    where: { id },
    include: { services: true },
  });

  if (!barbershop) return;
  console.log("🚀 ~ BarbershopDetailsPage ~ barbershop:", barbershop);

  return (
    <div>
      <BarbershopInfo barbershop={barbershop} />

      {barbershop.services.map((service) => (
        <ServiceItem key={service.id} service={service} />
      ))}
    </div>
  );
};

export default BarbershopDetailsPage;
