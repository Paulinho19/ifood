import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";
import RestaurantImage from "./_components/restaurant-image";
import Image from "next/image";
import { StarIcon } from "lucide-react";
import DeliveryInfo from "@/app/_components/delivery-info";

interface RestaurantPageProps {
  params: {
    id: string;
  };
}

const RestaurantPage = async ({ params: { id } }: RestaurantPageProps) => {
  const restaurant = await db.restaurant.findUnique({
    where: {
      id: id,
    },
    include: {
      categories: true,
    },
  });

  if (!restaurant) {
    return notFound();
  }

  return (
    <div>
      <RestaurantImage restaurant={restaurant} />

      <div className="flex items-center justify-between px-5 pt-5">
        <div className="flex items-center gap-1">
          <div className="relative h-8 w-8">
            <Image
              src={restaurant.imageUrl}
              alt={restaurant.name}
              className="rounded-full object-cover"
              fill
            />
          </div>
          <h1 className="text-xl font-semibold">{restaurant.name}</h1>
        </div>

        <div className=" flex items-center gap-[4px] rounded-full bg-foreground px-2 py-[2px] text-white">
          <StarIcon size={17} className=" fill-yellow-400 " />
          <span className="text-xs font-semibold ">5.0</span>
        </div>
      </div>

      <div className="px-5">
        <DeliveryInfo restaurant={restaurant} />
      </div>

      <div className="mt-3 flex gap-4 overflow-x-scroll px-5 [&::-webkit-scrollbar]:hidden">
        {restaurant.categories.map((category) => (
          <div
            className="min-w-[167px] rounded-lg bg-[#f4f4f4] text-center"
            key={category.id}
          >
            <span className="text-xs text-muted-foreground">
              {category.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantPage;
