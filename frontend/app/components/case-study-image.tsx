"use client";

import { useState } from "react";

type CaseStudyImageProps = {
  alt: string;
  caption?: string;
  className?: string;
  fallbackLabel?: string;
  fit?: "cover" | "contain";
  aspectRatio?: string;
  imageClassName?: string;
  position?: string;
  src: string;
  title?: string;
};

export function CaseStudyImage({
  alt,
  caption,
  className = "",
  fallbackLabel = "NutriLink Hub",
  fit = "cover",
  aspectRatio,
  imageClassName = "",
  position = "center center",
  src,
  title,
}: CaseStudyImageProps) {
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`relative overflow-hidden ${className}`} style={aspectRatio ? { aspectRatio } : undefined}>
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(236,253,245,0.95),rgba(255,251,235,0.95))]" aria-hidden="true" />
      <div className="absolute -left-8 top-6 h-28 w-28 rounded-full bg-emerald-200/35 blur-3xl" aria-hidden="true" />
      <div className="absolute -right-8 bottom-2 h-24 w-24 rounded-full bg-amber-200/30 blur-3xl" aria-hidden="true" />

      {!hasError ? (
        <img
          alt={alt}
          src={src}
          className={`relative z-10 h-full w-full ${imageClassName}`}
          loading="eager"
          decoding="async"
          onError={() => setHasError(true)}
          style={{ objectFit: fit, objectPosition: position }}
        />
      ) : (
        <div className="relative z-10 flex h-full min-h-[220px] flex-col justify-between rounded-[inherit] border border-dashed border-emerald-200/70 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.12),transparent_35%),linear-gradient(180deg,rgba(255,255,255,0.92),rgba(236,253,245,0.84))] p-6">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-emerald-700">{fallbackLabel}</p>
            <h3 className="mt-3 text-lg font-semibold tracking-tight text-slate-950">{title ?? alt}</h3>
            {caption ? <p className="mt-2 max-w-sm text-sm leading-6 text-slate-600">{caption}</p> : null}
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="h-16 rounded-2xl bg-white/80 shadow-[0_8px_24px_rgba(15,23,42,0.06)]" />
            <div className="h-16 rounded-2xl bg-emerald-100/70 shadow-[0_8px_24px_rgba(15,23,42,0.06)]" />
            <div className="h-16 rounded-2xl bg-amber-100/70 shadow-[0_8px_24px_rgba(15,23,42,0.06)]" />
          </div>
        </div>
      )}
    </div>
  );
}
