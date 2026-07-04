"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/api/query-client";

type QueryProviderProps = {
  children: React.ReactNode;
};

export function QueryProvider(props: QueryProviderProps) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {props.children}
    </QueryClientProvider>
  );
}
