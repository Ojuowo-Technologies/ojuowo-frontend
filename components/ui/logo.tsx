interface LogoProps {
  variant?: 'default' | 'light'
  className?: string
}

export function LogoMark({
  color = '#5B4CF5',
  size = 32,
}: {
  color?: string
  size?: number
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-50 -45 100 100"
      width={size}
      height={size}
      aria-hidden="true"
    >
      <circle cx="-17" cy="-4" r="15" fill="none" stroke={color} strokeWidth="7" />
      <circle cx="17" cy="-4" r="15" fill="none" stroke={color} strokeWidth="7" strokeOpacity="0.6" />
      <circle cx="-17" cy="-4" r="5" fill={color} />
      <circle cx="17" cy="-4" r="5" fill={color} fillOpacity="0.6" />
      <path
        d="M-16 24 Q0 36 16 24"
        fill="none"
        stroke={color}
        strokeOpacity="0.75"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function Logo({ variant = 'default', className = '', style }: LogoProps & { style?: React.CSSProperties }) {
  // light SVG = indigo mark + wordmark (for light/white backgrounds)
  // dark SVG  = white mark + wordmark (for dark/indigo backgrounds)
  const src = variant === 'light' ? '/ojuowo-logo-dark.svg' : '/ojuowo-logo-light.svg'

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt="Ojúòwò"
      style={className || style ? style : { height: '54px', width: 'auto' }}
      className={className}
    />
  )
}
