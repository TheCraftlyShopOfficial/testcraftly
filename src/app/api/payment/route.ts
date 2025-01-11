import axios from "axios";
import crypto from "crypto";
import { NextResponse } from "next/server";

// Constants
const salt_key: string = "96434309-7796-489d-8924-ab56988a6076";
const merchant_id: string = "PGTESTPAYUAT86";

export async function POST(req: Request): Promise<Response> {
  try {
    const reqData: { transactionId: string; name: string; amount: number; mobile: string } = await req.json(); // Parse the request data

    // Extract transaction details
    const merchantTransactionId: string = reqData.transactionId;

    // Prepare the payload
    const data: {
      merchantId: string;
      merchantTransactionId: string;
      name: string;
      amount: number;
      redirectUrl: string;
      redirectMode: string;
      callbackUrl: string;
      mobileNumber: string;
      paymentInstrument: { type: string };
    } = {
      merchantId: merchant_id,
      merchantTransactionId: merchantTransactionId,
      name: reqData.name,
      amount: reqData.amount * 100, // Convert to paise (smallest currency unit)
      redirectUrl: `http://localhost:3000/api/status?id=${merchantTransactionId}`,
      redirectMode: "POST",
      callbackUrl: `http://localhost:3000/api/status?id=${merchantTransactionId}`,
      mobileNumber: reqData.mobile,
      paymentInstrument: {
        type: "PAY_PAGE",
      },
    };

    // Encode payload as Base64
    const payload:string = JSON.stringify(data);
    const payloadMain:string = Buffer.from(payload).toString("base64");

    // Generate checksum
    const keyIndex:number = 1;
    const string:string = payloadMain + "/pg/v1/pay" + salt_key;
    const sha256:string = crypto.createHash("sha256").update(string).digest("hex");
    const checksum:string = `${sha256}###${keyIndex}`;

    // Define PhonePe API URL
    const prod_URL:string =
      "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay";

    // API call options
    const options:any = {
      method: "POST",
      url: prod_URL,
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "X-VERIFY": checksum,
      },
      data: {
        request: payloadMain,
      },
    };

    // Make the API call
    const response:any = await axios(options);

    // Return the response from PhonePe
    return NextResponse.json(response.data);
  } catch (error) {
    console.error(error);

    // Handle errors
   // Handle errors: Narrow down the type of the `error` object
   const errorMessage = error instanceof Error ? error.message : "Unknown error";
   return NextResponse.json(
     { error: "Payment initiation failed", details: errorMessage },
     { status: 500 }
     );
  }
}
