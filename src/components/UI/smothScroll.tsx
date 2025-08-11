"use client";

import { useEffect, useState, createContext, useContext } from "react";
import Lenis from "lenis";

type LenisInstance = {
  raf: (time: number) => void;
  destroy: () => void;
};

const SmoothScrollerContext = createContext<LenisInstance | null>(null);

export const useSmoothScroller = () => useContext(SmoothScrollerContext);

export default function ScrollContext({ children }: { children: React.ReactNode }) {
  const [lenisRef, setLenis] = useState<LenisInstance | null>(null);

  useEffect(() => {
    const scroller = new Lenis();
    let rf: number;

    function raf(time: number) {
      scroller.raf(time);
      rf = requestAnimationFrame(raf);
    }
    rf = requestAnimationFrame(raf);
    setLenis(scroller);

    return () => {
      if (rf) {
        cancelAnimationFrame(rf);
      }
      scroller.destroy();
    };
  }, []); // Empty dependency array is correct here

  return <SmoothScrollerContext.Provider value={lenisRef}>{children}</SmoothScrollerContext.Provider>;
}
