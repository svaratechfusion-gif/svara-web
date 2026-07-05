import Image from "next/image";
import type { CSSProperties } from "react";
import { Layers, Zap, Boxes, Bot } from "lucide-react";

const DIFFERENTIATORS = [
  { name: "Unified Intelligence", tagline: "Single source of truth", icon: Layers },
  { name: "Real-Time Decisioning", tagline: "Signals into instant action", icon: Zap },
  { name: "Predictive Simulation", tagline: "Simulate before you execute", icon: Boxes },
  { name: "Autonomous Orchestration", tagline: "Workflows run themselves", icon: Bot },
];

// Two separate semicircular arcs, not one 360° orbit — left (chaos) assets
// only occupy the left hemisphere (120°-240°), right (intelligence) assets
// only occupy the right hemisphere (-60°-60°). x = r*cos(angle), y grows
// downward in CSS so sin is negated to keep positive angles pointing up.
//
// Two size tiers, not one fixed pixel set — the 1450px box only fits inside
// its own viewport starting around 1280px wide (Tailwind's xl:). Below that,
// down to 1024px (lg:) where the mobile grid fallback takes over, the box
// would overflow the actual screen. COMPACT scales every value by the same
// factor (380/600 ≈ 0.633) as FULL, so the tightest pair's clearance ratio
// (~0.3192 * radius) is preserved and it stays overlap-free by construction,
// not by re-deriving the geometry from scratch.
const FULL = { radius: 600, wrapper: 185, box: 1450, core: 340, coreHeight: 227 };
const COMPACT = { radius: 380, wrapper: 115, box: 920, core: 215, coreHeight: 143 };

function polarStyle(angleDeg: number, radius: number): CSSProperties {
  const rad = (angleDeg * Math.PI) / 180;
  const x = Math.round(radius * Math.cos(rad));
  const y = Math.round(-radius * Math.sin(rad));
  return {
    left: "50%",
    top: "50%",
    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
  };
}

const LEFT_ANGLES = [120, 145, 170, 190, 215, 240];
const LEFT_ASSETS = [
  { src: "cctv_system", alt: "CCTV", folder: "core/input-chaos" },
  { src: "erp_dashboard", alt: "ERP", folder: "core/input-chaos" },
  { src: "warning_system", alt: "Warning Alerts", folder: "core/input-chaos" },
  { src: "drone_system", alt: "Drone", folder: "core/input-chaos" },
  { src: "crm_dashboard", alt: "CRM", folder: "core/input-chaos" },
  { src: "iot_sensors", alt: "IoT", folder: "core/input-chaos" },
].map((item, i) => ({ ...item, angle: LEFT_ANGLES[i] }));

const RIGHT_ANGLES = [-60, -35, -10, 10, 35, 60];
const RIGHT_ASSETS = [
  { src: "unified_dashboard", alt: "Unified Dashboard", folder: "intelligence-layer" },
  { src: "predictive_analytics", alt: "Predictive Analytics", folder: "intelligence-layer" },
  { src: "ai_insights", alt: "AI Insights", folder: "intelligence-layer" },
  { src: "smart_workflows", alt: "Smart Workflows", folder: "intelligence-layer" },
  { src: "automation_engine", alt: "Automation", folder: "intelligence-layer" },
  { src: "real_time_monitoring", alt: "Real-time Monitoring", folder: "intelligence-layer" },
].map((item, i) => ({ ...item, angle: RIGHT_ANGLES[i] }));

type Point = [number, number];

function polarPoint(angleDeg: number, radius: number): Point {
  const rad = (angleDeg * Math.PI) / 180;
  return [radius * Math.cos(rad), -radius * Math.sin(rad)];
}

// Perpendicular (tangent) direction at this angle — used to bow each line's
// control point off the straight radial line, so curves don't run straight
// through the core and don't look like flat horizontal spokes.
function tangentUnit(angleDeg: number): Point {
  const rad = (angleDeg * Math.PI) / 180;
  return [-Math.sin(rad), -Math.cos(rad)];
}

function connectorPath(
  angleDeg: number,
  imageEdgeRadius: number,
  coreRadius: number,
  curveOffset: number,
  direction: "toCore" | "fromCore"
) {
  const imagePoint = polarPoint(angleDeg, imageEdgeRadius);
  const corePoint = polarPoint(angleDeg, coreRadius);
  const [start, end] = direction === "toCore" ? [imagePoint, corePoint] : [corePoint, imagePoint];
  const [tx, ty] = tangentUnit(angleDeg);
  const midX = (start[0] + end[0]) / 2 + tx * curveOffset;
  const midY = (start[1] + end[1]) / 2 + ty * curveOffset;
  return `M ${start[0].toFixed(1)} ${start[1].toFixed(1)} Q ${midX.toFixed(1)} ${midY.toFixed(1)} ${end[0].toFixed(1)} ${end[1].toFixed(1)}`;
}

function ConnectorLines({ tier }: { tier: typeof FULL }) {
  // Line starts at each image wrapper's inner edge (closest to core), ends at
  // the core's visible boundary — using coreHeight (the smaller core
  // dimension) as the radius keeps every endpoint inside the core artwork
  // rather than overshooting past its rectangular bounds.
  const imageEdgeRadius = tier.radius - tier.wrapper / 2;
  const coreRadius = tier.coreHeight / 2;
  const curveOffset = tier.radius * 0.12;
  const half = tier.box / 2;
  const redFilterId = `connector-glow-red-${tier.box}`;
  const blueFilterId = `connector-glow-blue-${tier.box}`;

  return (
    <svg
      className="absolute left-0 top-0 z-0"
      width={tier.box}
      height={tier.box}
      viewBox={`${-half} ${-half} ${tier.box} ${tier.box}`}
      style={{ pointerEvents: "none" }}
    >
      <defs>
        <filter id={redFilterId} x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id={blueFilterId} x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {LEFT_ASSETS.map((item, i) => {
        const d = connectorPath(item.angle, imageEdgeRadius, coreRadius, curveOffset, "toCore");
        return (
          <g key={item.src}>
            <path d={d} stroke="#ff4d4d" strokeWidth={3} fill="none" opacity={0.5} filter={`url(#${redFilterId})`} />
            <circle r={4} fill="#ff4d4d" opacity={0.9}>
              <animateMotion dur="4.5s" begin={`${i * 0.7}s`} repeatCount="indefinite" path={d} />
            </circle>
          </g>
        );
      })}

      {RIGHT_ASSETS.map((item, i) => {
        const d = connectorPath(item.angle, imageEdgeRadius, coreRadius, curveOffset, "fromCore");
        return (
          <g key={item.src}>
            <path d={d} stroke="#3b82f6" strokeWidth={3} fill="none" opacity={0.5} filter={`url(#${blueFilterId})`} />
            <circle r={4} fill="#3b82f6" opacity={0.9}>
              <animateMotion dur="4.5s" begin={`${i * 0.7}s`} repeatCount="indefinite" path={d} />
            </circle>
          </g>
        );
      })}
    </svg>
  );
}

function SolutionAsset({
  folder,
  src,
  alt,
  angle,
  radius,
  wrapperSize,
}: {
  folder: string;
  src: string;
  alt: string;
  angle: number;
  radius: number;
  wrapperSize: number;
}) {
  return (
    <div
      className="absolute z-10 flex items-center justify-center"
      style={{ width: wrapperSize, height: wrapperSize, ...polarStyle(angle, radius) }}
    >
      <Image
        src={`/images/solution-section/${folder}/${src}.png`}
        alt={alt}
        fill
        sizes={`${wrapperSize}px`}
        className="object-contain"
      />
    </div>
  );
}

function OrbitComposition({ tier }: { tier: typeof FULL }) {
  return (
    <div
      className="relative mx-auto"
      style={{ width: tier.box, height: tier.box, overflow: "visible" }}
    >
      <ConnectorLines tier={tier} />

      {LEFT_ASSETS.map((item) => (
        <SolutionAsset key={item.src} radius={tier.radius} wrapperSize={tier.wrapper} {...item} />
      ))}

      {RIGHT_ASSETS.map((item) => (
        <SolutionAsset key={item.src} radius={tier.radius} wrapperSize={tier.wrapper} {...item} />
      ))}

      <Image
        src="/images/solution-section/core/svara_core.png"
        alt="SVARA Core"
        width={tier.core}
        height={tier.coreHeight}
        priority
        className="absolute z-20 object-contain"
        style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}
      />
    </div>
  );
}

export default function WhySvaraContent() {
  return (
    <div className="relative z-10">
      <div className="mb-6 text-center">
        <h2
          className="text-cinematic-heading"
          style={{ color: "#1D2E6D" }}
        >
          One Ecosystem.
          <br />
          Infinite Intelligence.
        </h2>

        <p
          className="text-cinematic-body mx-auto mt-6 max-w-6xl leading-[1.35]"
          style={{ color: "#5D8FBE" }}
        >
          SVARA transforms fragmented enterprise systems into a unified
          intelligence ecosystem—connecting data, AI, automation, simulation,
          and action in real time.
        </p>
      </div>

      {/* Compact orbit — lg to xl (1024-1279px). Full 1450px box would overflow
          a viewport this narrow, so this tier is the same geometry scaled down
          by the same factor throughout (radius, wrapper, box, core all ×0.633),
          which preserves the overlap-free clearance ratio automatically. */}
      <div className="mt-10 hidden min-h-[960px] lg:block xl:hidden" style={{ overflow: "visible" }}>
        <OrbitComposition tier={COMPACT} />
      </div>

      {/* Full orbit — xl and up (1280px+). */}
      <div className="mt-10 hidden min-h-[1500px] xl:block" style={{ overflow: "visible" }}>
        <OrbitComposition tier={FULL} />
      </div>

      {/* Mobile / tablet — simple 2-column grid, since absolute layout doesn't scale down */}
      <div className="mt-10 grid grid-cols-2 gap-8 lg:hidden">
        <Image
          src="/images/solution-section/core/svara_core.png"
          alt="SVARA Core"
          width={280}
          height={187}
          className="col-span-2 mx-auto h-auto w-[220px] object-contain"
        />
        {[...LEFT_ASSETS, ...RIGHT_ASSETS].map((item) => (
          <Image
            key={item.src}
            src={`/images/solution-section/${item.folder}/${item.src}.png`}
            alt={item.alt}
            width={220}
            height={147}
            className="h-auto w-full object-contain"
          />
        ))}
      </div>

      <div className="mx-auto mt-12 grid max-w-[1400px] grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {DIFFERENTIATORS.map((item) => (
          <div
            key={item.name}
            className="flex flex-col justify-center"
            style={{
              height: 170,
              padding: 28,
              borderRadius: 24,
              background: "rgba(255,255,255,0.75)",
              backdropFilter: "blur(16px)",
              border: "1px solid rgba(59,130,246,0.15)",
              boxShadow: "0 20px 60px rgba(30,64,175,0.08)",
            }}
          >
            <item.icon size={20} style={{ color: "#5D8FBE" }} />
            <h3 className="mt-3 text-base font-bold" style={{ color: "#1D2E6D" }}>
              {item.name}
            </h3>
            <p className="mt-1 text-sm" style={{ color: "#5D8FBE" }}>
              {item.tagline}
            </p>
          </div>
        ))}
      </div>

      <p className="mt-16 text-center text-lg italic" style={{ color: "#5D8FBE" }}>
        From fragmented operations to orchestrated intelligence.
      </p>
    </div>
  );
}
