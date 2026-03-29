"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Terminal, Scale, ArrowLeft } from "lucide-react";

import { useAuthStore } from "@/store/auth.store";

export default function TermsPage() {
  const { user } = useAuthStore();

  return (
    <div className="flex flex-col min-h-screen bg-white text-slate-900 font-sans">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-primary p-1 rounded-lg">
              <Terminal className="text-white" size={18} />
            </div>
            <span className="text-lg font-black tracking-tighter uppercase italic">SimulAPI</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild className="font-bold text-xs uppercase tracking-widest text-slate-500 hover:text-primary">
              <Link href="/"><ArrowLeft className="mr-2" size={16} /> Home</Link>
            </Button>
            {user && (
              <Button asChild size="sm" className="font-black uppercase tracking-widest px-6 rounded-full shadow-lg shadow-primary/20">
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="flex-grow max-w-3xl mx-auto py-20 px-4 sm:px-6 lg:px-8 space-y-12">
        <section className="space-y-6">
          <Badge variant="secondary" className="px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-blue-50 text-blue-600 border-blue-100">
            STRATEGIC AGREEMENT
          </Badge>
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter leading-[0.95]">
            Terms of <span className="text-primary italic">Velocity.</span>
          </h1>
          <p className="text-xl text-slate-500 font-medium leading-relaxed">
            Last Updated: March 29, 2026
          </p>
        </section>

        <article className="prose prose-slate max-w-none space-y-8 font-medium text-slate-600 leading-relaxed">
          <div className="space-y-4">
            <h2 className="text-2xl font-black text-slate-900 uppercase italic tracking-tight">01. Use of Service</h2>
            <p>
              SimulAPI is provided as a tool to accelerate your development workflow. You agree to use it responsibly and not for hosting illegal content or activities. We provide the infrastructure to turn your documentation into mocks; the responsibility for the content of those mocks lies with you.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-black text-slate-900 uppercase italic tracking-tight">02. Account Security</h2>
            <p>
              You are responsible for the security of your account and your JWT-based sessions. Keep your credentials private. We are not liable for any unauthorized access to your projects resulting from compromised local security.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-black text-slate-900 uppercase italic tracking-tight">03. Availability & Latency</h2>
            <p>
              While we aim for 100% uptime to keep you unblocked, SimulAPI is provided "as is." We are not responsible for delays in your shipping cycle caused by service downtime. Interestingly, we actually encourage you to use our "Chaos Mode" to ensure your app works even when services ARE down.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-black text-slate-900 uppercase italic tracking-tight">04. Open Source & Contributions</h2>
            <p>
              SimulAPI is open source. You are encouraged to fork, contribute, and improve the engine. Contributions are subject to our community standards and the MIT license.
            </p>
          </div>
        </article>
      </main>

      <footer className="bg-slate-50 border-t border-slate-100 py-12 text-center text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
        © 2026 SimulAPI · Designed & Developed by Syed Tasavour
      </footer>
    </div>
  );
}