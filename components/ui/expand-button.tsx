import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export interface ExpandButtonProps extends Omit<
  React.ComponentProps<typeof Button>,
  "children"
> {
  icon: React.ReactNode
  label: string
  suffix?: React.ReactNode
}

export function ExpandButton({
  icon,
  label,
  suffix,
  variant = "ghost",
  className,
  ...props
}: ExpandButtonProps) {
  return (
    <Button
      variant={variant}
      className={cn(
        "group/expand cursor-pointer gap-0 rounded-full px-2 has-[>svg]:px-2",
        className,
      )}
      {...props}
    >
      {icon}
      <span className="grid grid-cols-[0fr] transition-[grid-template-columns] duration-300 ease-out group-hover/expand:grid-cols-[1fr] group-focus-visible/expand:grid-cols-[1fr] motion-reduce:transition-none">
        <span className="overflow-hidden whitespace-nowrap">
          <span
            className="block opacity-0 transition-opacity duration-300 group-hover/expand:opacity-100 group-focus-visible/expand:opacity-100"
            style={{ paddingLeft: 10, paddingRight: 4 }}
          >
            {label}
          </span>
        </span>
      </span>
      {suffix}
    </Button>
  )
}

export default ExpandButton
