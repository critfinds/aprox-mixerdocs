import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { AlertCircle, Info, CheckCircle, AlertTriangle } from "lucide-react";

type InfoBoxVariant = "info" | "warning" | "success" | "danger";

interface InfoBoxProps {
  variant?: InfoBoxVariant;
  title?: string;
  children: ReactNode;
  className?: string;
}

const variants: Record<InfoBoxVariant, { icon: typeof Info; className: string }> = {
  info: {
    icon: Info,
    className: "border-primary/30 bg-primary/5",
  },
  warning: {
    icon: AlertTriangle,
    className: "border-yellow-500/30 bg-yellow-500/5",
  },
  success: {
    icon: CheckCircle,
    className: "border-green-500/30 bg-green-500/5",
  },
  danger: {
    icon: AlertCircle,
    className: "border-destructive/30 bg-destructive/5",
  },
};

export function InfoBox({ variant = "info", title, children, className }: InfoBoxProps) {
  const { icon: Icon, className: variantClass } = variants[variant];

  return (
    <div
      className={cn(
        "rounded-lg border p-4 my-4",
        variantClass,
        className
      )}
    >
      <div className="flex items-start gap-3">
        <Icon className={cn(
          "w-5 h-5 shrink-0 mt-0.5",
          variant === "info" && "text-primary",
          variant === "warning" && "text-yellow-500",
          variant === "success" && "text-green-500",
          variant === "danger" && "text-destructive"
        )} />
        <div className="flex-1">
          {title && (
            <h4 className="font-semibold text-foreground mb-1">{title}</h4>
          )}
          <div className="text-sm text-muted-foreground">{children}</div>
        </div>
      </div>
    </div>
  );
}
