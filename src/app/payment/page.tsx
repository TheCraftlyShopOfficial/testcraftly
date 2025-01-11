"use client";
import React, { useState, FormEvent, FC } from "react";
import axios from "axios";

// Define the expected structure of the response
interface RedirectInfo {
  url: string;
}

interface InstrumentResponse {
  redirectInfo: RedirectInfo;
}

interface PaymentResponseData {
  instrumentResponse: InstrumentResponse;
}

interface PaymentResponse {
  success: boolean;
  data: PaymentResponseData;
}

const Home: FC = () => {
  const [name, setName] = useState<string>("");
  const [mobile, setMobile] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handlePayment = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setLoading(true);

    // Prepare the data
    const data = {
      name,
      amount,
      mobile,
      transactionId: "T" + Date.now(),
    };

    try {
      // Initiate payment and type the Axios response
      const response = await axios.post<PaymentResponse>(
        "/api/payment",
        data
      );

      // Access response data safely
      if (
        response.data.success &&
        response.data.data.instrumentResponse.redirectInfo.url
      ) {
        window.location.href =
          response.data.data.instrumentResponse.redirectInfo.url;
      } else {
        alert("Payment initiation failed: No redirect URL found.");
      }
    } catch (err) {
      console.error("Payment Error:", err);
      alert("Error initiating payment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-indigo-50 to-green-500">
      <div className="max-w-4xl p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4">
          PhonePe Payment Gateway
        </h2>
        <form onSubmit={handlePayment} className="space-y-4">
          <div>
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded"
              required
            />
          </div>
          <div>
            <label>Mobile:</label>
            <input
              type="text"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="w-full px-4 py-2 border rounded"
              required
            />
          </div>
          <div>
            <label>Amount:</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-2 border rounded"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 bg-blue-500 text-white rounded"
          >
            {loading ? "Processing..." : "Pay Now"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;
