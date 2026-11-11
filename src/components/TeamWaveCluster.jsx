import React, { useEffect, useRef, useState } from 'react';

const STAGE_WIDTH = 1200;
const STAGE_HEIGHT = 540;

const WAVE_MEMBERS = [
  {
    id: 'valentina-gutierrez',
    name: 'Valentina Gutierrez',
    role: 'M.V.Z Gestora de alianzas',
    image:
      'https://res.cloudinary.com/oiaig120/image/upload/e_background_removal,w_440,f_auto,q_auto/osdiagnostic/staff-valentina.png',
    cx: 248,
    cy: 368,
    r: 78,
    delayMs: 140,
    floatDelay: '0s',
    floatDuration: '5.1s',
    imgClass: 'w-[86%] translate-y-[4%]'
  },
  {
    id: 'cesar-munoz',
    name: 'César Muñoz Cadavid',
    role: 'MSc, PhD. Dir. Científico',
    image:
      'https://res.cloudinary.com/oiaig120/image/upload/c_crop,w_0.78,h_0.96,g_south_west/e_background_removal,w_480,f_auto,q_auto/osdiagnostic/Laboratorio-para-veterinarias-en-Cali.png',
    cx: 488,
    cy: 212,
    r: 104,
    delayMs: 320,
    floatDelay: '-1.3s',
    floatDuration: '5.6s',
    imgClass: 'w-[88%] translate-y-[5%]'
  },
  {
    id: 'valentina-castano',
    name: 'Valentina Castaño',
    role: 'M.V. Coord. Alianzas',
    image:
      'https://res.cloudinary.com/oiaig120/image/upload/w_460,f_auto,q_auto/v1793205178/osdiagnostic/staff-valentina-castano.png',
    cx: 694,
    cy: 344,
    r: 98,
    delayMs: 520,
    floatDelay: '-2.6s',
    floatDuration: '5.3s',
    imgClass: 'w-[96%] translate-y-[2%]'
  },
  {
    id: 'diego-sanchez',
    name: 'Diego Sánchez',
    role: 'M.V. Líder de Alianzas',
    image:
      'https://res.cloudinary.com/oiaig120/image/upload/w_460,f_auto,q_auto/osdiagnostic/staff-diego.png',
    cx: 932,
    cy: 214,
    r: 100,
    delayMs: 720,
    floatDelay: '-3.8s',
    floatDuration: '5.5s',
    imgClass: 'w-[88%] translate-y-[6%]'
  }
];

const FLOATING_ACCENTS = [
  { kind: 'ring', x: 74, y: 452, size: 38, border: 'border-[4px] border-[#2D2D2D]', delayMs: 40, floatDelay: '-0.4s', duration: '4.9s' },
  { kind: 'dot', x: 132, y: 226, size: 52, bg: 'bg-[#6D28D9]', delayMs: 90, floatDelay: '-1.9s', duration: '5.4s' },
  { kind: 'ring', x: 286, y: 174, size: 46, border: 'border-[4px] border-[#4B5563]', delayMs: 220, floatDelay: '-3.1s', duration: '5.0s' },
  { kind: 'dot', x: 406, y: 374, size: 32, bg: 'bg-[#6D28D9]', delayMs: 360, floatDelay: '-0.9s', duration: '4.7s' },
  { kind: 'ring', x: 510, y: 458, size: 44, border: 'border-[4px] border-[#4B5563]', delayMs: 440, floatDelay: '-2.4s', duration: '5.6s' },
  { kind: 'dot', x: 672, y: 138, size: 36, bg: 'bg-[#6D28D9]', delayMs: 500, floatDelay: '-1.1s', duration: '5.2s' },
  { kind: 'dot', x: 846, y: 416, size: 52, bg: 'bg-[#6D28D9]', delayMs: 680, floatDelay: '-3.5s', duration: '5.5s' },
  { kind: 'ring', x: 942, y: 82, size: 42, border: 'border-[4px] border-[#4B5563]', delayMs: 780, floatDelay: '-2.0s', duration: '4.8s' },
  { kind: 'dot', x: 1064, y: 136, size: 54, bg: 'bg-[#6D28D9]', delayMs: 850, floatDelay: '-0.7s', duration: '5.3s' },
  { kind: 'ring', x: 1048, y: 380, size: 44, border: 'border-[4px] border-[#4B5563]', delayMs: 920, floatDelay: '-2.9s', duration: '5.1s' }
];

/**
 * Builds a smooth concave metaball bridge path connecting two circles in SVG space.
 * Anchors endpoints inside both circle interiors so gentle vertical floating never leaves a gap.
 */
function buildMetaballBridge(a, b, waistRatio = 0.24) {
  const dx = b.cx - a.cx;
  const dy = b.cy - a.cy;
  const dist = Math.hypot(dx, dy) || 1;
  const ux = dx / dist;
  const uy = dy / dist;
  const nx = -uy;
  const ny = ux;

  const ax = a.cx + 0.56 * a.r * ux;
  const ay = a.cy + 0.56 * a.r * uy;
  const sa = 0.72 * a.r;

  const bx = b.cx - 0.56 * b.r * ux;
  const by = b.cy - 0.56 * b.r * uy;
  const sb = 0.72 * b.r;

  const p1a = `${(ax + sa * nx).toFixed(1)},${(ay + sa * ny).toFixed(1)}`;
  const p1b = `${(ax - sa * nx).toFixed(1)},${(ay - sa * ny).toFixed(1)}`;
  const p2a = `${(bx + sb * nx).toFixed(1)},${(by + sb * ny).toFixed(1)}`;
  const p2b = `${(bx - sb * nx).toFixed(1)},${(by - sb * ny).toFixed(1)}`;

  const rim1x = a.cx + a.r * ux;
  const rim1y = a.cy + a.r * uy;
  const rim2x = b.cx - b.r * ux;
  const rim2y = b.cy - b.r * uy;
  const midX = (rim1x + rim2x) / 2;
  const midY = (rim1y + rim2y) / 2;
  const wMid = Math.min(a.r, b.r) * waistRatio;
  const handleDist = dist * 0.14;

  const cp1a = `${(midX - ux * handleDist + nx * wMid * 0.55).toFixed(1)},${(midY - uy * handleDist + ny * wMid * 0.55).toFixed(1)}`;
  const cp2a = `${(midX + ux * handleDist + nx * wMid * 0.55).toFixed(1)},${(midY + uy * handleDist + ny * wMid * 0.55).toFixed(1)}`;
  const cp2b = `${(midX + ux * handleDist - nx * wMid * 0.55).toFixed(1)},${(midY + uy * handleDist - ny * wMid * 0.55).toFixed(1)}`;
  const cp1b = `${(midX - ux * handleDist - nx * wMid * 0.55).toFixed(1)},${(midY - uy * handleDist - ny * wMid * 0.55).toFixed(1)}`;

  return `M ${p1a} C ${cp1a} ${cp2a} ${p2a} L ${p2b} C ${cp2b} ${cp1b} ${p1b} Z`;
}

const METABALL_BRIDGES = [
  { path: buildMetaballBridge(WAVE_MEMBERS[0], WAVE_MEMBERS[1]), delayMs: 240 },
  { path: buildMetaballBridge(WAVE_MEMBERS[1], WAVE_MEMBERS[2]), delayMs: 440 },
  { path: buildMetaballBridge(WAVE_MEMBERS[2], WAVE_MEMBERS[3]), delayMs: 640 }
];

function MemberCirclePortrait({ member }) {
  return (
    <div className="relative w-full aspect-square select-none">
      {/* Filled deep royal purple backdrop */}
      <div className="absolute inset-0 rounded-full bg-[#320389] shadow-[0_14px_34px_rgba(43,1,124,0.22)]" />
      {/* Portrait container: head extends gracefully above top edge, clipped cleanly along bottom arc */}
      <div
        className="absolute inset-x-0 bottom-0 overflow-hidden rounded-b-full pointer-events-none flex items-end justify-center"
        style={{ top: '-22%' }}
      >
        <img
          src={member.image}
          alt={`${member.name} - ${member.role}`}
          loading="lazy"
          className={`h-auto max-h-[118%] object-contain object-bottom drop-shadow-[0_6px_12px_rgba(0,0,0,0.18)] ${member.imgClass}`}
        />
      </div>
    </div>
  );
}

export default function TeamWaveCluster() {
  const sectionRef = useRef(null);
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') {
      setHasEntered(true);
      return;
    }

    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setHasEntered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.16, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Equipo directivo y de alianzas OSD"
      className="w-full bg-white py-10 sm:py-14 md:py-16 px-4 sm:px-6 overflow-hidden border-b border-gray-100"
    >
      <div className="max-w-[1220px] mx-auto">
        {/* Desktop & Tablet Landscape Proportional Wave Stage */}
        <div
          className="hidden md:block relative w-full select-none"
          style={{ aspectRatio: `${STAGE_WIDTH} / ${STAGE_HEIGHT}` }}
        >
          {/* Connecting Organic Metaball Bridges SVG Layer */}
          <svg
            viewBox={`0 0 ${STAGE_WIDTH} ${STAGE_HEIGHT}`}
            className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible"
            aria-hidden="true"
          >
            {METABALL_BRIDGES.map((bridge, idx) => (
              <path
                key={idx}
                d={bridge.path}
                fill="#320389"
                style={{
                  opacity: hasEntered ? 1 : 0,
                  transform: hasEntered ? 'translate3d(0, 0, 0) scale(1)' : 'translate3d(-36px, 24px, 0) scale(0.9)',
                  transformBox: 'fill-box',
                  transformOrigin: 'center',
                  transition: 'opacity 700ms ease-out, transform 850ms cubic-bezier(0.22, 1, 0.36, 1)',
                  transitionDelay: `${bridge.delayMs}ms`
                }}
              />
            ))}
          </svg>

          {/* Floating Solid Purple Dots & Gray Hollow Rings */}
          {FLOATING_ACCENTS.map((accent, idx) => (
            <div
              key={idx}
              className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10"
              style={{
                left: `${(accent.x / STAGE_WIDTH) * 100}%`,
                top: `${(accent.y / STAGE_HEIGHT) * 100}%`,
                width: `${(accent.size / STAGE_WIDTH) * 100}%`,
                aspectRatio: '1 / 1',
                opacity: hasEntered ? 1 : 0,
                transform: hasEntered
                  ? 'translate3d(0, 0, 0) scale(1)'
                  : 'translate3d(-38px, 28px, 0) scale(0.75)',
                transition: 'opacity 700ms ease-out, transform 850ms cubic-bezier(0.22, 1, 0.36, 1)',
                transitionDelay: `${accent.delayMs}ms`
              }}
            >
              <div
                className={`w-full h-full rounded-full animate-wave-float ${
                  accent.kind === 'dot' ? `${accent.bg} shadow-sm` : accent.border
                }`}
                style={{
                  animationDelay: accent.floatDelay,
                  animationDuration: accent.duration
                }}
              />
            </div>
          ))}

          {/* 4 Team Member Circles with Left-to-Right Scroll Wave + Continuous Float */}
          {WAVE_MEMBERS.map((member) => {
            const widthPct = ((member.r * 2) / STAGE_WIDTH) * 100;
            return (
              <div
                key={member.id}
                className="absolute -translate-x-1/2 z-20 flex flex-col items-center text-center"
                style={{
                  left: `${(member.cx / STAGE_WIDTH) * 100}%`,
                  top: `${((member.cy - member.r) / STAGE_HEIGHT) * 100}%`,
                  width: `${widthPct}%`,
                  opacity: hasEntered ? 1 : 0,
                  transform: hasEntered
                    ? 'translate3d(0, 0, 0) scale(1)'
                    : 'translate3d(-48px, 36px, 0) scale(0.86)',
                  transition: 'opacity 750ms ease-out, transform 900ms cubic-bezier(0.22, 1, 0.36, 1)',
                  transitionDelay: `${member.delayMs}ms`
                }}
              >
                <div
                  className="w-full animate-wave-float-gentle"
                  style={{
                    animationDelay: member.floatDelay,
                    animationDuration: member.floatDuration
                  }}
                >
                  <MemberCirclePortrait member={member} />
                </div>

                {/* Member Caption directly beneath each circle */}
                <div className="mt-3 sm:mt-3.5 px-1 whitespace-nowrap">
                  <h3 className="text-[12px] lg:text-[13.5px] font-bold text-[#1F2937] leading-tight">
                    {member.name}
                  </h3>
                  <p className="text-[11px] lg:text-[12.5px] font-semibold text-[#374151] leading-snug mt-0.5">
                    {member.role}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile Wavy Staggered Layout (< md) */}
        <div className="md:hidden relative py-4">
          <div className="grid grid-cols-2 gap-x-5 gap-y-10 items-start">
            {WAVE_MEMBERS.map((member, idx) => {
              const isLowered = idx % 2 === 0;
              return (
                <div
                  key={member.id}
                  className={`flex flex-col items-center text-center ${isLowered ? 'mt-8' : ''}`}
                  style={{
                    opacity: hasEntered ? 1 : 0,
                    transform: hasEntered
                      ? 'translate3d(0, 0, 0) scale(1)'
                      : 'translate3d(-28px, 28px, 0) scale(0.88)',
                    transition: 'opacity 700ms ease-out, transform 800ms cubic-bezier(0.22, 1, 0.36, 1)',
                    transitionDelay: `${idx * 150}ms`
                  }}
                >
                  <div
                    className="w-32 xs:w-36 max-w-full animate-wave-float-gentle"
                    style={{
                      animationDelay: member.floatDelay,
                      animationDuration: member.floatDuration
                    }}
                  >
                    <MemberCirclePortrait member={member} />
                  </div>
                  <div className="mt-3">
                    <h3 className="text-xs sm:text-sm font-bold text-[#1F2937] leading-tight">
                      {member.name}
                    </h3>
                    <p className="text-[11px] sm:text-xs font-medium text-[#374151] leading-snug mt-0.5">
                      {member.role}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
