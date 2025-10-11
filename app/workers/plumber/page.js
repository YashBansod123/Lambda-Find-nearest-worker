import { Suspense } from "react";
import PlumberPageClient from "./PlumberPageClient";

export default function PlumberWrapperPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading plumbers...</div>}>
      <PlumberPageClient />
    </Suspense>
  );
}
