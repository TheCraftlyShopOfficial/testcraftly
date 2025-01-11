import { Product } from "@/types/ProductType";
import BestSellingSection from "@/components/BestSellingSection";

const BestSelling = ({ products }: { products: Product[] }) => {
  return (
    <section id="bestselling">
      <h2 className="font-semibold text-2xl">
        <span>Best</span> <span className="animate-pulse">Selling</span>
      </h2>
      <p className="text-sm mt-1 text-gray-500">People Gave Love ❤️</p>
      <BestSellingSection products={products} />
    </section>
  );
};

export default BestSelling;
