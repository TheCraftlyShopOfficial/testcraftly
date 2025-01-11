import axios from "axios";
import crypto from "crypto";
import { NextResponse, NextRequest } from "next/server";

// Constants (Consider using environment variables)
const saltKey = process.env.PHONEPE_SALT_KEY;
const merchantId = process.env.PG_MERCHANT_ID;

export async function POST(req: NextRequest) {
  try {
    // Parse the request data
    const reqData = await req.json();

    // Extract transaction details
    const merchantTransactionId = reqData.transactionId;

    // Prepare the payload
    const data = {
      merchantId, // Destructuring assignment for clarity
      merchantTransactionId,
      name: reqData.name,
      amount: reqData.amount * 100, // Convert to paise
      redirectUrl: `http://localhost:3000/api/status?id=${merchantTransactionId}`,
      redirectMode: "POST",
      callbackUrl: `http://localhost:3000/api/status?id=${merchantTransactionId}`,
      mobileNumber: reqData.mobile,
      paymentInstrument: {
        type: "PAY_PAGE",
      },
    };

    // Encode payload as Base64
    const payload = JSON.stringify(data);
    const payloadMain = Buffer.from(payload).toString("base64");

    // Generate checksum
    const keyIndex = 1;
    const string = payloadMain + "/pg/v1/pay" + saltKey;
    const sha256 = crypto.createHash("sha256").update(string).digest("hex");
    const checksum = `${sha256}###${keyIndex}`;

    // Define PhonePe API URL
    const prodURL = process.env.PAYMENT_URL; // Consistent naming

    // API call options
    const options = {
      method: "POST",
      url: prodURL,
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
    const response = await axios(options);

    // Return the response from PhonePe
    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error during payment initiation:", error);

    // Handle errors more comprehensively
    return NextResponse.json(
      { error: "Payment initiation failed", details: error.message || "Unknown error" }, // Provide a default error message if needed
      { status: 500 }
    );
  }
}