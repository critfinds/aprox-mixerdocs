import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  id?: string;
  className?: string;
}

export function SectionHeader({ title, subtitle, id, className }: SectionHeaderProps) {
  return (
    <div className={cn("mb-8", className)} id={id}>
      <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-2 flex items-center gap-3">
        <span className="w-1 h-8 rounded-full bg-gradient-to-b from-primary to-accent" />
        {title}
      </h2>
      {subtitle && (
        <p className="text-muted-foreground text-lg">{subtitle}</p>
      )}
      <div className="neon-line mt-4 w-24" />
    </div>
  );
}
