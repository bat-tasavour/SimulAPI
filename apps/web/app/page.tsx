"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ArrowRight, 
  Zap, 
  ShieldCheck, 
  Code2, 
  Cpu, 
  Layers, 
  Globe, 
  Terminal,
  CheckCircle2,
  Lock,
  Clock,
  ExternalLink,
  Github,
  Rocket,
  BarChart3,
  Users
} from "lucide-react";

import { useAuthStore } from "@/store/auth.store";

export default function LandingPage() {
  const { user } = useAuthStore();

  return (
    <div className="flex flex-col min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Navigation */}
      <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-primary p-1.5 rounded-lg shadow-lg shadow-primary/20">
              <Terminal className="text-white" size={20} />
            </div>
            <span className="text-xl font-black tracking-tighter uppercase italic">SimulAPI</span>
          </div>
          <nav className="hidden md:flex items-center space-x-8 text-sm font-bold text-slate-500 uppercase tracking-widest">
            <a href="#problem" className="hover:text-primary transition-colors">The Bottleneck</a>
            <a href="#features" className="hover:text-primary transition-colors">Strategy</a>
            <Link href="/docs" className="hover:text-primary transition-colors">Documentation</Link>
          </nav>
          <div className="flex items-center space-x-4">
            {user ? (
              <Button asChild size="sm" className="font-black uppercase tracking-widest px-6 rounded-full shadow-xl shadow-primary/20">
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            ) : (
              <>
                <Link href="/login" className="text-sm font-bold uppercase tracking-widest text-slate-600 hover:text-primary transition-colors">Sign in</Link>
                <Button asChild size="sm" className="font-black uppercase tracking-widest px-6 rounded-full shadow-xl shadow-primary/20">
                  <Link href="/register">Unblock Your Team</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="pt-32">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-10">
          <Badge variant="secondary" className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] bg-blue-50 text-blue-600 border-blue-100 animate-in fade-in slide-in-from-bottom-2 duration-700">
            ENGINEERING VELOCITY IS THE ONLY MOAT
          </Badge>
          <h1 className="text-6xl md:text-8xl font-black tracking-[calc(-0.05em)] text-slate-900 max-w-5xl mx-auto leading-[0.95] animate-in fade-in slide-in-from-bottom-4 duration-1000">
            Kill the <span className="text-primary">Backend Dependency</span> Bottleneck.
          </h1>
          <p className="text-xl md:text-2xl text-slate-500 max-w-3xl mx-auto leading-relaxed font-medium animate-in fade-in slide-in-from-bottom-6 duration-1000">
            Stop waiting for staging environments. Turn your OpenAPI specs into live, validated, production-grade mock APIs in 60 seconds. High-speed dev loops, zero prompt tax.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 pt-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <Button asChild size="lg" className="h-16 px-12 text-md font-black uppercase tracking-widest rounded-[2rem] shadow-[0_20px_50px_rgba(37,99,235,0.3)] hover:scale-105 transition-transform active:scale-95">
              <Link href="/register">Get Started Free <ArrowRight className="ml-2" size={20} /></Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="h-16 px-12 text-md font-black uppercase tracking-widest rounded-[2rem] border-2 hover:bg-slate-50 transition-all">
              <a href="https://github.com/bat-tasavour/SimulAPI" target="_blank">
                <Github className="mr-2" size={20} /> GitHub
              </a>
            </Button>
          </div>
          
          <div className="pt-20 max-w-6xl mx-auto px-4">
            <div className="relative rounded-[3rem] bg-slate-950 p-3 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] border border-slate-800 overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(37,99,235,0.15),transparent_50%)]"></div>
              <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/20 blur-[100px] rounded-full"></div>
              <img 
                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2070" 
                alt="SimulAPI Dashboard Preview" 
                className="rounded-[2.2rem] border border-slate-800 opacity-80 group-hover:opacity-100 transition-opacity duration-700 w-full h-[600px] object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                 <div className="bg-slate-900/80 backdrop-blur-2xl border border-white/10 p-10 rounded-[2.5rem] text-center max-w-lg shadow-2xl scale-110">
                    <div className="bg-blue-500 w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/40">
                      <Rocket className="text-white" size={24} />
                    </div>
                    <h3 className="text-white font-black text-2xl mb-3 tracking-tight italic uppercase">Cycle Time = Strategy</h3>
                    <p className="text-slate-400 text-sm leading-relaxed font-medium">"In high-growth companies, the winner isn't the one with the best idea, it's the one who iterates the fastest. SimulAPI is our engine for pure velocity."</p>
                 </div>
              </div>
            </div>
          </div>
        </section>

        {/* The Growth Narrative Section */}
        <section id="problem" className="py-40 bg-slate-50 mt-40 overflow-hidden relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-24 items-center">
              <div className="space-y-8">
                <Badge variant="outline" className="px-3 py-1 font-bold text-primary border-primary/20 uppercase tracking-widest text-[10px]">THE INSIGHT</Badge>
                <h2 className="text-5xl md:text-6xl font-black tracking-tighter leading-[0.95] text-slate-900">
                  Stop Paying the <br/> <span className="text-primary underline decoration-blue-200 underline-offset-8">"Prompt Tax."</span>
                </h2>
                <div className="space-y-6 text-slate-600 font-medium text-lg leading-relaxed">
                  <p>Building a SaaS product is a race against time. But most engineering teams are stuck in a "Waiting Loop." Waiting for backend specs, waiting for staging, waiting for data.</p>
                  <p>You probably use AI to generate dummy JSON. That's a <strong>manual cost center.</strong> It's slow, it consumes tokens, and it doesn't scale.</p>
                  <div className="space-y-4 pt-4">
                    <div className="flex items-center space-x-4 group">
                      <div className="w-10 h-10 rounded-xl bg-white shadow-md border border-slate-100 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                        <Users size={18} />
                      </div>
                      <span className="text-slate-900 font-black uppercase tracking-tight text-sm italic">Unblock 100% of your frontend team today.</span>
                    </div>
                    <div className="flex items-center space-x-4 group">
                      <div className="w-10 h-10 rounded-xl bg-white shadow-md border border-slate-100 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                        <BarChart3 size={18} />
                      </div>
                      <span className="text-slate-900 font-black uppercase tracking-tight text-sm italic">Reduce integration friction by 85%.</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative">
                <div className="absolute inset-0 bg-blue-500/5 blur-[120px] rounded-full"></div>
                <Card className="border-none shadow-[0_20px_50px_rgba(0,0,0,0.05)] bg-white rounded-[2rem] p-8 hover:-translate-y-2 transition-all duration-500 relative z-10">
                  <Cpu className="text-primary mb-6" size={32} />
                  <h4 className="font-black uppercase italic tracking-tighter text-lg mb-2">Automated Ops</h4>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed">Dynamic data generation that understands your schema. No prompts, just logic.</p>
                </Card>
                <Card className="border-none shadow-[0_20px_50px_rgba(0,0,0,0.05)] bg-white rounded-[2rem] p-8 hover:-translate-y-2 transition-all duration-500 sm:mt-12 relative z-10">
                  <ShieldCheck className="text-emerald-500 mb-6" size={32} />
                  <h4 className="font-black uppercase italic tracking-tighter text-lg mb-2">Native Trust</h4>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed">Integrated Ajv validation ensures your frontend calls are production-ready.</p>
                </Card>
                <Card className="border-none shadow-[0_20px_50px_rgba(0,0,0,0.05)] bg-white rounded-[2rem] p-8 hover:-translate-y-2 transition-all duration-500 relative z-10">
                  <Clock className="text-amber-500 mb-6" size={32} />
                  <h4 className="font-black uppercase italic tracking-tighter text-lg mb-2">Chaos Logic</h4>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed">Inject latency and errors to test resilience. Build for the real world.</p>
                </Card>
                <Card className="border-none shadow-[0_20px_50px_rgba(0,0,0,0.05)] bg-white rounded-[2rem] p-8 hover:-translate-y-2 transition-all duration-500 sm:mt-12 relative z-10">
                  <Globe className="text-blue-500 mb-6" size={32} />
                  <h4 className="font-black uppercase italic tracking-tighter text-lg mb-2">Public Moats</h4>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed">Shareable staging URLs. Demo your features before the backend exists.</p>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Grid / Strategy Section */}
        <section id="features" className="py-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 mb-24">
            <Badge variant="secondary" className="px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-slate-100 text-slate-500">THE TECH STACK</Badge>
            <h2 className="text-5xl font-black tracking-tighter text-slate-900 leading-tight">Built for Builders, <br/>Architected for Scale.</h2>
            <p className="text-slate-500 max-w-2xl mx-auto font-medium text-lg leading-relaxed">Everything you need to turn documentation into a living API environment.</p>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-16">
            {[
              { 
                icon: Layers, 
                title: "Monorepo Native", 
                desc: "SimulAPI handles multiple projects and API versions in one unified workspace. Perfect for complex SaaS architectures." 
              },
              { 
                icon: Code2, 
                title: "Zero-Config Parser", 
                desc: "Drag and drop your OpenAPI JSON or YAML. We handle the heavy lifting, dereferencing, and schema mapping instantly." 
              },
              { 
                icon: Zap, 
                title: "Ultra-Fast Mocking", 
                desc: "Generated on the fly using high-performance Node.js runtimes. Low latency, high concurrency, infinite scale." 
              }
            ].map((feature, i) => (
              <div key={i} className="group space-y-6 text-left">
                <div className="w-16 h-16 bg-white shadow-xl border border-slate-100 rounded-3xl flex items-center justify-center group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-primary/5">
                  <feature.icon size={28} />
                </div>
                <h3 className="text-2xl font-black italic uppercase tracking-tighter text-slate-900">{feature.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action / The Growth Loop */}
        <section className="py-40 px-4">
          <div className="max-w-6xl mx-auto bg-slate-950 rounded-[4rem] p-16 md:p-24 text-center text-white shadow-[0_50px_100px_rgba(0,0,0,0.4)] relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(37,99,235,0.2),transparent_70%)] pointer-events-none"></div>
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/30 blur-[120px] rounded-full group-hover:scale-110 transition-transform duration-1000"></div>
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/20 blur-[120px] rounded-full group-hover:scale-110 transition-transform duration-1000 delay-200"></div>
            
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-10 leading-[0.95]">
              Stop Waiting. <br/> <span className="text-primary italic">Start Shipping.</span>
            </h2>
            <p className="text-slate-400 text-xl max-w-2xl mx-auto mb-12 font-medium leading-relaxed">
              Join the elite engineering teams who use SimulAPI to bypass backend bottlenecks and maintain 100% velocity. 
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-6 sm:space-y-0 sm:space-x-8">
              <Button asChild size="lg" className="h-20 px-16 text-lg font-black uppercase tracking-widest rounded-full bg-white text-slate-950 hover:bg-primary hover:text-white transition-all border-none shadow-2xl scale-110 hover:scale-115">
                <Link href="/register">Unblock Your Team <ArrowRight className="ml-3" size={24} /></Link>
              </Button>
            </div>
            <div className="mt-16 pt-10 border-t border-white/10 flex flex-wrap justify-center gap-10 opacity-40 grayscale group-hover:grayscale-0 transition-all duration-700">
               <div className="flex items-center space-x-2 font-black uppercase italic tracking-tighter text-xl">
                 <Terminal size={24} /> <span>Developer First</span>
               </div>
               <div className="flex items-center space-x-2 font-black uppercase italic tracking-tighter text-xl">
                 <Lock size={24} /> <span>Secure</span>
               </div>
               <div className="flex items-center space-x-2 font-black uppercase italic tracking-tighter text-xl">
                 <Globe size={24} /> <span>Open Source</span>
               </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white border-t border-slate-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-20">
            <div className="space-y-6 col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2">
                <div className="bg-primary p-1 rounded-md shadow-lg shadow-primary/20">
                  <Terminal size={16} className="text-white" />
                </div>
                <span className="text-xl font-black tracking-tighter uppercase italic">SimulAPI</span>
              </div>
              <p className="text-slate-500 font-medium max-w-sm leading-relaxed">
                The strategic mocking platform for high-velocity teams. Built to turn API design into a competitive growth lever.
              </p>
              <div className="flex space-x-4">
                <Button variant="outline" size="icon" asChild className="rounded-xl border-slate-200 shadow-sm">
                  <a href="https://github.com/bat-tasavour/SimulAPI" target="_blank"><Github size={20} /></a>
                </Button>
              </div>
            </div>
            <div className="space-y-6">
              <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Strategic Moat</h4>
              <ul className="space-y-4 text-sm font-bold text-slate-600 uppercase tracking-widest">
                <li><a href="#features" className="hover:text-primary transition-colors">Features</a></li>
                <li><Link href="/docs" className="hover:text-primary transition-colors">Documentation</Link></li>
                <li><a href="https://github.com/bat-tasavour/SimulAPI" className="hover:text-primary transition-colors">Open Source</a></li>
              </ul>
            </div>
            <div className="space-y-6">
              <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Trust & Auth</h4>
              <ul className="space-y-4 text-sm font-bold text-slate-600 uppercase tracking-widest">
                <li className="flex items-center"><Lock size={14} className="mr-2" /> JWT Secured</li>
                <li className="flex items-center"><ShieldCheck size={14} className="mr-2" /> AJV Validated</li>
              </ul>
            </div>
          </div>
          <div className="mt-24 pt-8 border-t border-slate-100 flex flex-col items-center text-center space-y-4">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 leading-loose">
              © 2026 SimulAPI · Designed & Developed by <a href="https://syedtasavour.me" target="_blank" className="text-slate-900 hover:text-primary transition-colors border-b border-slate-200 hover:border-primary">Syed Tasavour</a>
            </p>
            <div className="flex space-x-8 text-[9px] font-bold uppercase tracking-widest text-slate-400">
              <Link href="/privacy" className="hover:text-slate-900 transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-slate-900 transition-colors">Terms of Service</Link>
              <Link href="/about" className="hover:text-slate-900 transition-colors">About Us</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}