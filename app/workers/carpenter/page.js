import { Suspense } from "react";
import WorkerPageClient from "./WorkerPageClient";

export default function CarpenterWrapperPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading carpenters...</div>}>
      <WorkerPageClient profession="Carpenter" />
    </Suspense>
  );
}