import React from "react";

const ProductLoadingCard = () => {
  return (
    <>
      <div className="rounded-lg inline-block w-full">
        <div className="product__image__container relative h-[300px]">
          <div className="w-full h-full animate-pulse rounded-md bg-zinc-600"></div>
        </div>
        <div className="product__info mt-1 pt-1 pb-3">
          <div className="w-full h-4 bg-zinc-600 animate-pulse rounded-full"></div>
          <div className="flex items-center mt-2 gap-4">
            <div className="w-full h-4 animate-pulse bg-zinc-600 rounded-full"></div>
            <div className="w-full h-4 animate-pulse bg-zinc-600 rounded-full"></div>
            <div className="w-full h-4 animate-pulse bg-zinc-600 rounded-full"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductLoadingCard;
