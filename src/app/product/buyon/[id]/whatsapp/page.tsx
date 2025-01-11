import type { Metadata } from "next";
import WhatsApp from "@/components/Whatsapp";
import { client } from "@/lib/client";
import { GetAProductQuery } from "@/query/querys";

export const metadata: Metadata = {
  title: "Buy on Whatsapp",
};

export default async function Page({ params }: { params: { id: string } }) {
  const product = await client.fetch(GetAProductQuery(params.id));

  if (product.isAvailable) {
    return (
      <>
        <WhatsApp data={product} />
      </>
    );
  } else {
    return <h2>Product Not Found</h2>;
  }
}
