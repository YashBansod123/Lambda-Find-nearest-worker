"use client";
import { useEffect, useState } from "react";

export default function MyBookings() {
  const [orders, setOrders] = useState([]);
  const updateStatus = async (orderId, newStatus) => {
  const res = await fetch("/api/update-status", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ orderId, status: newStatus }),
  });

  const data = await res.json();
  if (data.success) {
    // refetch bookings or filter out updated one
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
