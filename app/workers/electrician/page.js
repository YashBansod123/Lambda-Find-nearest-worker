import { Suspense } from "react";
import ElectricianPage from "./ElectricianPageClient";

export default function ElectricianWrapperPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading electricians...</div>}>
      <ElectricianPage />
    </Suspense>
  );
}
