"use client";

import { useEffect } from "react";

type AdSenseUnitProps = {
  slot: string;
  className?: string;
};

const AD_CLIENT = "ca-pub-2862407789219932";

export function AdSenseUnit({ slot, className }: AdSenseUnitProps) {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // Ad blockers or policy restrictions can block initialization.
    }
  }, []);

  return <div className={className}>
    <ins
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client={AD_CLIENT}
      data-ad-slot={slot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  </div>;
}

declare global {
  interface Window {
    adsbygoogle?: Array<Record<string, unknown>>;
  }
}
