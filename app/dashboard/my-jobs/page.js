"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState, useMemo } from "react";
import LoadingPage from "@/components/LoadingPage"; // Assuming you have this
import { Button } from "@/components/ui/button"; // <-- ADD THIS LINE
import Link from "next/link";

export default function WorkerJobsPage() {
  const { data: session, status } = useSession({
    required: true, // Automatically redirects if not logged in
    onUnauthenticated() {
      // Optional: Redirect to login or show message
      router.push('/login');
    }
  });
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch orders when the component mounts and session is available
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await fetch("/api/worker-orders");
        if (!res.ok) {
          throw new Error('Failed to fetch your jobs.');
        }
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error("Fetch worker orders error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (status === "authenticated") {
      fetchOrders();
    }
  }, [status]); // Re-run if auth status changes

  // Categorize orders using useMemo for efficiency
  const categorizedOrders = useMemo(() => {
    const incoming = orders.filter(order => order.status === 'paid');
    const completed = orders.filter(order => order.status === 'completed');
    const cancelled = orders.filter(order => order.status === 'cancelled');
    return { incoming, completed, cancelled };
  }, [orders]);

  // --- Optional: Functionality to update status (like Mark as Complete) ---
  // You would need another API route (/api/update-worker-order-status)
  // This API MUST verify the order belongs to the logged-in worker before updating.
  const handleUpdateStatus = async (orderId, newStatus) => {
      alert(`Functionality to update order ${orderId} to ${newStatus} needs to be built!`);
      // Example (needs backend API):
      // const res = await fetch('/api/update-worker-order-status', {
      //     method: 'POST',
      //     headers: { 'Content-Type': 'application/json' },
      //     body: JSON.stringify({ orderId, status: newStatus }),
      // });
      // if (res.ok) {
      //     // Re-fetch or update state locally
      //     setOrders(prev => prev.map(o => o._id === orderId ? {...o, status: newStatus} : o));
      // } else {
      //     alert('Failed to update status.');
      // }
  };


  if (status === "loading" || loading) {
    return <LoadingPage message="Loading your jobs..." />;
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-6">My Jobs</h1>

      {/* Section 1: Incoming Jobs */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 border-b pb-2">🚀 Incoming Jobs ({categorizedOrders.incoming.length})</h2>
        {categorizedOrders.incoming.length === 0 ? (
          <p className="text-gray-500">No new jobs right now.</p>
        ) : (
          <div className="space-y-4">
            {categorizedOrders.incoming.map(order => (
              <div key={order._id} className="p-4 border rounded-lg shadow-sm bg-blue-50 dark:bg-slate-800">
                <p><strong>Order ID:</strong> {order._id}</p>
                <p><strong>Amount:</strong> ₹{order.amount}</p>
                {/* TODO: Add Customer Name/Info if needed by populating userEmail on the backend */}
                <p><strong>Status:</strong> <span className="font-semibold text-blue-600">{order.status}</span></p>
                <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
                {/* Optional Buttons for Worker Actions */}
                 <div className="mt-3 flex gap-2">
                     <Button
                       size="sm"
                       variant="outline"
                       onClick={() => handleUpdateStatus(order._id, 'completed')}
                       className="bg-green-500 hover:bg-green-600 text-white"
                     >
                        Mark as Complete
                     </Button>
                     {/* Add other actions like 'Cancel' if applicable */}
                 </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Section 2: Completed Jobs */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 border-b pb-2">✅ Completed Jobs ({categorizedOrders.completed.length})</h2>
        {categorizedOrders.completed.length === 0 ? (
          <p className="text-gray-500">No completed jobs yet.</p>
        ) : (
          <div className="space-y-4">
            {categorizedOrders.completed.map(order => (
              <div key={order._id} className="p-4 border rounded-lg shadow-sm bg-green-50 dark:bg-slate-700 opacity-70">
                <p><strong>Order ID:</strong> {order._id}</p>
                <p><strong>Amount:</strong> ₹{order.amount}</p>
                <p><strong>Status:</strong> <span className="font-semibold text-green-700">{order.status}</span></p>
                <p><strong>Date Completed:</strong> {new Date(order.updatedAt || order.createdAt).toLocaleString()}</p>
                 {/* Maybe link to review if you add reviews */}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Section 3: Cancelled Jobs */}
       <section>
        <h2 className="text-2xl font-semibold mb-4 border-b pb-2">❌ Cancelled Jobs ({categorizedOrders.cancelled.length})</h2>
        {categorizedOrders.cancelled.length === 0 ? (
          <p className="text-gray-500">No cancelled jobs.</p>
        ) : (
          <div className="space-y-4">
            {categorizedOrders.cancelled.map(order => (
              <div key={order._id} className="p-4 border rounded-lg shadow-sm bg-red-50 dark:bg-slate-700 opacity-50">
                <p><strong>Order ID:</strong> {order._id}</p>
                <p><strong>Amount:</strong> ₹{order.amount}</p>
                <p><strong>Status:</strong> <span className="font-semibold text-red-600">{order.status}</span></p>
                <p><strong>Date Cancelled:</strong> {new Date(order.updatedAt || order.createdAt).toLocaleString()}</p>
              </div>
            ))}
          </div>
        )}
      </section>

    </div>
  );
}



