import { BikeIcon, TimerIcon } from "lucide-react";
import { Card } from "./ui/card";
import { formatCurrency } from "../_helpers/price";
import { Restaurant } from "@prisma/client";

interface DeliveryInfoProps {
  restaurant: Pick<Restaurant, "deliveryFee" | "deliveryTimeMinutes">;
}

const DeliveryInfo = ({ restaurant }: DeliveryInfoProps) => {
  return (
    <>
      <Card className="mt-5 flex justify-around p-5">
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2 text-muted-foreground">
            <span>Entrega</span>
            <BikeIcon />
          </div>

          {Number(restaurant.deliveryFee) > 0 ? (
            <p className="mr-4 text-sm font-semibold">
              {formatCurrency(Number(restaurant.deliveryFee))}
            </p>
          ) : (
            <p className="mr-4 text-sm font-semibold">Grátis</p>
          )}
        </div>

        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2 text-muted-foreground">
            <span>Tempo</span>
            <TimerIcon />
          </div>

          <span className="mr-4 text-sm font-semibold">
            {restaurant.deliveryTimeMinutes}min
          </span>
        </div>
      </Card>
    </>
  );
};

export default DeliveryInfo;
