"use client";

import { useEffect, useState } from "react";
import { useProjectStore } from "@/store/project.store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus, Folder, Calendar, ArrowRight, FileJson, Clock } from "lucide-react";

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
        alert("Failed to create project: " + data.error);
      }
    } catch (error: any) {
      alert("Error: " + error.message);
    } finally {
      setIsCreating(false);
    }
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
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Project Overview</h1>
          <p className="mt-2 text-muted-foreground max-w-xl">
            Manage your mock environments, import new specs, and unblock your frontend development.
          </p>
        </div>
        <Badge variant="secondary" className="px-3 py-1">
          {projects.length} {projects.length === 1 ? 'Project' : 'Projects'}
        </Badge>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Link key={project._id} href={`/project/${project._id}`}>
            <Card className="group hover:border-primary transition-all relative overflow-hidden h-full">
              <CardHeader className="flex flex-row items-center space-x-3 space-y-0">
                <div className="p-2 bg-slate-100 rounded-lg group-hover:bg-primary/10 transition-colors">
                  <Folder className="text-slate-400 group-hover:text-primary" size={20} />
                </div>
                <CardTitle className="text-lg font-bold truncate group-hover:text-primary transition-colors">
                  {project.name}
                </CardTitle>
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight className="text-primary" size={18} />
                </div>
              </CardHeader>
              <CardFooter className="pt-0">
                <div className="flex items-center text-xs text-muted-foreground">
                  <Calendar size={14} className="mr-1.5" />
                  {new Date(project.createdAt).toLocaleDateString()}
                </div>
              </CardFooter>
            </Card>
          </Link>
        ))}
        
        {projects.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center py-16 px-4 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200">
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

      <Card id="new-project-form" className="shadow-xl shadow-slate-200/50 border-slate-100 mt-12 overflow-hidden">
        <div className="h-1 bg-primary w-full" />
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary/10 rounded-lg text-primary">
              <Plus size={24} />
            </div>
            <div>
              <CardTitle>New Project</CardTitle>
              <CardDescription>Import your OpenAPI specification to get started</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreate} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="project-name">Project Name</Label>
                <Input
                  id="project-name"
                  required
                  placeholder="e.g. My Awesome API"
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="spec">OpenAPI Spec (JSON)</Label>
                  <div className="flex items-center space-x-2">
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="sm" 
                      className="text-[10px] h-7 uppercase font-bold tracking-widest"
                      onClick={() => {
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
                      }}
                    >
                      Load Example
                    </Button>
                    <Badge variant="outline" className="text-[10px] uppercase font-bold tracking-widest px-2 py-0">JSON Required</Badge>
                  </div>
                </div>
                <Textarea
                  id="spec"
                  required
                  rows={10}
                  className="font-mono text-sm"
                  placeholder='{ "openapi": "3.0.0", ... }'
                  value={specInput}
                  onChange={(e) => setSpecInput(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex justify-end pt-4">
              <Button type="submit" disabled={isCreating} size="lg" className="min-w-[150px]">
                {isCreating ? (
                  <>
                    <Clock className="animate-spin mr-2" size={18} />
                    Parsing...
                  </>
                ) : (
                  <>
                    Create Project
                    <ArrowRight className="ml-2" size={18} />
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