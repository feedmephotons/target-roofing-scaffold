// Admin sidebar icons. One family: 24px grid, 1.75 stroke, rounded joins, and a soft
// tinted fill (ACCENT) so they read on both the dark sidebar and the red active state.

type IconProps = { className?: string }

const ACCENT = { fill: 'currentColor', fillOpacity: 0.22, stroke: 'none' } as const

function Svg({ className, children }: IconProps & { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      {children}
    </svg>
  )
}

/** A house whose walls are an inbox tray: new leads coming in. */
export function LeadsIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <path {...ACCENT} d="M5 14.5h3.5l1.5 2h4l1.5-2H19V19a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 5 19z" />
      <path d="M3 10.5 12 3.5l9 7" />
      <path d="M5 9v10a1.5 1.5 0 0 0 1.5 1.5h11A1.5 1.5 0 0 0 19 19V9" />
      <path d="M5 14.5h3.5l1.5 2h4l1.5-2H19" />
      <path d="M12 7.75v4.75M9.9 10.6 12 12.7l2.1-2.1" />
    </Svg>
  )
}

/** A player frame with a scrub bar. */
export function VideosIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <rect {...ACCENT} x="2.75" y="3.75" width="18.5" height="13" rx="2.5" />
      <rect x="2.75" y="3.75" width="18.5" height="13" rx="2.5" />
      <path d="M10.25 7.75v5l4.25-2.5z" fill="currentColor" />
      <path d="M3.5 20.5h17" />
      <circle cx="9" cy="20.5" r="1.6" fill="currentColor" stroke="none" />
    </Svg>
  )
}

/** A hard hat. */
export function JobsIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <path {...ACCENT} d="M4.5 16.25a7.5 7.5 0 0 1 15 0z" />
      <path d="M4.5 16.25a7.5 7.5 0 0 1 15 0" />
      <path d="M10 9.4V6.75A1.25 1.25 0 0 1 11.25 5.5h1.5A1.25 1.25 0 0 1 14 6.75V9.4" />
      <rect x="2.5" y="16.25" width="19" height="2.75" rx="1.375" />
    </Svg>
  )
}

/** A magnifier over rising bars: search ranking. */
export function SeoIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <circle {...ACCENT} cx="10.5" cy="10.5" r="6.75" />
      <circle cx="10.5" cy="10.5" r="6.75" />
      <path d="M15.5 15.5 20.75 20.75" strokeWidth={2.25} />
      <path d="M7.75 13v-1.75M10.5 13V9.75M13.25 13V8" />
    </Svg>
  )
}

/** A speech bubble holding a star. */
export function ReviewsIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <path {...ACCENT} d="M4.5 4.25h15A1.75 1.75 0 0 1 21.25 6v9.5a1.75 1.75 0 0 1-1.75 1.75H10l-4.25 3.5v-3.5H4.5A1.75 1.75 0 0 1 2.75 15.5V6A1.75 1.75 0 0 1 4.5 4.25z" />
      <path d="M4.5 4.25h15A1.75 1.75 0 0 1 21.25 6v9.5a1.75 1.75 0 0 1-1.75 1.75H10l-4.25 3.5v-3.5H4.5A1.75 1.75 0 0 1 2.75 15.5V6A1.75 1.75 0 0 1 4.5 4.25z" />
      <path d="M12 7l.94 2.46 2.63.13-2.05 1.65.68 2.54L12 12.35l-2.2 1.43.68-2.54-2.05-1.65 2.63-.13z" fill="currentColor" strokeWidth={1} />
    </Svg>
  )
}

/** A clipboard with two checked rows. */
export function TasksIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <rect x="4.75" y="4.25" width="14.5" height="17" rx="2" />
      <rect {...ACCENT} x="8.75" y="2.75" width="6.5" height="3.5" rx="1" />
      <rect x="8.75" y="2.75" width="6.5" height="3.5" rx="1" />
      <path d="M8 11l1.25 1.25L11.5 10M13.75 11.25h2.75M8 16l1.25 1.25L11.5 15M13.75 16.25h2.75" />
    </Svg>
  )
}

/** A conversation bubble with a voice waveform. */
export function MeetingsIcon(p: IconProps) {
  const bubble = 'M12 3.75c4.83 0 8.75 3.25 8.75 7.25s-3.92 7.25-8.75 7.25c-1.1 0-2.15-.17-3.12-.48L4.25 19.75l1.2-3.6C4.07 14.84 3.25 13 3.25 11c0-4 3.92-7.25 8.75-7.25z'
  return (
    <Svg {...p}>
      <path {...ACCENT} d={bubble} />
      <path d={bubble} />
      <path d="M8 10.25v1.5M10 8.75v4.5M12 9.75v2.5M14 8v6M16 10v2" />
    </Svg>
  )
}

/** A studio microphone on a stand. */
export function PodcastIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <rect {...ACCENT} x="9" y="2.75" width="6" height="11" rx="3" />
      <rect x="9" y="2.75" width="6" height="11" rx="3" />
      <path d="M9 7.25h2M9 9.75h2" />
      <path d="M5.75 11a6.25 6.25 0 0 0 12.5 0" />
      <path d="M12 17.25v3.25M8.75 20.75h6.5" />
    </Svg>
  )
}

/** Sparkles: the AI assistant. */
export function AssistantIcon(p: IconProps) {
  const big = 'M10.5 3.5c.5 3.6 2.4 5.5 6 6-3.6.5-5.5 2.4-6 6-.5-3.6-2.4-5.5-6-6 3.6-.5 5.5-2.4 6-6z'
  return (
    <Svg {...p}>
      <path {...ACCENT} d={big} />
      <path d={big} />
      <path d="M18 14.25c.25 1.6 1.1 2.45 2.75 2.75-1.65.3-2.5 1.15-2.75 2.75-.3-1.6-1.15-2.45-2.75-2.75 1.6-.3 2.45-1.15 2.75-2.75z" fill="currentColor" strokeWidth={1} />
      <circle cx="5" cy="19.25" r="1.1" fill="currentColor" stroke="none" />
    </Svg>
  )
}

/** Building blocks with a plus: add your own tool. */
export function AddToolIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <rect x="3.75" y="3.75" width="7" height="7" rx="1.5" />
      <rect {...ACCENT} x="13.25" y="3.75" width="7" height="7" rx="1.5" />
      <rect x="13.25" y="3.75" width="7" height="7" rx="1.5" />
      <rect x="3.75" y="13.25" width="7" height="7" rx="1.5" />
      <path d="M16.75 13.75v6M13.75 16.75h6" />
    </Svg>
  )
}

/** A compass: the admin guide. */
export function GuideIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <circle cx="12" cy="12" r="8.75" />
      <path {...ACCENT} d="M15.25 8.75 13.3 13.3l-4.55 1.95 1.95-4.55z" />
      <path d="M15.25 8.75 13.3 13.3l-4.55 1.95 1.95-4.55z" />
    </Svg>
  )
}
