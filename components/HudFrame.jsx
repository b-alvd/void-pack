function Crosshair({ className }) {
  return (
    <svg className={`absolute ${className}`} width="26" height="26" viewBox="0 0 26 26"
      fill="none" stroke="currentColor" strokeWidth="1">
      <line x1="13" y1="2" x2="13" y2="24" />
      <line x1="2" y1="13" x2="24" y2="13" />
    </svg>
  );
}

function Chevrons({ dir = "down" }) {
  return (
    <svg className={dir === "up" ? "rotate-180" : ""} width="16" height="20" viewBox="0 0 16 20"
      fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3l6 5 6-5" />
      <path d="M2 11l6 5 6-5" />
    </svg>
  );
}

function SideRail({ label, side }) {
  const pos = side === "left" ? "left-5 md:left-8" : "right-5 md:right-8";
  return (
    <div className={`absolute top-1/2 -translate-y-1/2 ${pos} flex flex-col items-center gap-5 text-white/30`}>
      <Chevrons dir="down" />
      <span className="h-12 w-px bg-white/15" />
      <div className="flex flex-col items-center gap-2 text-[11px] font-medium tracking-[0.2em] text-white/40">
        {label.split("").map((c, i) => (<span key={i}>{c}</span>))}
      </div>
      <span className="h-12 w-px bg-white/15" />
      <Chevrons dir="up" />
    </div>
  );
}

export default function HudFrame() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-20">
      <div className="absolute inset-6 md:inset-10 text-white/25">
        <Crosshair className="top-0 left-0 -translate-x-1/2 -translate-y-1/2" />
        <Crosshair className="top-0 right-0 translate-x-1/2 -translate-y-1/2" />
        <Crosshair className="bottom-0 left-0 -translate-x-1/2 translate-y-1/2" />
        <Crosshair className="bottom-0 right-0 translate-x-1/2 translate-y-1/2" />
      </div>
      <SideRail label="VOID" side="left" />
      <SideRail label="PACK" side="right" />
    </div>
  );
}
