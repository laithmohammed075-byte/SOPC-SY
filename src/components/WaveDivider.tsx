/**
 * Organic wave that closes the hero and flows into the next light section.
 * A thin emerald line (and a fainter gold echo) traces the wave's crest.
 */
export function WaveDivider({ fill = "var(--color-offwhite)", className = "" }: { fill?: string; className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-x-0 bottom-0 z-20 ${className}`}>
      <svg
        viewBox="0 0 1440 160"
        preserveAspectRatio="none"
        className="rtl-flip block h-[70px] w-full sm:h-[110px] lg:h-[150px]"
      >
        <defs>
          <linearGradient id="wave-green" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="#159A70" stopOpacity="0.2" />
            <stop offset="0.35" stopColor="#08784C" />
            <stop offset="0.8" stopColor="#159A70" />
            <stop offset="1" stopColor="#08784C" stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id="wave-gold" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="#D6AD43" stopOpacity="0" />
            <stop offset="0.5" stopColor="#D6AD43" stopOpacity="0.9" />
            <stop offset="1" stopColor="#D6AD43" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* soft translucent under-wave for depth */}
        <path
          d="M0,92 C220,40 420,30 640,70 C860,110 1060,128 1250,96 C1340,80 1400,62 1440,52 L1440,160 L0,160 Z"
          style={{ fill: "var(--color-surface)" }}
          fillOpacity="0.35"
        />
        <path
          d="M0,118 C240,62 460,58 690,92 C910,124 1100,138 1280,108 C1360,94 1410,80 1440,72 L1440,160 L0,160 Z"
          style={{ fill }}
        />
        <path
          d="M0,118 C240,62 460,58 690,92 C910,124 1100,138 1280,108 C1360,94 1410,80 1440,72"
          fill="none"
          stroke="url(#wave-green)"
          strokeWidth="3"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d="M0,106 C240,52 460,48 690,82 C910,114 1100,126 1280,96 C1360,82 1410,68 1440,60"
          fill="none"
          stroke="url(#wave-gold)"
          strokeWidth="1.25"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}
