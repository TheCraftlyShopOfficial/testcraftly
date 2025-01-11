import { Button } from "@/components/ui/button";
import ImageLoader from "../ImageLoader";
import { IndianRupee, ShoppingBag } from "lucide-react";
import Link from "next/link";

interface propType {
  productImage: string;
  name: string;
  discount: number | string;
  id: string;
}

const SearchProduct = ({ productImage, name, discount, id }: propType) => {
  return (
    <Link
      href={`/product/Search Results/${id}`}
      className="grid md:grid-cols-2 gap-6 items-center max-w-[350px] py-8"
    >
      <div className="rounded-lg overflow-hidden">
        <ImageLoader
          src={productImage}
          alt={name}
          width={200}
          height={200}
          className="object-cover max-w-[200px] max-h-[200px] overflow-hidden"
        />
      </div>
      <div className="grid gap-2">
        <h2 className="text-xl font-bold line-clamp-1">{name}</h2>
        <p className="text-muted-foreground line-clamp-2 text-sm">
          Experience the ultimate in audio clarity and comfort with our
          state-of-the-art wireless headphones. Crafted with premium materials
          and advanced noise-cancelling technology, these headphones will
          transport you to a world of immersive sound.
        </p>
        <div className="flex items-center gap-4">
          <div className="text-2xl font-bold flex items-center">
            <IndianRupee />
            {discount}
          </div>
          <Button size="lg" variant="ghost" className="gap-2 !tex-sm">
            <ShoppingBag />
            Add to Cart
          </Button>
        </div>
      </div>
    </Link>
  );
};

export default SearchProduct;
