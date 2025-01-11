import Link from "next/link";
import { IndianRupee } from "lucide-react";
import ImageLoader from "./ImageLoader";
import { Product } from "@/types/ProductType";

const ProductCard = ({ Text, product }: { Text: string; product: Product }) => {
  return (
    <>
      <Link
        href={`/product/${product.slug}/${product._id}`}
        className="rounded-lg inline-block w-full"
      >
        <div className="relative h-[300px] max-w-[300px] rounded-lg">
          <ImageLoader
            width={300}
            height={300}
            src={product.productImage}
            className="w-full object-cover object-center h-full rounded-lg transition-all"
            alt={product.name}
          />
        </div>
        <div className="product__info mt-1 pt-2 pb-3">
          <h3 className="uppercase text-xs font-semibold text-gray-400">
            {product.categories[0]}
          </h3>
          <h4 className="font-semibold text-balance !leading-2">
            {product.name}
          </h4>
          <p className="font-bold text-sm flex items-center mt-0.5">
            <IndianRupee className="w-3 h-3" />
            {/* <img src="/Price.svg" alt="rs" className="w-3 h-3" /> */}
            {Math.round(
              Number(product.price) -
                Number(product.price) * (Number(product.discount) / 100)
            )}
          </p>
        </div>
      </Link>
    </>
  );
};

export default ProductCard;
