import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function WhtLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>
            <Skeleton className="bg-zinc-600 h-8 w-3/4" />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Skeleton className="bg-zinc-600 h-4 w-1/4" />
            <Skeleton className="bg-zinc-600 h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="bg-zinc-600 h-4 w-1/4" />
            <Skeleton className="bg-zinc-600 h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="bg-zinc-600 h-4 w-1/4" />
            <Skeleton className="bg-zinc-600 h-10 w-full" />
          </div>
          <Skeleton className="bg-zinc-600 h-10 w-full" />
        </CardContent>
      </Card>
    </div>
  );
}
