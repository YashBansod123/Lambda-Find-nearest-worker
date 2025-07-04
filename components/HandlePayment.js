"use client";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ❌ Don't import useRouter here
// ✅ Expect router to be passed in from the component

const handlePayment = async (plumber, router) => {
  try {
    const res = await fetch("/api/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: plumber.price * 100 }),
    });

    const data = await res.json();

    const options = {
      key: "rzp_test_DK1GvIrbhWXwff",
      amount: data.amount,
      currency: "INR",
      name: "Lambda Services",
      description: `Booking ${plumber.name}`,
      order_id: data.id,
      handler: async function (response) {
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

        toast.success("🎉 Payment Done!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        });

        // ✅ Router is now passed from the component
        setTimeout(() => {
          router.push("/dashboard/booking");
        }, 1000);
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
  } catch (err) {
    console.error("Payment error:", err);
    toast.error("❌ Payment Failed", {
      position: "top-right",
      theme: "dark",
    });
  }
};

export default handlePayment;
