import { Logo } from '@/components/ui/logo'
import { cn } from '@/lib/utils'

function StepBar({ step }: { step: 1 | 2 | 3 }) {
  return (
    <div
      className="flex items-center gap-1.5"
      style={{ marginBottom: '32px' }}
      role="progressbar"
      aria-valuenow={step}
      aria-valuemin={1}
      aria-valuemax={3}
      aria-label={`Step ${step} of 3`}
    >
      {([1, 2, 3] as const).map((s) => (
        <div
          key={s}
          className={cn(
            'h-[3px] flex-1 rounded-full transition-colors duration-500',
            s <= step ? 'bg-[#5B4CF5]' : 'bg-[#DDD8FF]',
          )}
        />
      ))}
    </div>
  )
}

export function AuthCard({
  children,
  step,
}: {
  children: React.ReactNode
  step: 1 | 2 | 3
}) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '28px' }}>
        <a href="/" aria-label="Go to Ojuowo home" style={{ display: 'inline-flex', textDecoration: 'none' }}>
          <Logo variant="light" />
        </a>
      </div>
      <StepBar step={step} />
      {children}
    </div>
  )
}
