"use client";

import { useAuthStore } from "@/store/auth.store";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Server, LayoutDashboard, LogOut, User, Terminal, BookOpen, Target } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, setUser } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      // If no user in persisted store, try checking session on server
      if (!user) {
        try {
          const res = await fetch("/api/auth/me");
          if (res.ok) {
            const data = await res.json();
            setUser({ id: data.user.userId, email: data.user.email }, null);
          } else {
            router.push("/login");
          }
        } catch (error) {
          router.push("/login");
        }
      }
      setCheckingAuth(false);
    };

    checkAuth();
  }, [user, setUser, router]);

  if (checkingAuth) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="h-10 w-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  const navItems = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Docs", href: "/docs", icon: BookOpen },
    { label: "About", href: "/about", icon: Target },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <nav className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/dashboard" className="flex items-center space-x-2 text-primary">
                <Server size={24} strokeWidth={2.5} />
                <span className="text-xl font-bold tracking-tight text-slate-900">SimulAPI</span>
              </Link>
              <div className="hidden sm:ml-10 sm:flex sm:space-x-8">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${
                      pathname === item.href
                        ? "border-primary text-slate-900"
                        : "border-transparent text-muted-foreground hover:text-slate-700 hover:border-slate-300"
                    }`}
                  >
                    <item.icon size={18} className="mr-2" />
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="flex items-center space-x-2 px-3 py-1 font-medium">
                <User size={14} />
                <span>{user.email}</span>
              </Badge>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  useAuthStore.getState().logout();
                  router.push("/login");
                }}
                className="text-muted-foreground hover:text-destructive transition-colors"
                title="Logout"
              >
                <LogOut size={20} />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow max-w-7xl w-full mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {children}
      </main>

      <footer className="bg-white border-t border-slate-200 mt-auto py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            <div className="flex items-center space-x-2 opacity-60">
              <Server size={18} />
              <span className="text-sm font-bold tracking-tight text-slate-900 uppercase italic">SimulAPI</span>
            </div>
            
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-center md:text-left leading-relaxed">
              © 2026 SimulAPI · Designed & Developed by <a href="https://syedtasavour.me" target="_blank" className="text-slate-900 hover:text-primary transition-colors border-b border-slate-200 hover:border-primary">Syed Tasavour</a>
            </p>

            <div className="flex space-x-6">
              <a href="https://github.com/bat-tasavour/SimulAPI" target="_blank" className="text-slate-400 hover:text-primary transition-colors">
                <Terminal size={20} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}