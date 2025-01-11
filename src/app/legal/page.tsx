import MarkdownRenderer from "@/components/ProductDescription";
import { client } from "@/lib/client";
import { LegalTermsQuery } from "@/query/querys";

async function LegalPage() {
  let legalData = await client.fetch(
    LegalTermsQuery,
    {},
    { cache: "no-store" }
  );
  let data = legalData[0];
  return (
    <div className="mx-auto max-w-4xl my-8 px-4">
      {/* Main Title */}

      <p className="text-xs sm:text-sm md:text-base text-zinc-700 mt-2">
        ** read all the details carefully **
      </p>

      {/* Terms of Service Section */}
      <div className="section my-6" id="terms-condition">
        {data.termsAndConditions && (
          <MarkdownRenderer markdownContent={data.termsAndConditions} />
        )}
      </div>

      {/* Privacy Policy Section */}
      <div className="section my-6" id="privacy-policy">
        {data.privacyPolicy && (
          <MarkdownRenderer markdownContent={data.privacyPolicy} />
        )}
      </div>

      {/* Return Policy Section */}
      <div className="section my-6" id="return-policy">
        {data.returnPolicy && (
          <MarkdownRenderer markdownContent={data.returnPolicy} />
        )}
      </div>

      {/* Shipping Policy Section */}
      <div className="section my-6" id="shipping-policy">
        {data.shippingPolicy && (
          <MarkdownRenderer markdownContent={data.shippingPolicy} />
        )}
      </div>
    </div>
  );
}

export default LegalPage;
