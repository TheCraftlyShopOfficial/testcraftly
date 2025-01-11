import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import ImageLoader from "@/components/ImageLoader";
import { Suspense } from "react";
import { CircleCheck, CircleOff, Cog, IndianRupee } from "lucide-react";
import Link from "next/link";
import { client } from "@/lib/client";
import ProductLoader from "@/components/loading-components/ProductLoading";
import { GetAProductQuery } from "@/query/querys";
import MarkdownRenderer from "@/components/ProductDescription";
import { Product } from "@/types/ProductType";

export default async function ProductView({
  params,
}: {
  params: { id: string };
}) {
  const product: Product = await client.fetch(
    GetAProductQuery(params.id),
    {},
    { cache: "no-store" }
  );
  console.log(product);

  if (!product) {
    return (
      <div className="max-w-2xl mx-auto py-12 px-4 md:px-6">
        <h2 className="text-2xl font-bold text-center">Product Not Found</h2>
        <p className="text-center text-muted-foreground mt-4">
          The product you are looking for might have been removed or is
          temporarily unavailable.
        </p>
      </div>
    );
  }

  return (
    <Suspense fallback={<ProductLoader />}>
      <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto py-12 px-4 md:px-6">
        <div className="grid gap-4">
          <Carousel className="rounded-lg overflow-hidden">
            <CarouselContent>
              <CarouselItem>
                <ImageLoader
                  alt="product Image"
                  src={product.productImage}
                  width={600}
                  height={600}
                  className="aspect-square object-cover w-full"
                />
              </CarouselItem>
              {product.productImages.map((item: string, index: number) => (
                <CarouselItem key={index}>
                  <ImageLoader
                    alt="product Image"
                    src={item}
                    width={600}
                    height={600}
                    className="aspect-square object-cover w-full"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
        <div className="grid">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="flex items-center gap-4 mt-2">
              <p className="text-2xl font-bold">
                <IndianRupee className="inline-block" />
                {Math.round(
                  Number(product.price) -
                    Number(product.price) * (Number(product.discount) / 100)
                )}
              </p>
              <p className="text-sm text-muted-foreground line-through">
                <IndianRupee className="inline-block w-4 h-4" />
                {product.price}
              </p>
              <Badge variant="outline" className="px-2 py-1">
                Save {product.discount}%
              </Badge>
            </div>
            <Link
              href={`/product/buyon/${params.id}/whatsapp`}
              className="flex mt-6 items-center justify-center bg-zinc-900 text-white py-2 tracking-tight rounded-md hover:bg-zinc-700 hover:text-white/75 transition gap-2"
            >
              <PhoneIcon className="w-5 h-5" />
              Get on WhatsApp
            </Link>
            <p className="mt-6 text-foreground">{product.description}</p>
            <div className="product__types mt-6">
              {product.colors && product.colors.length > 0 && (
                <div className="color-options">
                  <h2 className="text-sm font-semibold text-zinc-700">
                    Available Colors
                  </h2>
                  <div className="flex items-center gap-2 mt-2">
                    {product.colors.map(
                      (
                        color: { name: string; color: string },
                        index: number
                      ) => (
                        <div
                          key={index}
                          className="border flex items-center justify-center rounded-full w-6 h-6"
                          style={{ backgroundColor: color.color }}
                        >
                          <span className="text-xs sr-only">{color.name}</span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}
              {product.sizes && product.sizes.length > 0 && (
                <div className="size-options mt-4">
                  <h2 className="text-sm font-semibold text-zinc-700">
                    Available Sizes
                  </h2>
                  <div className="flex items-center gap-2 mt-2">
                    {product.sizes.map(
                      (size: { name: string; size: string }, index: number) => (
                        <div
                          key={index}
                          className="border flex items-center justify-center border-black rounded-md w-6 h-6"
                        >
                          <span className="text-xs">{size.size}</span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}

              <div className="mt-6">
                {product.isCustomizeable ? (
                  <Badge
                    variant="outline"
                    className="py-2 gap-2 bg-green-900 text-white"
                  >
                    <CircleCheck className="w-4 h-4" />
                    Customizable
                  </Badge>
                ) : (
                  <Badge variant="default" className="py-2 gap-2 bg-red-900">
                    <CircleOff className="w-4 h-4" />
                    Non-Customizable
                  </Badge>
                )}
              </div>
              <div className="mt-6">
                <h2 className="text-sm font-semibold text-zinc-700">
                  Product Description
                </h2>
                <MarkdownRenderer
                  markdownContent={`${product.fullDescription}`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
}

function PhoneIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}
