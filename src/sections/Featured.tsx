import { Product } from "@/types/ProductType";
import FeaturedSection from "@/components/FeaturedSection";
const Featured = ({ products }: { products: Product[] }) => {
  return (
    <section id="featured">
      <h2 className="font-semibold text-2xl">
        <span className="animate-pulse">Recently</span> <span>Added</span>
      </h2>
      <p className="text-sm mt-1 text-gray-500">Packed with Love ❤️</p>
      <FeaturedSection products={products} />
    </section>
  );
};

export default Featured;
