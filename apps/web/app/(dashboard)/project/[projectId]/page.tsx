"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, ChevronRight, Zap, ShieldAlert, Terminal, Plus, Globe } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export default function ProjectView() {
  const params = useParams();
  const [endpoints, setEndpoints] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // New Endpoint Form State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newMethod, setNewMethod] = useState("GET");
  const [newPath, setNewPath] = useState("");
  const [newResponseSchema, setNewResponseSchema] = useState('{\n  "type": "object",\n  "properties": {\n    "message": { "type": "string", "example": "Success" }\n  }\n}');
  const [creating, setCreating] = useState(false);

  const fetchEndpoints = () => {
    fetch(`/api/projects/${params.projectId}/endpoints`)
      .then((res) => res.json())
      .then((data) => {
        setEndpoints(data.endpoints || []);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchEndpoints();
  }, [params.projectId]);

  const handleCreateEndpoint = async () => {
    if (!newPath) return alert("Path is required");
    setCreating(true);
    try {
      let schema = {};
      try {
        schema = JSON.parse(newResponseSchema);
      } catch (e) {
        alert("Invalid JSON in Response Schema");
        setCreating(false);
        return;
      }

      const res = await fetch(`/api/projects/${params.projectId}/endpoints/manual`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          method: newMethod,
          path: newPath,
          responseSchema: schema
        }),
      });

      if (res.ok) {
        setIsModalOpen(false);
        setNewPath("");
        fetchEndpoints();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setCreating(false);
    }
  };

  const getMethodVariant = (method: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (method) {
      case "GET": return "secondary";
      case "POST": return "default";
      case "DELETE": return "destructive";
      default: return "outline";
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="h-10 w-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/dashboard">
              <ArrowLeft size={20} />
            </Link>
          </Button>
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">API Endpoints</h2>
            <p className="text-sm text-muted-foreground">Manage and create mock routes for this project</p>
          </div>
        </div>

        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button className="shadow-lg shadow-primary/20 font-bold">
              <Plus size={18} className="mr-2" />
              New Endpoint
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Create Mock Endpoint</DialogTitle>
              <DialogDescription>
                Define a new route manually. You can specify the method and expected response structure.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-6 py-4">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">API Type (Method)</Label>
                <div className="grid grid-cols-5 gap-2">
                  {["GET", "POST", "PUT", "DELETE", "PATCH"].map((m) => (
                    <Button
                      key={m}
                      type="button"
                      variant={newMethod === m ? "default" : "outline"}
                      size="sm"
                      className={cn("text-[10px] font-black h-8", newMethod === m ? "shadow-md" : "")}
                      onClick={() => setNewMethod(m)}
                    >
                      {m}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="path" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Endpoint Path</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
                    <Globe size={14} />
                  </div>
                  <Input 
                    id="path" 
                    placeholder="/api/v1/users" 
                    className="pl-9 font-mono text-sm" 
                    value={newPath}
                    onChange={(e) => setNewPath(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="schema" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Response Schema (JSON)</Label>
                <Textarea 
                  id="schema" 
                  rows={6} 
                  className="font-mono text-xs leading-relaxed bg-slate-50"
                  value={newResponseSchema}
                  onChange={(e) => setNewResponseSchema(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button onClick={handleCreateEndpoint} disabled={creating} className="font-bold">
                {creating ? "Creating..." : "Create Endpoint"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <Card className="shadow-lg border-slate-100 overflow-hidden">
        <div className="px-6 py-4 bg-slate-50 border-b flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          <span>Method & Path</span>
          <span>Configuration</span>
        </div>
        <div className="divide-y divide-slate-100">
          {endpoints.map((ep) => (
            <Link
              key={ep._id}
              href={`/project/${params.projectId}/endpoint/${ep._id}`}
              className="block hover:bg-slate-50/50 transition-all group"
            >
              <div className="px-6 py-5 flex items-center justify-between">
                <div className="flex items-center min-w-0">
                  <Badge variant={getMethodVariant(ep.method)} className="w-16 justify-center">
                    {ep.method}
                  </Badge>
                  <p className="ml-4 text-sm font-mono font-medium text-slate-700 truncate">
                    {ep.path}
                  </p>
                </div>
                
                <div className="flex items-center space-x-6 text-xs font-medium">
                  <div className="flex items-center text-muted-foreground">
                    <Zap size={14} className={`mr-1.5 ${ep.config?.latency > 0 ? 'text-amber-500' : ''}`} />
                    <span className={ep.config?.latency > 0 ? 'text-slate-900' : ''}>{ep.config?.latency || 0}ms</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <ShieldAlert size={14} className={`mr-1.5 ${ep.config?.errorRate > 0 ? 'text-rose-500' : ''}`} />
                    <span className={ep.config?.errorRate > 0 ? 'text-slate-900' : ''}>{ep.config?.errorRate || 0}% Fail</span>
                  </div>
                  <ChevronRight size={18} className="text-slate-300 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </Link>
          ))}
          {endpoints.length === 0 && (
            <div className="px-6 py-16 text-center text-muted-foreground">
              <div className="inline-flex items-center justify-center p-4 bg-slate-50 rounded-full mb-4">
                <Terminal size={32} className="text-slate-200" />
              </div>
              <p className="text-sm font-medium">No endpoints detected. Click "New Endpoint" to start.</p>
            </div>
          )}
        </div>
      </Card>

      <Card className="bg-primary text-primary-foreground border-none shadow-xl shadow-primary/20">
        <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold">Project Integration</h3>
            <p className="text-primary-foreground/80 text-sm">All endpoints are available under the project mock ID: <code className="bg-white/20 px-1 rounded">{params.projectId}</code></p>
          </div>
          <Badge className="bg-white/20 hover:bg-white/30 text-white border-white/30 px-4 py-1.5 backdrop-blur-sm">
             <Globe size={16} className="mr-2" />
             <span className="text-xs font-bold uppercase tracking-widest">Global Mock Active</span>
          </Badge>
        </CardContent>
      </Card>
    </div>
  );
}