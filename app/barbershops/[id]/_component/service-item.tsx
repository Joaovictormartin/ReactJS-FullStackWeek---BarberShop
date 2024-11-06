import Image from "next/image";
import { Service } from "@prisma/client";

import { Card, CardContent } from "@/app/_components/ui/card";

interface ServiceItemProps {
  service: Service;
}

const ServiceItem = ({ service }: ServiceItemProps) => {
  console.log("🚀 ~ ServiceItem ~ service:", service);
  return (
    <Card>
      <CardContent>
        <Image alt={service.name} src={service.imageUrl} />
      </CardContent>
    </Card>
  );
};

export default ServiceItem;
