import { Suspense } from "react";
import WorkerSearchPage from "./WorkerSearchPage";

export default function SearchPageWrapper() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading search...</div>}>
      <WorkerSearchPage />
    </Suspense>
  );
}
