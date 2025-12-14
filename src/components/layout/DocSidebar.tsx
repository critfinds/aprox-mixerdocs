import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Book,
  Rocket,
  Layers,
  Shield,
  Code,
  GraduationCap,
  Scale,
  FileText,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavItem {
  title: string;
  href: string;
  icon: React.ElementType;
  children?: { title: string; href: string }[];
}

const navItems: NavItem[] = [
  {
    title: "Introduction",
    href: "/",
    icon: Book,
    children: [
      { title: "Overview", href: "/" },
      { title: "Features", href: "/#features" },
      { title: "Architecture", href: "/#architecture-overview" },
    ],
  },
  {
    title: "Quick Start",
    href: "/quick-start",
    icon: Rocket,
    children: [
      { title: "Connect Wallet", href: "/quick-start#wallet" },
      { title: "Deposit & Withdraw", href: "/quick-start#deposit-withdraw" },
      { title: "Environment Setup", href: "/quick-start#environment" },
    ],
  },
  {
    title: "Architecture",
    href: "/architecture",
    icon: Layers,
    children: [
      { title: "Smart Contracts", href: "/architecture#contracts" },
      { title: "Frontend", href: "/architecture#frontend" },
      { title: "Backend/Relayer", href: "/architecture#relayer" },
      { title: "Data Flow", href: "/architecture#data-flow" },
    ],
  },
  {
    title: "Zero-Knowledge Proofs",
    href: "/zk-proofs",
    icon: Shield,
    children: [
      { title: "zk-SNARKs Overview", href: "/zk-proofs#overview" },
      { title: "Verifier Contract", href: "/zk-proofs#verifier" },
      { title: "Privacy Guarantees", href: "/zk-proofs#privacy" },
    ],
  },
  {
    title: "API Reference",
    href: "/api",
    icon: Code,
    children: [
      { title: "Backend API", href: "/api#backend" },
      { title: "Relayer API", href: "/api#relayer" },
      { title: "Error Codes", href: "/api#errors" },
    ],
  },
  {
    title: "Tutorials",
    href: "/tutorials",
    icon: GraduationCap,
    children: [
      { title: "Deposit Tutorial", href: "/tutorials#deposit" },
      { title: "Withdrawal Tutorial", href: "/tutorials#withdrawal" },
      { title: "Relayer Usage", href: "/tutorials#relayer" },
      { title: "Frontend Integration", href: "/tutorials#integration" },
    ],
  },
  {
    title: "Compliance",
    href: "/compliance",
    icon: Scale,
    children: [
      { title: "Non-custodial Design", href: "/compliance#non-custodial" },
      { title: "Data Minimization", href: "/compliance#data" },
      { title: "Relayer Model", href: "/compliance#relayer" },
    ],
  },
  {
    title: "Appendices",
    href: "/appendices",
    icon: FileText,
    children: [
      { title: "Environment Variables", href: "/appendices#env" },
      { title: "Contract Addresses", href: "/appendices#contracts" },
      { title: "Resources", href: "/appendices#resources" },
    ],
  },
];

export function DocSidebar() {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<string[]>(["Introduction"]);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleExpanded = (title: string) => {
    setExpandedItems((prev) =>
      prev.includes(title)
        ? prev.filter((item) => item !== title)
        : [...prev, title]
    );
  };

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href.split("#")[0]);
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center glow-effect-sm group-hover:glow-effect transition-all duration-300">
            <Shield className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-bold gradient-text">AproxMixer</h1>
            <p className="text-xs text-muted-foreground">Documentation</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isExpanded = expandedItems.includes(item.title);
            const active = isActive(item.href);

            return (
              <li key={item.title}>
                <button
                  onClick={() => toggleExpanded(item.title)}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                    active
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={cn(
                        "w-4 h-4",
                        active ? "text-primary" : "text-muted-foreground"
                      )}
                    />
                    <span>{item.title}</span>
                  </div>
                  {item.children && (
                    <span className="text-muted-foreground">
                      {isExpanded ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </span>
                  )}
                </button>

                {item.children && isExpanded && (
                  <ul className="mt-1 ml-7 space-y-1 border-l border-sidebar-border pl-3">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          to={child.href}
                          onClick={() => setIsMobileOpen(false)}
                          className={cn(
                            "block px-3 py-1.5 text-sm rounded-md transition-colors duration-200",
                            location.pathname + location.hash === child.href
                              ? "text-primary font-medium"
                              : "text-muted-foreground hover:text-foreground"
                          )}
                        >
                          {child.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="glass-card rounded-lg p-4">
          <p className="text-xs text-muted-foreground mb-2">Version</p>
          <p className="text-sm font-mono gradient-text">v1.0.0-beta</p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Toggle */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </Button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-screen w-72 bg-sidebar border-r border-sidebar-border transition-transform duration-300 lg:translate-x-0",
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <SidebarContent />
      </aside>
    </>
  );
}
