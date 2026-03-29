"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Terminal, Shield, ArrowLeft } from "lucide-react";

import { useAuthStore } from "@/store/auth.store";

export default function PrivacyPage() {
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
            STRATEGIC TRUST
          </Badge>
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter leading-[0.95]">
            Privacy is a <span className="text-primary italic">Product Feature.</span>
          </h1>
          <p className="text-xl text-slate-500 font-medium leading-relaxed">
            Last Updated: March 29, 2026
          </p>
        </section>

        <article className="prose prose-slate max-w-none space-y-8 font-medium text-slate-600 leading-relaxed">
          <div className="space-y-4">
            <h2 className="text-2xl font-black text-slate-900 uppercase italic tracking-tight">01. Data Collection</h2>
            <p>
              Velocity requires data, but we only collect what moves the needle. This includes your email for authentication via JWT and the OpenAPI specifications you choose to import. We do not sell your specs or your data. Ever.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-black text-slate-900 uppercase italic tracking-tight">02. Mock Data Security</h2>
            <p>
              Your mock endpoints are yours. While they are accessible via public URLs for integration testing purposes, we do not index them or make them searchable. We recommend not using real production PII (Personally Identifiable Information) in your mock static responses.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-black text-slate-900 uppercase italic tracking-tight">03. Growth Cookies</h2>
            <p>
              We use secure, HTTP-only cookies to maintain your 7-day login session. These are essential for the product to function. We may use anonymized analytics to understand how users interact with our features to better optimize the growth loop.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-black text-slate-900 uppercase italic tracking-tight">04. Your Rights</h2>
            <p>
              You own your code and your specs. You can delete your projects or account at any time, which permanently removes your data from our MongoDB clusters.
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