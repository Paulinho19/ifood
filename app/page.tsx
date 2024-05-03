import Header from "./_components/header";
import Search from "./_components/search";
import CategoryList from "./_components/category-list";
import Image from "next/image";

const Home = () => {
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
        <Image
          src="/promo-banner-01.png"
          alt="Promoção de até 30% de desconto em pizzas"
          width={0}
          height={0}
          className="h-auto w-full object-contain"
          sizes="100vw"
        />
      </div>
    </>
  );
};

export default Home;
