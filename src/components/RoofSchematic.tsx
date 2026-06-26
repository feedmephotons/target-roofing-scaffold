export default function RoofSchematic({ className = '' }: { className?: string }) {
  return (
    <div className={`absolute inset-0 pointer-events-none select-none ${className}`}>
      <svg
        viewBox="0 0 1200 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Roof deck / structural members */}
        <line x1="0" y1="320" x2="1200" y2="320" stroke="currentColor" strokeWidth="1.5" />
        <line x1="0" y1="280" x2="1200" y2="280" stroke="currentColor" strokeWidth="0.5" strokeDasharray="8 4" />
        <line x1="0" y1="360" x2="1200" y2="360" stroke="currentColor" strokeWidth="0.5" strokeDasharray="8 4" />

        {/* Joists / I-beams */}
        {[100, 250, 400, 550, 700, 850, 1000, 1150].map((x) => (
          <g key={x}>
            <line x1={x} y1="320" x2={x} y2="480" stroke="currentColor" strokeWidth="1" />
            <line x1={x - 12} y1="320" x2={x + 12} y2="320" stroke="currentColor" strokeWidth="2" />
            <line x1={x - 12} y1="480" x2={x + 12} y2="480" stroke="currentColor" strokeWidth="2" />
            <line x1={x - 8} y1="380" x2={x + 8} y2="380" stroke="currentColor" strokeWidth="0.5" />
            <line x1={x - 8} y1="420" x2={x + 8} y2="420" stroke="currentColor" strokeWidth="0.5" />
          </g>
        ))}

        {/* Roof membrane layers */}
        <path d="M0 280 Q150 265 300 280 T600 280 T900 280 T1200 280" stroke="currentColor" strokeWidth="0.8" />
        <path d="M0 270 Q150 255 300 270 T600 270 T900 270 T1200 270" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 6" />

        {/* Insulation hatching */}
        {Array.from({ length: 40 }, (_, i) => (
          <line
            key={`ins-${i}`}
            x1={i * 30}
            y1="285"
            x2={i * 30 + 15}
            y2="315"
            stroke="currentColor"
            strokeWidth="0.4"
          />
        ))}

        {/* Flashing detail at parapet */}
        <polyline points="60,200 60,280 0,280 0,200" stroke="currentColor" strokeWidth="1.2" fill="none" />
        <line x1="50" y1="200" x2="50" y2="275" stroke="currentColor" strokeWidth="0.5" />
        <path d="M60 240 L80 240 L80 280" stroke="currentColor" strokeWidth="0.6" fill="none" />

        {/* Right parapet */}
        <polyline points="1140,200 1140,280 1200,280 1200,200" stroke="currentColor" strokeWidth="1.2" fill="none" />
        <line x1="1150" y1="200" x2="1150" y2="275" stroke="currentColor" strokeWidth="0.5" />
        <path d="M1140 240 L1120 240 L1120 280" stroke="currentColor" strokeWidth="0.6" fill="none" />

        {/* Cap flashing */}
        <rect x="40" y="195" width="40" height="8" rx="1" stroke="currentColor" strokeWidth="0.8" fill="none" />
        <rect x="1120" y="195" width="40" height="8" rx="1" stroke="currentColor" strokeWidth="0.8" fill="none" />

        {/* Drain / scupper detail */}
        <circle cx="600" cy="320" r="18" stroke="currentColor" strokeWidth="1" fill="none" />
        <circle cx="600" cy="320" r="8" stroke="currentColor" strokeWidth="0.6" fill="none" />
        <line x1="600" y1="338" x2="600" y2="480" stroke="currentColor" strokeWidth="0.8" strokeDasharray="6 3" />

        {/* Dimension lines */}
        <g>
          <line x1="100" y1="510" x2="1100" y2="510" stroke="currentColor" strokeWidth="0.5" />
          <line x1="100" y1="505" x2="100" y2="515" stroke="currentColor" strokeWidth="0.5" />
          <line x1="1100" y1="505" x2="1100" y2="515" stroke="currentColor" strokeWidth="0.5" />
          <line x1="100" y1="480" x2="100" y2="510" stroke="currentColor" strokeWidth="0.3" strokeDasharray="2 3" />
          <line x1="1100" y1="480" x2="1100" y2="510" stroke="currentColor" strokeWidth="0.3" strokeDasharray="2 3" />
        </g>

        {/* Slope indicator */}
        <g>
          <line x1="200" y1="250" x2="400" y2="250" stroke="currentColor" strokeWidth="0.6" />
          <line x1="200" y1="250" x2="200" y2="240" stroke="currentColor" strokeWidth="0.6" />
          <line x1="400" y1="250" x2="390" y2="245" stroke="currentColor" strokeWidth="0.5" />
          <line x1="400" y1="250" x2="390" y2="255" stroke="currentColor" strokeWidth="0.5" />
        </g>

        {/* HVAC curb detail */}
        <rect x="780" y="240" width="80" height="40" rx="2" stroke="currentColor" strokeWidth="1" fill="none" />
        <line x1="790" y1="240" x2="790" y2="280" stroke="currentColor" strokeWidth="0.4" />
        <line x1="850" y1="240" x2="850" y2="280" stroke="currentColor" strokeWidth="0.4" />
        <rect x="785" y="230" width="70" height="12" rx="1" stroke="currentColor" strokeWidth="0.6" fill="none" />

        {/* Section cut markers */}
        <circle cx="40" cy="400" r="14" stroke="currentColor" strokeWidth="1" fill="none" />
        <line x1="40" y1="386" x2="40" y2="414" stroke="currentColor" strokeWidth="0.5" />
        <circle cx="1160" cy="400" r="14" stroke="currentColor" strokeWidth="1" fill="none" />
        <line x1="1160" y1="386" x2="1160" y2="414" stroke="currentColor" strokeWidth="0.5" />

        {/* Grid lines (light) */}
        {[150, 300, 450, 600, 750, 900, 1050].map((x) => (
          <line key={`grid-${x}`} x1={x} y1="180" x2={x} y2="520" stroke="currentColor" strokeWidth="0.2" strokeDasharray="3 8" />
        ))}

        {/* Fastener pattern */}
        {[175, 325, 475, 625, 775, 925, 1075].map((x) => (
          <g key={`fast-${x}`}>
            <circle cx={x} cy="300" r="2" stroke="currentColor" strokeWidth="0.5" fill="none" />
            <line x1={x - 3} y1="300" x2={x + 3} y2="300" stroke="currentColor" strokeWidth="0.3" />
            <line x1={x} y1="297" x2={x} y2="303" stroke="currentColor" strokeWidth="0.3" />
          </g>
        ))}
      </svg>
    </div>
  )
}
