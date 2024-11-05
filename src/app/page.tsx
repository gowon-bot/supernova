"use client";

import { ErrorTable } from "@/lib/components/errors/ErrorTable";
import { Header } from "@/lib/components/Header";
import ProtectedPage from "@/lib/components/ProtectedPage";

export default function Home() {
  return (
    <ProtectedPage>
      <Header />

      <ErrorTable />
    </ProtectedPage>
  );
}
