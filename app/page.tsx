import Header from "./_components/header";
import Search from "./_components/search";
import CategoryList from "./_components/category-list";
import ProductList from "./_components/product-list";
import { Button } from "./_components/ui/button";
import { ChevronRightIcon } from "lucide-react";
import { db } from "./_lib/prisma";
import PromoBanner from "./_components/promo-banner";
import RestaurantList from "./_components/restaurant-list";
import Link from "next/link";

const Home = async () => {
  const products = await db.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
    take: 10,
    include: {
      restaurant: {
        select: {
          name: true,
        },
      },
    },
  });
  return (
    <>
      <Header />
      <div className="px-5 pt-6">
        <Search />
      </div>

      <div className="px-5 pt-6">
        <CategoryList />
      </div>

      <div className="px-5 pt-6">
        <PromoBanner
          src="/promo-banner-01.png"
          alt="Promoção de até 30% de desconto em pizzas"
        />
      </div>

      <div className="space-y-4 pt-6">
        <div className="flex items-center justify-between px-5">
          <h2 className="font-semibold">Pedidos recomendados</h2>
          <Button
            variant="ghost"
            className="h-fit p-0 text-primary hover:bg-transparent"
          >
            Ver todos
            <ChevronRightIcon size={16} />
          </Button>
        </div>
        <ProductList products={products} />
      </div>

      <div className="px-5 pt-6">
        <PromoBanner
          src="/promo-banner-02.png"
          alt="Lanches a partir de R$17,90"
        />
      </div>

      <div className="space-y-4 py-6 pt-6">
        <div className="flex items-center justify-between px-5">
          <h2 className="font-semibold">Restaurantes recomendados</h2>
          <Link href="/restaurants/recommended">
            <Button
              variant="ghost"
              className="h-fit p-0 text-primary hover:bg-transparent"
            >
              Ver todos
              <ChevronRightIcon size={16} />
            </Button>
          </Link>
        </div>
        <RestaurantList />
      </div>
    </>
  );
};

export default Home;
