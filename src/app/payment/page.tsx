'use client';

import { useState } from 'react';
import axios from 'axios';

const PaymentPage = () => {
    const [paymentData, setPaymentData] = useState({
        merchantId: 'M22VHVREF764V', // Replace with your merchant ID (for testing)
        transactionId: `TXN${Date.now()}`,
        merchantUserId: 'user123',
        amount: 1000,
        merchantOrderId: `ORD${Date.now()}`,
        mobileNumber: '9999999999',
        message: 'Test Payment',
        email: 'test@example.com',
        shortName: 'Test User',
        paymentScope: 'PHONEPE', // Important: Set this value
        deviceContext: { phonePeVersionCode: 303391 },
    });
    const [paymentResponse, setPaymentResponse] = useState(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        setPaymentData({ ...paymentData, [e.target.name]: e.target.value });
    };

    const handlePayment = async () => {
        setLoading(true);
        setError(null);
        console.log("Sending payment data:", paymentData); // Log the data being sent
        try {
            const response = await axios.post('/api/payment', paymentData);
            console.log("Payment API Response:", response);
            setPaymentResponse(response.data);
            if (response.data.success) {
                if (response.data.data && response.data.data.instrumentResponse && response.data.data.instrumentResponse.redirectInfo && response.data.data.instrumentResponse.redirectInfo.url){
                  window.location.href = response.data.data.instrumentResponse.redirectInfo.url
                }
                else if (response.data.instrumentResponse && response.data.instrumentResponse.redirectInfo && response.data.instrumentResponse.redirectInfo.url){
                  window.location.href = response.data.instrumentResponse.redirectInfo.url
                }
                else if (response.data.redirectUrl){
                  window.location.href = response.data.redirectUrl
                }
                else{
                  alert("Payment initiated successfully. Please check your PhonePe app.")
                }
            } else {
                setError(response.data.message || 'Payment failed.');
            }
        } catch (err) {
            setError(err.response?.data?.message || err.message || 'An error occurred.');
            console.error("Error in payment",err)
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>PhonePe Payment Integration</h1>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            {paymentResponse && (
                <pre>{JSON.stringify(paymentResponse, null, 2)}</pre>
            )}
            <label htmlFor="amount">Amount (in Rupees):</label>
            <input
                type="number"
                id="amount"
                name="amount"
                value={paymentData.amount / 100}
                onChange={(e) => handleInputChange({ target: { name: 'amount', value: parseInt(e.target.value * 100) } })}
            />
            <br />
            <button onClick={handlePayment} disabled={loading}>
                {loading ? 'Processing...' : 'Make Payment'}
            </button>
        </div>
    );
};

export default PaymentPage;