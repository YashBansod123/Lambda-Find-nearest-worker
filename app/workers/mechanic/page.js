import { Suspense } from "react";
import WorkerPageClient from "./WorkerPageClient";

export default function MechanicWrapperPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading mechanics...</div>}>
      <WorkerPageClient profession="Mechanic" />
    </Suspense>
  );
}