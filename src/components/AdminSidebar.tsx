"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useTransition } from "react";
import { Terminal, Settings, LogOut, ShieldAlert } from "lucide-react";
import { logout } from "@/app/auth-actions";

export default function AdminSidebar() {
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  if (pathname === "/afro-management/login") {
    return null;
  }

  const handleLogout = () => {
    if (confirm("Disconnect admin uplink terminal session?")) {
      startTransition(async () => {
        await logout();
      });
    }
  };

  const navItems = [
    {
      name: "Telemetry Logs",
      path: "/afro-management",
      icon: Terminal,
    },
    {
      name: "System Config",
      path: "#",
      icon: Settings,
    },
  ];

  return (
    <aside className="w-64 h-screen border-r border-zinc-800 bg-zinc-950 flex flex-col justify-between p-6 font-mono text-zinc-400 select-none">
      {/* Top Section */}
      <div className="space-y-8">
        {/* Logo Section */}
        <div className="flex items-center gap-3 pb-4 border-b border-zinc-900">
          <ShieldAlert className="text-emerald-500 animate-pulse" size={20} />
          <span className="font-sans font-bold text-white tracking-widest text-sm">
            MITCH // ADMIN_SYS
          </span>
        </div>

        {/* Navigation Section */}
        <nav className="space-y-1.5">
          <span className="text-[10px] text-zinc-600 uppercase tracking-widest block mb-4">
            Operations
          </span>
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded text-sm transition-all duration-300 ${
                  isActive
                    ? "bg-emerald-950/20 border border-emerald-800/40 text-emerald-400 shadow-[0_0_15px_-3px_rgba(16,185,129,0.1)]"
                    : "border border-transparent hover:bg-zinc-900/60 hover:text-zinc-200"
                }`}
              >
                <Icon size={16} className={isActive ? "text-emerald-400" : "text-zinc-500"} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section - Logout */}
      <div className="border-t border-zinc-900 pt-6">
        <button
          onClick={handleLogout}
          disabled={isPending}
          className="w-full flex items-center gap-3 px-4 py-3 rounded text-sm text-red-400 hover:text-red-300 hover:bg-red-950/10 border border-transparent hover:border-red-900/30 transition-all duration-300 disabled:opacity-50 cursor-pointer"
        >
          <LogOut size={16} />
          <span>{isPending ? "DISCONNECTING..." : "Disconnect System"}</span>
        </button>
      </div>
    </aside>
  );
}
