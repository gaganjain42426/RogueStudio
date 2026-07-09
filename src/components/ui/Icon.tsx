import type { CSSProperties } from 'react'

/**
 * Icon — the site's own icon set, inline SVG, stroke-based.
 *
 * Replaces the Material Symbols font on all public pages: no icon-font
 * download, no Android-settings look, one consistent 1.5px stroke voice.
 * (Admin/portal keep Material Symbols — internal tools, different rules.)
 */

export type IconName =
  | 'play'
  | 'volume'
  | 'close'
  | 'arrow-ne'
  | 'arrow-right'
  | 'check'
  | 'chat'
  | 'mail'
  | 'instagram'
  | 'pin'
  | 'film'
  | 'pause'

const PATHS: Record<IconName, React.ReactNode> = {
  play: <path d="M8 5.5v13l11-6.5-11-6.5Z" fill="currentColor" stroke="none" />,
  volume: (
    <>
      <path d="M4 9.5v5h3.5L12 18.5v-13L7.5 9.5H4Z" fill="currentColor" stroke="none" />
      <path d="M15.5 9a4.2 4.2 0 0 1 0 6M18 6.8a7.6 7.6 0 0 1 0 10.4" />
    </>
  ),
  close: <path d="M6 6l12 12M18 6L6 18" />,
  'arrow-ne': <path d="M7 17 17 7M9 7h8v8" />,
  'arrow-right': <path d="M4 12h16m-6-6 6 6-6 6" />,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  chat: (
    <path d="M12 4a8 8 0 0 0-6.9 12l-1 3.9 4-1A8 8 0 1 0 12 4Zm-3.4 5.9c.2-.5.4-.5.6-.5h.5c.2 0 .4 0 .5.4.2.4.6 1.4.6 1.5.1.1.1.3 0 .4l-.4.5c-.1.2-.2.3 0 .5.1.3.6 1 1.3 1.6.9.8 1.6 1 1.9 1.1.2.1.4.1.5-.1l.6-.7c.2-.2.3-.2.5-.1l1.6.7c.2.1.4.2.4.3 0 .2 0 .8-.3 1.3-.3.6-1.4 1.1-1.9 1.1-.5.1-1.1.1-1.8-.1a11 11 0 0 1-1.6-.6c-2.9-1.2-4.7-4.1-4.9-4.3-.1-.2-1.1-1.5-1.1-2.8 0-1.3.7-2 .9-2.2Z" fill="currentColor" stroke="none" />
  ),
  mail: (
    <>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
      <path d="m4.5 7 7.5 6 7.5-6" />
    </>
  ),
  instagram: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="4.5" />
      <circle cx="12" cy="12" r="3.6" />
      <circle cx="16.8" cy="7.2" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s-6.5-5.4-6.5-10a6.5 6.5 0 1 1 13 0c0 4.6-6.5 10-6.5 10Z" />
      <circle cx="12" cy="10.6" r="2.3" />
    </>
  ),
  film: (
    <>
      <rect x="3.5" y="5" width="17" height="14" rx="2" />
      <path d="M7.5 5v14M16.5 5v14M3.5 9.5h4M3.5 14.5h4M16.5 9.5h4M16.5 14.5h4" />
    </>
  ),
  pause: <path d="M8 5.5v13M16 5.5v13" strokeWidth="2.5" />,
}

interface IconProps {
  name: IconName
  /** Pixel size (width = height). Defaults to 20. */
  size?: number
  className?: string
  style?: CSSProperties
}

export default function Icon({ name, size = 20, className, style }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      style={style}
    >
      {PATHS[name]}
    </svg>
  )
}
