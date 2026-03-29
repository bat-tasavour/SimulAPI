"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ArrowLeft, 
  Terminal, 
  Code2, 
  Zap, 
  ShieldCheck, 
  Globe, 
  Clock, 
  Save, 
  Play, 
  Cpu,
  BookOpen,
  ChevronRight,
  Github,
  CheckCircle2
} from "lucide-react";

import { useAuthStore } from "@/store/auth.store";

export default function DocsPage() {
  const { user } = useAuthStore();
  const sections = [
    {
      title: "Getting Started",
      id: "getting-started",
      content: "The goal of SimulAPI is simple: remove the backend bottleneck. In 60 seconds, you can have a fully functional, validated API endpoint running in your frontend project.",
      steps: [
        "Create an account or Sign In.",
        "On the Dashboard, click 'Create New Project'.",
        "Paste your OpenAPI JSON or YAML spec (or use the 'Load Example' button).",
        "Click 'Create Project' and watch your endpoints appear instantly."
      ]
    },
    {
      title: "Importing Specs",
      id: "importing",
      content: "SimulAPI is OpenAPI-native. We support version 3.0 and Swagger 2.0. When you import a spec, our engine automatically maps paths, methods, request schemas, and response types.",
      tips: [
        "Use JSON or YAML format.",
        "Ensure your spec has 'paths' and 'responses' defined.",
        "Dereferencing is handled automatically for complex schemas."
      ]
    },
    {
      title: "The Mock Engine",
      id: "mock-engine",
      content: "We don't just return static JSON. Our engine uses 'json-schema-faker' to generate realistic, dynamic data every time you call an endpoint.",
      features: [
        "Dynamic Data: Every request returns unique but valid data.",
        "Validation: We use Ajv to validate your frontend requests against the spec.",
        "Echo: See exactly what the server received in the Network Trace."
      ]
    },
    {
      title: "Chaos Engineering",
      id: "chaos",
      content: "Real backends are messy. SimulAPI lets you test your frontend's resilience without writing a single line of test code.",
      controls: [
        "Latency Slider: Simulate network lag from 0ms to 5000ms.",
        "Error Rate: Inject random 500 errors to test your error boundaries.",
        "Static Overrides: Save specific JSON responses for edge-case testing."
      ]
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white text-slate-900 font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Link href="/" className="flex items-center space-x-2">
              <div className="bg-primary p-1 rounded-lg">
                <Terminal className="text-white" size={18} />
              </div>
              <span className="text-lg font-black tracking-tighter uppercase italic">SimulAPI</span>
            </Link>
            <Badge variant="outline" className="ml-4 text-[10px] uppercase font-black tracking-widest border-primary/20 text-primary">DOCS v1.0</Badge>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild className="font-bold text-xs uppercase tracking-widest">
              <a href="https://github.com/bat-tasavour/SimulAPI" target="_blank"><Github className="mr-2" size={16} /> GitHub</a>
            </Button>
            {user ? (
              <Button asChild size="sm" className="font-black uppercase tracking-widest px-6 rounded-full shadow-lg shadow-primary/20">
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            ) : (
              <Button asChild size="sm" className="font-black uppercase tracking-widest px-6 rounded-full shadow-lg shadow-primary/20">
                <Link href="/register">Start Mocking Free</Link>
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="flex-grow max-w-7xl w-full mx-auto py-20 px-4 sm:px-6 lg:px-8 grid md:grid-cols-4 gap-12">
        {/* Sidebar Nav */}
        <aside className="hidden md:block space-y-8 sticky top-36 h-fit">
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4">The Playbook</h4>
            <nav className="space-y-2">
              {sections.map(s => (
                <a 
                  key={s.id} 
                  href={`#${s.id}`} 
                  className="block text-sm font-bold text-slate-600 hover:text-primary transition-colors py-1"
                >
                  {s.title}
                </a>
              ))}
            </nav>
          </div>
          <Card className="bg-slate-900 text-white border-none rounded-2xl overflow-hidden shadow-xl">
            <CardContent className="p-6 space-y-4 text-center">
              <Cpu className="text-blue-400 mx-auto" size={32} />
              <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Strategic Edge</p>
              <p className="text-xs font-medium leading-relaxed">"Ship 10x faster by removing backend dependencies."</p>
            </CardContent>
          </Card>
        </aside>

        {/* Content */}
        <div className="md:col-span-3 space-y-24">
          <section className="space-y-6">
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter leading-[0.95]">
              The High-Velocity <br/> <span className="text-primary italic underline decoration-blue-100 underline-offset-8">API Strategy.</span>
            </h1>
            <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-2xl">
              SimulAPI is more than a mock server. It's an engineering multiplier. Use this documentation to master the art of zero-script API mocking.
            </p>
          </section>

          {sections.map((section) => (
            <section key={section.id} id={section.id} className="space-y-8 scroll-mt-24">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center border border-primary/10">
                  <BookOpen className="text-primary" size={20} />
                </div>
                <h2 className="text-3xl font-black italic uppercase tracking-tight text-slate-900">{section.title}</h2>
              </div>
              
              <div className="space-y-6 max-w-3xl">
                <p className="text-lg text-slate-600 font-medium leading-relaxed">
                  {section.content}
                </p>

                {section.steps && (
                  <div className="bg-slate-50 rounded-[2rem] p-8 border border-slate-100 space-y-6 shadow-inner">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Step-by-Step Integration</h4>
                    <div className="space-y-4">
                      {section.steps.map((step, i) => (
                        <div key={i} className="flex items-start space-x-4">
                          <span className="w-6 h-6 rounded-full bg-primary text-white text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                          <span className="text-slate-700 font-bold">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {section.features && (
                  <div className="grid sm:grid-cols-3 gap-4">
                    {section.features.map((f, i) => (
                      <Card key={i} className="border border-slate-100 shadow-sm rounded-2xl">
                        <CardContent className="p-4 flex items-start space-x-3">
                          <CheckCircle2 className="text-emerald-500 mt-0.5 shrink-0" size={16} />
                          <span className="text-[11px] font-bold uppercase tracking-tight leading-tight">{f}</span>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}

                {section.controls && (
                  <div className="grid sm:grid-cols-3 gap-4">
                    {section.controls.map((c, i) => (
                      <Card key={i} className="border border-slate-100 shadow-sm rounded-2xl bg-white group hover:border-primary/30 transition-all">
                        <CardContent className="p-4 space-y-2">
                          <Zap className="text-amber-500 group-hover:scale-110 transition-transform" size={18} />
                          <span className="block text-[11px] font-black uppercase italic tracking-tighter leading-tight">{c}</span>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </section>
          ))}

          {/* Integration Example */}
          <section className="py-12 border-t border-slate-100">
            <div className="space-y-8">
              <h3 className="text-2xl font-black uppercase italic tracking-tighter">Strategic Integration</h3>
              <div className="bg-slate-900 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-6 opacity-10">
                  <Code2 size={100} className="text-white" />
                </div>
                <div className="space-y-6 relative z-10 font-mono text-sm">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                    <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-slate-500">// Configure your frontend base URL</p>
                    <p className="text-white"><span className="text-blue-400">const</span> BASE_URL = <span className="text-emerald-400">"https://simulapi.com/api/mock/your_project_id"</span>;</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-slate-500">// Start fetching data before the backend even builds the controller</p>
                    <p className="text-white"><span className="text-blue-400">const</span> data = <span className="text-blue-400">await</span> fetch(<span className="text-blue-400">`</span>${"{"}<span className="text-white">BASE_URL</span>{"}"}<span className="text-emerald-400">/users</span><span className="text-blue-400">`</span>).then(r =&gt; r.json());</p>
                  </div>
                  <p className="text-blue-400 italic mt-4">// Result: Realistic, validated, and high-speed mock data.</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer className="bg-white border-t border-slate-100 py-20 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 leading-loose">
            © 2026 SimulAPI · Designed & Developed by <a href="https://syedtasavour.me" target="_blank" className="text-slate-900 hover:text-primary transition-colors border-b border-slate-200 hover:border-primary">Syed Tasavour</a>
          </p>
          <div className="flex justify-center items-center space-x-6">
            <Button asChild size="sm" className="font-black uppercase tracking-widest rounded-full px-8 shadow-lg shadow-primary/20">
              <Link href="/register">Start Mocking Free</Link>
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
}