"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Terminal, 
  Target, 
  Users, 
  Zap, 
  ArrowRight,
  Github,
  Globe,
  Lock,
  ShieldCheck,
  Heart,
  Cpu,
  Code2,
  ExternalLink
} from "lucide-react";

import { useAuthStore } from "@/store/auth.store";

export default function AboutPage() {
  const { user } = useAuthStore();

  return (
    <div className="flex flex-col min-h-screen bg-white text-slate-900 font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-primary p-1 rounded-lg shadow-lg shadow-primary/20">
              <Terminal className="text-white" size={18} />
            </div>
            <span className="text-lg font-black tracking-tighter uppercase italic">SimulAPI</span>
          </Link>
          <div className="flex items-center space-x-4 text-sm font-bold uppercase tracking-widest text-slate-500">
            <Link href="/docs" className="hover:text-primary transition-colors">Docs</Link>
            {user ? (
              <Button asChild size="sm" className="font-black px-6 rounded-full shadow-lg shadow-primary/20">
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            ) : (
              <Button asChild size="sm" className="font-black px-6 rounded-full shadow-lg shadow-primary/20">
                <Link href="/register">Join the Mission</Link>
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="flex-grow max-w-5xl mx-auto py-24 px-4 sm:px-6 lg:px-8 space-y-32">
        {/* Hero Section */}
        <section className="text-center space-y-8">
          <Badge variant="secondary" className="px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-blue-50 text-blue-600 border-blue-100 animate-in fade-in slide-in-from-bottom-2 duration-700">
            THE GROWTH THESIS
          </Badge>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.95] animate-in fade-in slide-in-from-bottom-4 duration-1000">
            We exist to <span className="text-primary italic underline decoration-blue-100 underline-offset-8">delete friction.</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-500 font-medium leading-relaxed max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-6 duration-1000">
            The biggest waste in modern engineering is idle time. SimulAPI was built to ensure that no frontend developer ever has to wait for a backend environment again.
          </p>
        </section>

        {/* The Founder Section */}
        <section className="relative py-20">
          <div className="absolute inset-0 bg-slate-50/50 rounded-[4rem] -z-10 border border-slate-100"></div>
          <div className="grid md:grid-cols-2 gap-16 items-center px-12">
            <div className="space-y-8">
              <Badge variant="outline" className="px-3 py-1 font-bold text-primary border-primary/20 uppercase tracking-widest text-[10px]">BEHIND THE VISION</Badge>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900 leading-[1.1]">
                Built by <br/> <span className="text-primary italic underline decoration-blue-200 underline-offset-4">Syed Tasavour.</span>
              </h2>
              <div className="space-y-6 text-slate-600 font-medium text-lg leading-relaxed italic border-l-4 border-primary/20 pl-6">
                <p>
                  "I've spent years scaling platforms to serve millions of users. The consistent bottleneck wasn't the code—it was the dependency loop. SimulAPI is my answer to that friction."
                </p>
              </div>
              <div className="pt-4 flex items-center space-x-6">
                <Button asChild variant="outline" className="rounded-2xl h-12 px-8 border-2 font-bold uppercase tracking-widest text-xs">
                  <a href="https://syedtasavour.me" target="_blank">
                    Portfolio <ExternalLink className="ml-2" size={14} />
                  </a>
                </Button>
                <a href="https://github.com/syedtasavour" target="_blank" className="text-slate-400 hover:text-primary transition-colors">
                  <Github size={24} />
                </a>
              </div>
            </div>
            <div className="space-y-6">
              <Card className="border-none shadow-xl bg-white rounded-3xl p-8 border border-slate-100">
                <CardContent className="p-0 space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
                      <Cpu size={24} />
                    </div>
                    <div>
                      <h4 className="font-black uppercase italic tracking-tighter text-lg leading-none">Engineering DNA</h4>
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Scale Specialist</p>
                    </div>
                  </div>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed">
                    Syed Tasavour is a Software Engineer with a track record of building high-concurrency systems serving <strong>1M+ to 5M+ users</strong>. From educational news platforms to AI-integrated SaaS, his focus is always on <strong>Pure Velocity.</strong>
                  </p>
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className="space-y-1">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Expertise</p>
                      <p className="text-xs font-bold text-slate-700 uppercase">MERN & TS</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Cloud</p>
                      <p className="text-xs font-bold text-slate-700 uppercase">AWS Architect</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* The Strategy */}
        <section className="space-y-16 px-4">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 bg-primary/5 rounded-2xl flex items-center justify-center border border-primary/10 text-primary shadow-inner">
              <Target size={28} />
            </div>
            <h2 className="text-4xl font-black italic uppercase tracking-tighter">The Growth Playbook</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="group p-10 rounded-[3rem] bg-white border border-slate-100 shadow-xl hover:border-primary/20 transition-all duration-500">
              <h3 className="text-2xl font-black italic uppercase tracking-tighter text-slate-900 mb-4">The Cycle Time Moat</h3>
              <p className="text-slate-600 leading-relaxed font-medium text-lg">
                In a Product-Led Growth (PLG) world, velocity is your only moat. If your frontend team is blocked by backend readiness, your growth loops are broken. We built SimulAPI to fix those loops and protect your most valuable asset: <strong>Time.</strong>
              </p>
            </div>
            <div className="group p-10 rounded-[3rem] bg-slate-900 text-white border border-slate-800 shadow-2xl hover:bg-slate-950 transition-all duration-500">
              <h3 className="text-2xl font-black italic uppercase tracking-tighter text-white mb-4">Open Source Leverage</h3>
              <p className="text-slate-400 leading-relaxed font-medium text-lg">
                We believe that developer tools should be transparent, extensible, and free to start. Our mission is to provide the standard engine for API simulation, built by the community, for the community. <strong>Zero Prompt Tax. Zero Friction.</strong>
              </p>
            </div>
          </div>
        </section>

        {/* The Team / Values */}
        <section className="space-y-16 bg-slate-950 rounded-[4rem] p-16 md:p-24 border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 blur-[120px] rounded-full"></div>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 text-white shadow-lg">
                <Users size={28} />
              </div>
              <h2 className="text-4xl font-black italic uppercase tracking-tighter text-white underline decoration-primary decoration-4 underline-offset-8">Core Values</h2>
            </div>
            <Badge variant="outline" className="text-white border-white/20 px-4 py-1.5 font-black uppercase tracking-widest text-[10px]">
              V1.0 STANDARDS
            </Badge>
          </div>

          <div className="grid sm:grid-cols-3 gap-12">
            {[
              { title: "Velocity Over Perfection", desc: "Ship today, refine tomorrow. Mocks unblock shipping cycles instantly." },
              { title: "Zero Prompt Tax", desc: "Automation should be smarter than manual AI prompting. Our engine understands context." },
              { title: "Chaos Logic Native", desc: "Build resilient systems by simulating backend failure early in the dev cycle." }
            ].map((v, i) => (
              <div key={i} className="space-y-4 group">
                <div className="w-8 h-px bg-primary group-hover:w-full transition-all duration-700"></div>
                <h4 className="font-black text-white text-xl uppercase italic tracking-tight">{v.title}</h4>
                <p className="text-sm text-slate-400 font-medium leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* GitHub / Contribution */}
        <section className="text-center py-12 space-y-10">
          <h2 className="text-5xl md:text-6xl font-black tracking-tighter leading-tight text-slate-900">
            Join the community <br/> of <span className="text-primary underline decoration-blue-100 underline-offset-4">High-Velocity</span> builders.
          </h2>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6 pt-4">
            <Button variant="outline" size="lg" asChild className="h-16 px-12 text-sm font-black uppercase tracking-widest rounded-full border-2 hover:bg-slate-50 transition-all shadow-lg shadow-slate-200/20">
              <a href="https://github.com/bat-tasavour/SimulAPI" target="_blank">
                <Github className="mr-3" size={24} /> View Source
              </a>
            </Button>
            <Button size="lg" asChild className="h-16 px-12 text-sm font-black uppercase tracking-widest rounded-full shadow-[0_20px_50px_rgba(37,99,235,0.3)] hover:scale-105 transition-transform active:scale-95">
              <Link href="/register">Start Building Free <ArrowRight className="ml-3" size={24} /></Link>
            </Button>
          </div>
        </section>
      </main>

      <footer className="bg-white border-t border-slate-100 py-32 text-center">
        <div className="flex justify-center space-x-12 mb-12 opacity-40 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-700">
           <div className="flex items-center space-x-2 font-black uppercase italic tracking-tighter text-sm">
             <Terminal size={20} /> <span>Dev-First</span>
           </div>
           <div className="flex items-center space-x-2 font-black uppercase italic tracking-tighter text-sm">
             <Lock size={20} /> <span>Secure</span>
           </div>
           <div className="flex items-center space-x-2 font-black uppercase italic tracking-tighter text-sm">
             <Globe size={20} /> <span>Global</span>
           </div>
        </div>
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 leading-loose max-w-md mx-auto">
          © 2026 SimulAPI · Designed & Developed by <a href="https://syedtasavour.me" target="_blank" className="text-slate-900 hover:text-primary transition-colors border-b-2 border-slate-100 hover:border-primary font-black italic">Syed Tasavour</a>
        </p>
      </footer>
    </div>
  );
}