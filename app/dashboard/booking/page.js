"use client";
import { useEffect, useState } from "react";

export default function MyBookings() {
  const [orders, setOrders] = useState([]);
  const [ratingState, setRatingState] = useState({}); // { orderId: rating }

  const updateStatus = async (orderId, newStatus) => {
    const res = await fetch("/api/update-status", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId, status: newStatus }),
    });

    const data = await res.json();
    if (data.success && newStatus === "completed") {
      // Just update the status locally to show rating form
      setOrders(prev =>
        prev.map(order =>
          order._id === orderId ? { ...order, status: "completed" } : order
        )
      );
    } else {
      // remove cancelled ones
      setOrders(prev => prev.filter(order => order._id !== orderId));
    }
  };

  const submitRating = async (orderId, plumberId, rating) => {
    const res = await fetch("/api/rate-worker", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plumberId, rating }),
    });

    const data = await res.json();
    if (data.success) {
      setOrders(prev => prev.filter(order => order._id !== orderId));
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await fetch("/api/my-orders");
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📦 My Bookings</h1>

      {orders.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order, i) => (
            <div
              key={i}
              className="p-4 rounded-xl shadow bg-white dark:bg-slate-900"
            >
              <p className="font-semibold text-orange-600">
                🔧 {order.plumberId}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Amount: ₹{order.amount}
              </p>
              <p className="text-xs text-gray-400">Status: {order.status}</p>
              <p className="text-xs text-gray-400">
                Date: {new Date(order.createdAt).toLocaleString()}
              </p>

              {order.status === "paid" && (
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => updateStatus(order._id, "completed")}
                    className="bg-green-600 hover:bg-green-700 text-white px-2 py-0 rounded"
                  >
                    Mark as Completed
                  </button>
                  <button
                    onClick={() => updateStatus(order._id, "cancelled")}
                    className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded"
                  >
                    Cancel
                  </button>
                </div>
              )}

              {/* Rating UI if status is completed */}
              {order.status === "completed" && (
                <div className="mt-3">
                  <p className="text-sm">Rate this worker (1 to 5 stars):</p>
                  <select
                    value={ratingState[order._id] || ""}
                    onChange={e =>
                      setRatingState({
                        ...ratingState,
                        [order._id]: Number(e.target.value),
                      })
                    }
                    className="bg-gray-100 dark:bg-slate-800 border rounded p-1"
                  >
                    <option value="">--Select--</option>
                    {[1, 2, 3, 4, 5].map(star => (
                      <option key={star} value={star}>
                        ⭐ {star}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() =>
                      submitRating(
                        order._id,
                        order.plumberId,
                        ratingState[order._id]
                      )
                    }
                    disabled={!ratingState[order._id]}
                    className="ml-3 bg-orange-500 text-white px-3 py-1 rounded disabled:opacity-50"
                  >
                    Submit Rating
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
