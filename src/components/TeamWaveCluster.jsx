import React, { useEffect, useRef, useState } from 'react';

const STAGE_WIDTH = 1200;
const STAGE_HEIGHT = 590;

const WAVE_MEMBERS = [
  {
    id: 'valentina-gutierrez',
    name: 'Valentina Gutierrez',
    role: 'M.V.Z Gestora de alianzas',
    image: '/team/valentina-gutierrez.png',
    cx: 235,
    cy: 400,
    r: 92,
    delayMs: 140,
    floatDelay: '0s',
    floatDuration: '5.1s',
    imgClass: 'w-[94%] scale-[1.03] translate-y-[2%]'
  },
  {
    id: 'cesar-munoz',
    name: 'César Muñoz Cadavid',
    role: 'MSc, PhD. Dir. Científico',
    image: '/team/cesar-munoz.png',
    cx: 486,
    cy: 222,
    r: 122,
    delayMs: 320,
    floatDelay: '-1.3s',
    floatDuration: '5.6s',
    imgClass: 'w-[98%] scale-[1.04] translate-y-[2%]'
  },
  {
    id: 'valentina-castano',
    name: 'Valentina Castaño',
    role: 'M.V. Coord. Alianzas',
    image: '/team/valentina-castano.png',
    cx: 710,
    cy: 372,
    r: 112,
    delayMs: 520,
    floatDelay: '-2.6s',
    floatDuration: '5.3s',
    imgClass: 'w-[96%] scale-[1.02] translate-y-[3%]'
  },
  {
    id: 'diego-sanchez',
    name: 'Diego Sánchez',
    role: 'M.V. Líder de Alianzas',
    image: '/team/diego-sanchez.png',
    cx: 952,
    cy: 224,
    r: 116,
    delayMs: 720,
    floatDelay: '-3.8s',
    floatDuration: '5.5s',
    imgClass: 'w-[94%] scale-[1.02] translate-y-[2%]'
  }
];

const FLOATING_ACCENTS = [
  { kind: 'ring', x: 64, y: 492, size: 44, border: 'border-[4px] border-[#262626]', delayMs: 40, floatDelay: '-0.4s', duration: '4.9s' },
  { kind: 'dot', x: 116, y: 238, size: 58, bg: 'bg-[#6D28D9]', delayMs: 90, floatDelay: '-1.9s', duration: '5.4s' },
  { kind: 'ring', x: 274, y: 178, size: 50, border: 'border-[4px] border-[#4B5563]', delayMs: 220, floatDelay: '-3.1s', duration: '5.0s' },
  { kind: 'dot', x: 398, y: 406, size: 36, bg: 'bg-[#6D28D9]', delayMs: 360, floatDelay: '-0.9s', duration: '4.7s' },
  { kind: 'ring', x: 506, y: 500, size: 48, border: 'border-[4px] border-[#4B5563]', delayMs: 440, floatDelay: '-2.4s', duration: '5.6s' },
  { kind: 'dot', x: 684, y: 140, size: 40, bg: 'bg-[#6D28D9]', delayMs: 500, floatDelay: '-1.1s', duration: '5.2s' },
  { kind: 'dot', x: 866, y: 452, size: 58, bg: 'bg-[#6D28D9]', delayMs: 680, floatDelay: '-3.5s', duration: '5.5s' },
  { kind: 'ring', x: 966, y: 76, size: 46, border: 'border-[4px] border-[#4B5563]', delayMs: 780, floatDelay: '-2.0s', duration: '4.8s' },
  { kind: 'dot', x: 1106, y: 142, size: 62, bg: 'bg-[#6D28D9]', delayMs: 850, floatDelay: '-0.7s', duration: '5.3s' },
  { kind: 'ring', x: 1094, y: 408, size: 48, border: 'border-[4px] border-[#4B5563]', delayMs: 920, floatDelay: '-2.9s', duration: '5.1s' }
];

/**
 * Builds a smooth concave metaball bridge path connecting two circles in SVG space.
 * Anchors endpoints inside both circle interiors so connectors tuck cleanly behind circles.
 */
function buildMetaballBridge(a, b, waistRatio = 0.25) {
  const dx = b.cx - a.cx;
  const dy = b.cy - a.cy;
  const dist = Math.hypot(dx, dy) || 1;
  const ux = dx / dist;
  const uy = dy / dist;
  const nx = -uy;
  const ny = ux;

  const ax = a.cx + 0.54 * a.r * ux;
  const ay = a.cy + 0.54 * a.r * uy;
  const sa = 0.72 * a.r;

  const bx = b.cx - 0.54 * b.r * ux;
  const by = b.cy - 0.54 * b.r * uy;
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
  { path: buildMetaballBridge(WAVE_MEMBERS[0], WAVE_MEMBERS[1]), delayMs: 220 },
  { path: buildMetaballBridge(WAVE_MEMBERS[1], WAVE_MEMBERS[2]), delayMs: 420 },
  { path: buildMetaballBridge(WAVE_MEMBERS[2], WAVE_MEMBERS[3]), delayMs: 620 }
];

function MemberCirclePortrait({ member, showBackdrop = true }) {
  return (
    <div className="relative w-full aspect-square select-none">
      {/* On mobile standalone circles, render backdrop directly; on desktop SVG molecule draws unified backdrop */}
      {showBackdrop && (
        <div className="absolute inset-0 rounded-full bg-[#320389] shadow-[0_18px_40px_rgba(43,1,124,0.22)]" />
      )}
      {/* Portrait container: head rises naturally above top rim, lower torso clipped along bottom semicircle arc */}
      <div
        className="absolute inset-x-0 bottom-0 overflow-hidden rounded-b-full pointer-events-none flex justify-center items-start"
        style={{ top: '-18%' }}
      >
        <img
          src={member.image}
          alt={`${member.name} - ${member.role}`}
          loading="lazy"
          className={`h-full object-cover object-top drop-shadow-[0_6px_14px_rgba(0,0,0,0.18)] ${member.imgClass}`}
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
      { threshold: 0.14, rootMargin: '0px 0px -30px 0px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Equipo directivo y de alianzas OSD"
      className="w-full bg-white py-12 sm:py-16 md:py-20 px-2 sm:px-6 overflow-hidden border-b border-gray-100"
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Desktop & Tablet Landscape Proportional Wave Stage */}
        <div
          className="hidden md:block relative w-full select-none"
          style={{ aspectRatio: `${STAGE_WIDTH} / ${STAGE_HEIGHT}` }}
        >
          {/* Floating Solid Purple Dots & Gray Hollow Rings (Independent Multi-Axis Motion) */}
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
                  : 'translate3d(-42px, 32px, 0) scale(0.75)',
                transition: 'opacity 700ms ease-out, transform 850ms cubic-bezier(0.22, 1, 0.36, 1)',
                transitionDelay: `${accent.delayMs}ms`
              }}
            >
              <div
                className={`w-full aspect-square rounded-full ${
                  idx % 2 === 0 ? 'animate-wave-float' : 'animate-wave-float-alt'
                } ${accent.kind === 'dot' ? `${accent.bg} shadow-sm` : accent.border}`}
                style={{
                  animationDelay: accent.floatDelay,
                  animationDuration: accent.duration
                }}
              />
            </div>
          ))}

          {/* Cohesive Connected Molecule (Unified SVG Circles + Bridges + Locked Portraits) */}
          <div className="absolute inset-0 animate-wave-float-gentle">
            {/* Single Unified SVG: subtle lighter purple (#4B259A) connectors behind dark purple (#320389) circles */}
            <svg
              viewBox={`0 0 ${STAGE_WIDTH} ${STAGE_HEIGHT}`}
              className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible"
              style={{ filter: 'drop-shadow(0 14px 28px rgba(43, 1, 124, 0.22))' }}
              aria-hidden="true"
            >
              <g fill="#4B259A">
                {METABALL_BRIDGES.map((bridge, idx) => (
                  <path
                    key={`bridge-${idx}`}
                    d={bridge.path}
                    style={{
                      opacity: hasEntered ? 1 : 0,
                      transform: hasEntered
                        ? 'translate3d(0, 0, 0)'
                        : 'translate3d(-36px, 24px, 0)',
                      transition: 'opacity 700ms ease-out, transform 850ms cubic-bezier(0.22, 1, 0.36, 1)',
                      transitionDelay: `${bridge.delayMs}ms`
                    }}
                  />
                ))}
              </g>
              <g fill="#320389">
                {WAVE_MEMBERS.map((member) => (
                  <circle
                    key={`circle-${member.id}`}
                    cx={member.cx}
                    cy={member.cy}
                    r={member.r}
                    style={{
                      opacity: hasEntered ? 1 : 0,
                      transform: hasEntered
                        ? 'translate3d(0, 0, 0)'
                        : 'translate3d(-36px, 24px, 0)',
                      transition: 'opacity 700ms ease-out, transform 850ms cubic-bezier(0.22, 1, 0.36, 1)',
                      transitionDelay: `${member.delayMs}ms`
                    }}
                  />
                ))}
              </g>
            </svg>

            {/* 4 Team Member Portraits & Captions aligned pixel-perfect over the unified SVG circles */}
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
                      ? 'translate3d(0, 0, 0)'
                      : 'translate3d(-36px, 24px, 0)',
                    transition: 'opacity 700ms ease-out, transform 850ms cubic-bezier(0.22, 1, 0.36, 1)',
                    transitionDelay: `${member.delayMs}ms`
                  }}
                >
                  <MemberCirclePortrait member={member} showBackdrop={false} />

                  {/* Member Caption directly beneath each circle */}
                  <div className="mt-3.5 sm:mt-4 px-1 whitespace-nowrap">
                    <h3 className="text-[13px] lg:text-[15px] font-bold text-[#1F2937] leading-tight">
                      {member.name}
                    </h3>
                    <p className="text-[11.5px] lg:text-[13.5px] font-semibold text-[#374151] leading-snug mt-0.5">
                      {member.role}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile Wavy Staggered Layout (< md) */}
        <div className="md:hidden relative py-6 px-2">
          {/* Decorative Floating Accents on Mobile */}
          <div className="w-7 h-7 rounded-full bg-[#6D28D9] absolute top-2 left-2 animate-wave-float pointer-events-none" />
          <div className="w-6 h-6 rounded-full border-[3px] border-[#4B5563] absolute top-4 right-4 animate-wave-float-alt pointer-events-none" style={{ animationDelay: '-1.4s' }} />
          <div className="w-6 h-6 rounded-full border-[3px] border-[#262626] absolute bottom-6 left-4 animate-wave-float-alt pointer-events-none" style={{ animationDelay: '-2.2s' }} />
          <div className="w-8 h-8 rounded-full bg-[#6D28D9] absolute bottom-3 right-3 animate-wave-float pointer-events-none" style={{ animationDelay: '-0.9s' }} />

          <div className="grid grid-cols-2 gap-x-5 gap-y-12 items-start relative z-10">
            {WAVE_MEMBERS.map((member, idx) => {
              const isLowered = idx % 2 === 0;
              return (
                <div
                  key={member.id}
                  className={`flex flex-col items-center text-center ${isLowered ? 'mt-10' : ''}`}
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
                    className="w-36 sm:w-44 max-w-full animate-wave-float-gentle"
                    style={{
                      animationDelay: member.floatDelay,
                      animationDuration: member.floatDuration
                    }}
                  >
                    <MemberCirclePortrait member={member} />
                  </div>
                  <div className="mt-3.5">
                    <h3 className="text-sm sm:text-base font-bold text-[#1F2937] leading-tight">
                      {member.name}
                    </h3>
                    <p className="text-xs sm:text-sm font-medium text-[#374151] leading-snug mt-0.5">
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
