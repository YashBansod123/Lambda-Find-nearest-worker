const handlePayment = async (plumber) => {
  // 1. Call your backend to create order
  const res = await fetch("/api/create-order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ amount: plumber.price * 100 }), // in paisa
  });
  const data = await res.json();

  const options = {
    key: "rzp_test_DK1GvIrbhWXwff", // replace with your Razorpay Key ID
    amount: data.amount,
    currency: "INR",
    name: "Lambda Services",
    description: `Booking ${plumber.name}`,
    order_id: data.id,
    handler: async function (response) {
      // 2. On success → Notify backend to verify + pay user
      await fetch("/api/payment-success", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_signature: response.razorpay_signature,
          plumberId: plumber.phone,
          amount: plumber.price,
        }),
      });

      alert("Payment Successful! 🎉");
    },
    prefill: {
      name: "Customer",
      email: "customer@example.com",
      contact: "9123456789",
    },
    theme: {
      color: "#f97316",
    },
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
};
export default handlePayment;