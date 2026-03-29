"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, ChevronRight, Zap, ShieldAlert, Terminal, Plus, Globe, Database, Info, XCircle } from "lucide-react";

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
  const [newRequestSchema, setNewRequestSchema] = useState('{\n  "type": "object",\n  "properties": {\n    "name": { "type": "string" }\n  }\n}');
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    if (!newPath) return setError("Endpoint path is required.");
    setCreating(true);
    setError(null);

    try {
      let resSchema = {};
      let reqSchema = null;

      try {
        resSchema = JSON.parse(newResponseSchema);
      } catch (e) {
        setError("Invalid JSON in Response Schema");
        setCreating(false);
        return;
      }

      if (["POST", "PUT", "PATCH"].includes(newMethod)) {
        try {
          reqSchema = JSON.parse(newRequestSchema);
        } catch (e) {
          setError("Invalid JSON in Request Schema");
          setCreating(false);
          return;
        }
      }

      const res = await fetch(`/api/projects/${params.projectId}/endpoints/manual`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          method: newMethod,
          path: newPath,
          responseSchema: resSchema,
          requestSchema: reqSchema
        }),
      });

      if (res.ok) {
        setIsModalOpen(false);
        setNewPath("");
        fetchEndpoints();
      } else {
        const data = await res.json();
        setError(data.error || "Failed to create endpoint");
      }
    } catch (error) {
      setError("Network error: Could not reach the server.");
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
        <div className="flex items-center space-x-4 text-left">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/dashboard">
              <ArrowLeft size={20} />
            </Link>
          </Button>
          <div>
            <h2 className="text-2xl font-black italic uppercase tracking-tighter text-slate-900">API Endpoints</h2>
            <p className="text-sm text-muted-foreground font-medium">Manage and create mock routes for this project</p>
          </div>
        </div>

        <Dialog open={isModalOpen} onOpenChange={(val) => { setIsModalOpen(val); if (!val) setError(null); }}>
          <DialogTrigger asChild>
            <Button className="shadow-lg shadow-primary/20 font-black uppercase tracking-widest h-12 px-8 rounded-xl">
              <Plus size={18} className="mr-2" strokeWidth={3} />
              New Endpoint
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[650px] rounded-[2rem]">
            <DialogHeader>
              <DialogTitle className="text-xl font-black uppercase italic tracking-tighter">Initialize Mock Endpoint</DialogTitle>
              <DialogDescription className="text-xs font-bold uppercase tracking-widest">
                Define a custom route for your frontend integration
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-6 py-4">
              {error && (
                <div className="p-3 bg-rose-50 border border-rose-100 rounded-xl flex items-center space-x-2 text-rose-600 text-[10px] font-bold uppercase animate-in fade-in slide-in-from-top-1">
                  <XCircle size={14} />
                  <span>{error}</span>
                </div>
              )}

              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">API Type (Method)</Label>
                <div className="grid grid-cols-5 gap-2">
                  {["GET", "POST", "PUT", "DELETE", "PATCH"].map((m) => (
                    <Button
                      key={m}
                      type="button"
                      variant={newMethod === m ? "default" : "outline"}
                      size="sm"
                      className={cn("text-[10px] font-black h-8 transition-all", newMethod === m ? "shadow-md" : "")}
                      onClick={() => { setNewMethod(m); setError(null); }}
                    >
                      {m}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="path" className="text-[10px] font-black uppercase tracking-widest text-slate-400">Endpoint Path</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
                    <Globe size={14} />
                  </div>
                  <Input 
                    id="path" 
                    placeholder="/api/v1/users" 
                    className="pl-9 font-mono text-sm h-10 rounded-xl bg-slate-50" 
                    value={newPath}
                    onChange={(e) => { setNewPath(e.target.value); if (error) setError(null); }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="schema" className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center">
                    <Database size={12} className="mr-1.5" /> Response Payload (JSON)
                  </Label>
                  <Textarea 
                    id="schema" 
                    rows={8} 
                    className="font-mono text-[10px] leading-relaxed bg-slate-50 border-slate-200 rounded-xl p-4 shadow-inner"
                    value={newResponseSchema}
                    onChange={(e) => { setNewResponseSchema(e.target.value); if (error) setError(null); }}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="req-schema" className={cn(
                    "text-[10px] font-black uppercase tracking-widest flex items-center transition-opacity",
                    ["POST", "PUT", "PATCH"].includes(newMethod) ? "text-slate-400" : "text-slate-200"
                  )}>
                    <Info size={12} className="mr-1.5" /> Request Payload Schema
                  </Label>
                  <Textarea 
                    id="req-schema" 
                    rows={8} 
                    disabled={!["POST", "PUT", "PATCH"].includes(newMethod)}
                    className="font-mono text-[10px] leading-relaxed bg-slate-50 border-slate-200 rounded-xl p-4 shadow-inner disabled:opacity-30"
                    value={newRequestSchema}
                    onChange={(e) => { setNewRequestSchema(e.target.value); if (error) setError(null); }}
                  />
                </div>
              </div>
            </div>

            <DialogFooter className="pt-2">
              <Button variant="ghost" className="text-[10px] font-black uppercase tracking-widest" onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button onClick={handleCreateEndpoint} disabled={creating} className="font-black uppercase tracking-widest rounded-xl px-8 h-12 shadow-xl shadow-primary/20">
                {creating ? "Processing..." : "Create Endpoint"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <Card className="shadow-2xl border-slate-100 overflow-hidden rounded-[2rem]">
        <div className="px-6 py-4 bg-slate-50/50 border-b flex justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
          <span>Method & Path</span>
          <span>Simulation Config</span>
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
                  <Badge variant={getMethodVariant(ep.method)} className="w-16 justify-center font-black">
                    {ep.method}
                  </Badge>
                  <p className="ml-4 text-sm font-mono font-bold text-slate-700 truncate tracking-tight">
                    {ep.path}
                  </p>
                </div>
                
                <div className="flex items-center space-x-6 text-[10px] font-black uppercase tracking-widest">
                  <div className="flex items-center text-slate-400">
                    <Zap size={14} className={`mr-1.5 ${ep.config?.latency > 0 ? 'text-amber-500 fill-amber-500' : ''}`} />
                    <span className={ep.config?.latency > 0 ? 'text-slate-900' : ''}>{ep.config?.latency || 0}ms</span>
                  </div>
                  <div className="flex items-center text-slate-400">
                    <ShieldAlert size={14} className={`mr-1.5 ${ep.config?.errorRate > 0 ? 'text-rose-500 fill-rose-500' : ''}`} />
                    <span className={ep.config?.errorRate > 0 ? 'text-slate-900' : ''}>{ep.config?.errorRate || 0}% FAIL</span>
                  </div>
                  <ChevronRight size={18} className="text-slate-300 group-hover:text-primary group-hover:translate-x-1 transition-all" strokeWidth={3} />
                </div>
              </div>
            </Link>
          ))}
          {endpoints.length === 0 && (
            <div className="px-6 py-20 text-center text-muted-foreground bg-white">
              <div className="inline-flex items-center justify-center p-6 bg-slate-50 rounded-full mb-6 shadow-inner">
                <Terminal size={40} className="text-slate-300" />
              </div>
              <p className="text-sm font-black uppercase italic tracking-tighter">No endpoints detected.</p>
              <p className="text-xs font-medium text-slate-400 mt-1">Click "New Endpoint" to begin manual definition.</p>
            </div>
          )}
        </div>
      </Card>

      <Card className="bg-slate-900 text-white border-none shadow-[0_30px_60px_-12px_rgba(0,0,0,0.3)] rounded-[3rem] overflow-hidden group">
        <CardContent className="p-8 flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0 relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[80px] rounded-full group-hover:scale-110 transition-transform duration-1000"></div>
          <div className="text-center md:text-left relative z-10">
            <h3 className="text-xl font-black italic uppercase tracking-tighter mb-1">Project Integration Active</h3>
            <p className="text-slate-400 text-xs font-medium">All endpoints are available under project ID: <code className="bg-white/10 px-2 py-0.5 rounded text-white border border-white/10 font-mono">{params.projectId}</code></p>
          </div>
          <Badge className="bg-white/10 hover:bg-white/20 text-white border-white/10 px-6 py-2 backdrop-blur-sm rounded-full relative z-10 font-black uppercase tracking-[0.2em] text-[10px]">
             <Globe size={16} className="mr-2 animate-pulse" />
             <span>Global Mock Engine</span>
          </Badge>
        </CardContent>
      </Card>
    </div>
  );
}