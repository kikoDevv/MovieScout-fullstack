"use client";

import { ReactNode } from "react";
import { ReactLenis, useLenis } from "@studio-freight/react-lenis";

type ReactLenisChildren = React.ComponentProps<typeof ReactLenis>["children"];

export const useSmoothScroller = () => useLenis();

export default function SmoothScrolling({ children }: { children: ReactNode }) {
  return <ReactLenis root>{children as ReactLenisChildren}</ReactLenis>;
}
// sss