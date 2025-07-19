"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { prefetchAllCategories } from "../tabBar/tabsApi";

interface TanstackProviderProps {
  children: React.ReactNode;
}
export const TanstackProvider = ({ children }: TanstackProviderProps) => {
  const [queryClient] = useState(() => new QueryClient());

  // Prefetch all categories when the provider is mounted
  useEffect(() => {
    // Prefetch all movie categories on first load
    prefetchAllCategories(queryClient);
    // This effect should only run once on initial mount
  }, [queryClient]);

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
