import { cn } from "../../lib/utils";

const variants = {
  default: "bg-gray-800 text-gray-300 border-gray-700",
  success: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  danger: "bg-rose-500/15 text-rose-400 border-rose-500/30",
};

export function Badge({ variant = "default", className, children, ...props }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium",
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
