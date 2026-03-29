"use client";

import { useEffect, useState } from "react";
import { useProjectStore } from "@/store/project.store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus, Folder, Calendar, ArrowRight, FileJson, Clock, AlertCircle, XCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

export default function DashboardPage() {
  const { projects, setProjects } = useProjectStore();
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const [specInput, setSpecInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        setProjects(data.projects || []);
        setLoading(false);
      });
  }, [setProjects]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreating(true);
    setError(null);

    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newProjectName, spec: specInput }),
      });
      
      const data = await res.json();
      if (res.ok) {
        router.push(`/project/${data.projectId}`);
      } else {
        setError(data.error || "Failed to create project");
      }
    } catch (error: any) {
      setError("Network error: Could not reach the server.");
    } finally {
      setIsCreating(false);
    }
  };

  const loadExample = () => {
    setSpecInput(JSON.stringify({
      openapi: "3.0.0",
      info: { title: "Simple API", version: "1.0.0" },
      paths: {
        "/hello": {
          get: {
            responses: {
              "200": {
                description: "Success",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        message: { type: "string", example: "Hello World" }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }, null, 2));
    if (!newProjectName) setNewProjectName("Example API");
    setError(null);
  };

  const loadExampleYaml = () => {
    setSpecInput(`openapi: 3.0.0
info:
  title: Simple YAML API
  version: 1.0.0
paths:
  /welcome:
    get:
      responses:
        '200':
          description: Success
          content:
            application/json:
              schema:
                type: object
                properties:
                  message:
                    type: string
                    example: Welcome to YAML Mocks
`);
    if (!newProjectName) setNewProjectName("Example YAML API");
    setError(null);
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="flex flex-col items-center space-y-4">
        <div className="h-10 w-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
        <span className="text-sm font-medium text-muted-foreground">Loading your workspace...</span>
      </div>
    </div>
  );

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 uppercase italic">Project Overview</h1>
          <p className="mt-2 text-muted-foreground max-w-xl font-medium">
            Manage your mock environments, import new specs, and unblock your frontend development.
          </p>
        </div>
        <Badge variant="secondary" className="px-3 py-1 font-black uppercase tracking-widest">
          {projects.length} {projects.length === 1 ? 'Project' : 'Projects'}
        </Badge>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Link key={project._id} href={`/project/${project._id}`}>
            <Card className="group hover:border-primary transition-all relative overflow-hidden h-full shadow-lg shadow-slate-200/20">
              <CardHeader className="flex flex-row items-center space-x-3 space-y-0">
                <div className="p-2 bg-slate-100 rounded-lg group-hover:bg-primary/10 transition-colors">
                  <Folder className="text-slate-400 group-hover:text-primary" size={20} />
                </div>
                <CardTitle className="text-lg font-black uppercase italic truncate group-hover:text-primary transition-colors tracking-tighter">
                  {project.name}
                </CardTitle>
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity text-primary">
                  <ArrowRight size={18} />
                </div>
              </CardHeader>
              <CardFooter className="pt-0">
                <div className="flex items-center text-[10px] font-black uppercase tracking-widest text-slate-400">
                  <Calendar size={12} className="mr-1.5" />
                  {new Date(project.createdAt).toLocaleDateString()}
                </div>
              </CardFooter>
            </Card>
          </Link>
        ))}
        
        {projects.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center py-16 px-4 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
             <div className="p-4 bg-white rounded-full shadow-sm mb-4">
               <FileJson size={32} className="text-slate-300" />
             </div>
             <h3 className="text-lg font-bold">No projects yet</h3>
             <p className="text-muted-foreground text-sm mt-1 mb-6 text-center max-w-xs">Start by importing an OpenAPI specification below.</p>
             <Button variant="outline" onClick={() => document.getElementById('new-project-form')?.scrollIntoView({ behavior: 'smooth' })}>
               Create your first project
             </Button>
          </div>
        )}
      </div>

      <Card id="new-project-form" className="shadow-2xl border-slate-100 mt-12 overflow-hidden rounded-[2rem]">
        <div className="h-1.5 bg-primary w-full" />
        <CardHeader className="bg-slate-50/50 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 bg-primary rounded-xl text-white shadow-lg shadow-primary/20">
                <Plus size={24} strokeWidth={3} />
              </div>
              <div>
                <CardTitle className="text-xl font-black uppercase italic tracking-tighter">New Project</CardTitle>
                <CardDescription className="text-xs font-bold uppercase tracking-widest">Destroy the backend bottleneck</CardDescription>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                className="text-[10px] h-8 uppercase font-black tracking-widest rounded-lg border-2 hover:bg-primary hover:text-white transition-all"
                onClick={loadExample}
              >
                Load JSON
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                className="text-[10px] h-8 uppercase font-black tracking-widest rounded-lg border-2 hover:bg-primary hover:text-white transition-all"
                onClick={loadExampleYaml}
              >
                Load YAML
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-8">
          <form onSubmit={handleCreate} className="space-y-8">
            {error && (
              <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-start space-x-3 animate-in fade-in slide-in-from-top-2">
                <XCircle className="text-rose-500 mt-0.5 shrink-0" size={20} />
                <div className="space-y-1">
                  <p className="text-sm font-black text-rose-900 uppercase tracking-tight leading-none">Creation Failed</p>
                  <p className="text-xs text-rose-600 font-medium leading-relaxed">{error}</p>
                </div>
              </div>
            )}

            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="project-name" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Strategic Project Name</Label>
                <Input
                  id="project-name"
                  required
                  className="h-12 rounded-xl bg-slate-50 border-slate-200 focus:bg-white transition-all text-sm font-bold"
                  placeholder="e.g. Next-Gen Payments API"
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center ml-1">
                  <Label htmlFor="spec" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">OpenAPI Spec (JSON/YAML)</Label>
                  <Badge variant="outline" className="text-[10px] uppercase font-black tracking-widest border-primary/20 text-primary">Version 3.0 Ready</Badge>
                </div>
                <Textarea
                  id="spec"
                  required
                  rows={12}
                  className="font-mono text-xs leading-relaxed bg-slate-50 border-slate-200 focus:bg-white rounded-2xl p-6 shadow-inner"
                  placeholder='{ "openapi": "3.0.0", "info": { ... }, "paths": { ... } }'
                  value={specInput}
                  onChange={(e) => {
                    setSpecInput(e.target.value);
                    if (error) setError(null);
                  }}
                />
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button type="submit" disabled={isCreating} className="h-14 px-12 text-sm font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-primary/30 transition-all hover:scale-105 active:scale-95">
                {isCreating ? (
                  <>
                    <Clock className="animate-spin mr-3" size={20} />
                    Parsing Engine...
                  </>
                ) : (
                  <>
                    Initialize Project
                    <ArrowRight className="ml-3" size={20} />
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}