"use client";

import { PropsWithChildren } from "react";
import { ReactQueryClientProvider } from "./ReactQueryClientProvider";

export const Providers = ({ children }: PropsWithChildren) => (
  <>
    <ReactQueryClientProvider>{children}</ReactQueryClientProvider>
  </>
);
