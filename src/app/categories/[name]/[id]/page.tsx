import ProductCard from "@/components/Product";
import { client } from "@/lib/client";
import { HOST } from "@/lib/env";
import { GetCategoryProductsQuery } from "@/query/querys";
import { Product } from "@/types/ProductType";
import { Key } from "react";

function fromUrlFriendly(str: string) {
  return str
    .replace(/-/g, " ") // Replace hyphens with spaces
    .replace(/\b\w/g, function (char) {
      return char.toUpperCase();
    }); // Capitalize first letter of each word
}

async function Categories({
  params,
}: {
  params: { name: string; id: string };
}) {
  let targetProducts = await client.fetch(
    GetCategoryProductsQuery(fromUrlFriendly(params.name))
  );

  console.log(targetProducts, "from category products");

  return (
    <>
      <div className="container mx-auto px-4">
        <h2 className="my-12 md:my-8 text-2xl font-semibold">
          {fromUrlFriendly(params.name)}
        </h2>
        <div className="my-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {targetProducts &&
            targetProducts.map((item: Product, index: Key) => {
              if (item.isAvailable) {
                return (
                  <ProductCard key={index} Text={item.name} product={item} />
                );
              }
            })}
        </div>
      </div>
    </>
  );
}

export default Categories;
