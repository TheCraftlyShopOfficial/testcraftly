import ProductCard from "@/components/Product";
import { Product } from "@/types/ProductType";
import { Key } from "react";

const BestSellingSection = async ({ products }: { products: Product[] }) => {
  return (
    <>
      <div className="my-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {/* <h2>hello world</h2> */}
        {products &&
          products.map((item: Product, index: Key) => {
            if (item.isAvailable && item.isBestSeller) {
              return (
                <ProductCard key={index} Text="Newly Added" product={item} />
              );
            }
          })}
      </div>
    </>
  );
};

export default BestSellingSection;
