import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { MiniProduct } from "@/types/MinimalProductType";
import { Suspense } from "react";

const SearchNavbar = async ({
  products,
}: {
  products: MiniProduct[] | [] | null;
}) => {
  return (
    <>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Category</AccordionTrigger>
          <Suspense fallback={<p>Loading...</p>}>
            <AccordionContent className="px-3">
              {products &&
                Array.from(
                  new Set(
                    products.map(
                      (item: { catagories: string }) => item.catagories
                    )
                  )
                ).map((category, index) => {
                  return (
                    <div
                      key={index}
                      className="flex items-center mb-4 space-x-2"
                    >
                      <Checkbox id={category as string} />
                      <label
                        htmlFor={category as string}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        <p>{category as string}</p>
                      </label>
                    </div>
                  );
                })}
            </AccordionContent>
          </Suspense>
        </AccordionItem>
      </Accordion>

      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Price Range</AccordionTrigger>
          <AccordionContent className="px-3">
            {Array.from({ length: 8 }).map((_, index: number) => {
              if (index < 1) {
                return (
                  <div key={index} className="flex items-center mb-4 space-x-2">
                    <Checkbox id={`${index}`} />
                    <label
                      htmlFor={`${index}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {index} - {index + 1 * 100}
                    </label>
                  </div>
                );
              } else {
                return (
                  <div key={index} className="flex items-center mb-4 space-x-2">
                    <Checkbox id={`${index}`} />
                    <label
                      htmlFor={`${index}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {index * 200} - {index * 400}
                    </label>
                  </div>
                );
              }
            })}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
};

export default SearchNavbar;
