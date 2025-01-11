import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

export default function ProductLoader() {
  return (
    <div className="container mx-auto p-4">
      <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto py-12 px-4 md:px-6">
        {/* Left column - Product Image */}
        <div className="grid gap-4">
          <Skeleton className="bg-zinc-600 w-full aspect-square rounded-lg" />
        </div>

        {/* Right column - Product Details */}
        <div className="flex flex-col space-y-4">
          <Skeleton className="bg-zinc-600 h-8 w-full" />
          <Skeleton className="bg-zinc-600 h-4 w-3/4" />

          <Skeleton className="bg-zinc-600 h-3 w-1/3" />

          <div className="pt-4">
            <Button disabled className="w-full">
              <Skeleton className="h-5 w-20" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
