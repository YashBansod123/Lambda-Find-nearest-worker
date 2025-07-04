import { Suspense } from "react";
import PainterPage from "./PainterPageClient";

export default function PainterWrapperPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading painters...</div>}>
      <PainterPage />
    </Suspense>
  );
}
