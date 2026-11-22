/**
 * Original line-art illustration of refinery infrastructure:
 * distillation columns, storage tanks, pipe racks, a derrick and a
 * molecular motif echoing the SOPC logo. Pure SVG — crisp at any size.
 */
export function IndustrialIllustration({ label }: { label: string }) {
  const g = "#08784C";
  const g2 = "#159A70";
  const gold = "#D6AD43";
  return (
    <svg viewBox="0 0 560 460" role="img" aria-label={label} className="h-auto w-full">
      <defs>
        <linearGradient id="ill-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#EAF6EF" />
        </linearGradient>
        <linearGradient id="ill-metal" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="0.5" stopColor="#F3F8F5" />
          <stop offset="1" stopColor="#DCEBE3" />
        </linearGradient>
        <linearGradient id="ill-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F5E8BF" />
          <stop offset="1" stopColor="#D6AD43" />
        </linearGradient>
        <clipPath id="ill-clip">
          <path d="M40 60 Q40 20 80 20 H480 Q520 20 520 60 V400 Q520 440 480 440 H80 Q40 440 40 400 Z" />
        </clipPath>
      </defs>

      {/* card backdrop */}
      <path d="M40 60 Q40 20 80 20 H480 Q520 20 520 60 V400 Q520 440 480 440 H80 Q40 440 40 400 Z" fill="url(#ill-sky)" />
      <g clipPath="url(#ill-clip)">
        {/* sun */}
        <circle cx="408" cy="104" r="46" fill="url(#ill-gold)" opacity="0.55" />
        <circle cx="408" cy="104" r="62" fill="none" stroke={gold} strokeOpacity="0.35" strokeDasharray="3 6" />
        {/* distant hills */}
        <path d="M40 330 C120 300 190 316 260 300 C340 282 420 306 520 290 V440 H40 Z" fill="#EAF6EF" />
        <path d="M40 352 C140 334 240 348 330 334 C410 322 470 336 520 330 V440 H40 Z" fill="#DDEFE5" />

        {/* derrick */}
        <g stroke={g} strokeWidth="2" fill="none" strokeLinejoin="round">
          <path d="M96 352 L120 150 L144 352" />
          <path d="M104 290 L136 290 M110 240 L131 240 M115 195 L126 195" />
          <path d="M104 290 L131 240 L110 240 L126 195 M136 290 L110 240" strokeOpacity="0.7" />
          <path d="M112 150 H128" strokeWidth="3" />
        </g>

        {/* distillation columns */}
        <g stroke={g} strokeWidth="2">
          <rect x="176" y="150" width="34" height="202" rx="17" fill="url(#ill-metal)" />
          <rect x="222" y="190" width="28" height="162" rx="14" fill="url(#ill-metal)" />
          <rect x="262" y="120" width="40" height="232" rx="20" fill="url(#ill-metal)" />
        </g>
        <g stroke={gold} strokeWidth="2">
          <path d="M176 200 H210 M176 250 H210 M176 300 H210" />
          <path d="M222 240 H250 M222 290 H250" />
          <path d="M262 180 H302 M262 230 H302 M262 280 H302" />
        </g>
        {/* ladders / platforms */}
        <g stroke={g2} strokeWidth="1.5" fill="none">
          <path d="M302 160 H318 V352 M302 210 H318 M302 260 H318 M302 310 H318" />
          <path d="M210 175 H222 M250 220 H262" />
        </g>
        <path d="M282 120 V96" stroke={g} strokeWidth="2" />
        <circle cx="282" cy="92" r="4" fill={gold} />

        {/* storage tanks */}
        <g stroke={g} strokeWidth="2" fill="url(#ill-metal)">
          <path d="M340 352 V286 Q380 270 420 286 V352 Z" />
          <path d="M430 352 V302 Q462 290 494 302 V352 Z" />
        </g>
        <path d="M340 312 Q380 298 420 312" stroke={gold} strokeWidth="1.5" fill="none" />
        <path d="M430 324 Q462 314 494 324" stroke={gold} strokeWidth="1.5" fill="none" />

        {/* pipe rack */}
        <g stroke={g} strokeWidth="2.5" fill="none" strokeLinecap="round">
          <path d="M150 372 H510" />
          <path d="M150 384 H510" stroke={g2} />
          <path d="M150 396 H510" stroke={gold} strokeWidth="2" />
          <path d="M193 352 V372 M236 352 V372 M282 352 V372 M380 352 V372 M462 352 V372" strokeWidth="2" />
        </g>
        <g fill={g}>
          {[170, 250, 330, 410, 490].map((x) => (
            <rect key={x} x={x} y="366" width="4" height="36" rx="1" />
          ))}
        </g>
      </g>

      {/* molecular motif — echoes the logo */}
      <g stroke={g} strokeWidth="2.5" fill="none" transform="translate(436 176)">
        <path d="M0 -26 L22 -13 L22 13 L0 26 L-22 13 L-22 -13 Z" fill="#FFFFFF" />
        <path d="M22 13 L44 26 M0 -26 L0 -48" />
      </g>
      <g fill={g}>
        <circle cx="436" cy="128" r="6" />
        <circle cx="480" cy="202" r="6" />
        <circle cx="414" cy="163" r="4" fill={gold} />
      </g>

      {/* frame accents */}
      <path
        d="M40 60 Q40 20 80 20 H480 Q520 20 520 60 V400 Q520 440 480 440 H80 Q40 440 40 400 Z"
        fill="none"
        stroke={g}
        strokeOpacity="0.18"
        strokeWidth="1.5"
      />
      <path d="M70 448 H250" stroke={gold} strokeWidth="2" strokeLinecap="round" />
      <path d="M262 448 H290" stroke={g} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
