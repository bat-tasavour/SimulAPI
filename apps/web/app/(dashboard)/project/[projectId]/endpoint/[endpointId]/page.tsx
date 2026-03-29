"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Editor from "@monaco-editor/react";
import { useMockStore } from "@/store/mock.store";
import Link from "next/link";
import { ArrowLeft, Play, Save, Settings, Database, Terminal, ExternalLink, CheckCircle2, AlertCircle, Zap, Globe, Cpu, Clock, Route, Info, Copy, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default function EndpointPlayground() {
  const params = useParams();
  const [endpoint, setEndpoint] = useState<any>(null);
  const [latency, setLatency] = useState(0);
  const [errorRate, setErrorRate] = useState(0);
  const [method, setMethod] = useState("");
  const [path, setPath] = useState("");
  const [saving, setSaving] = useState(false);
  const [requestBody, setRequestBody] = useState("{}");
  const [activeTab, setActiveTab] = useState<"response" | "request" | "trace">("response");
  const [copiedEndpoint, setCopiedEndpoint] = useState(false);
  const [copiedPayload, setCopiedPayload] = useState(false);
  
  const { trace, loading, sendRequest } = useMockStore();

  useEffect(() => {
    fetch(`/api/projects/${params.projectId}/endpoints`)
      .then((res) => res.json())
      .then((data) => {
        const ep = data.endpoints?.find((e: any) => e._id === params.endpointId);
        if (ep) {
          setEndpoint(ep);
          setLatency(ep.config?.latency || 0);
          setErrorRate(ep.config?.errorRate || 0);
          setMethod(ep.method);
          setPath(ep.path);
        }
      });
  }, [params.projectId, params.endpointId]);

  const handleSaveConfig = async () => {
    setSaving(true);
    try {
      const res = await fetch(`/api/endpoints/${params.endpointId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ latency, errorRate, method, path }),
      });
      if (res.ok) {
        const data = await res.json();
        setEndpoint(data.endpoint);
      }
    } catch (e) {
      console.error("Save error", e);
    } finally {
      setSaving(false);
    }
  };

  const handleSendRequest = async () => {
    let body = undefined;
    if (["POST", "PUT", "PATCH"].includes(endpoint.method)) {
      try {
        body = JSON.parse(requestBody);
      } catch (e) {
        alert("Invalid JSON in request body");
        return;
      }
    }
    
    await sendRequest(`/api/mock/${params.projectId}${endpoint.path}`, endpoint.method, body);
    setActiveTab("trace");
  };

  const copyToClipboard = (text: string, type: "endpoint" | "payload") => {
    navigator.clipboard.writeText(text);
    if (type === "endpoint") {
      setCopiedEndpoint(true);
      setTimeout(() => setCopiedEndpoint(false), 2000);
    } else {
      setCopiedPayload(true);
      setTimeout(() => setCopiedPayload(false), 2000);
    }
  };

  const getMethodVariant = (m: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (m) {
      case "GET": return "secondary";
      case "POST": return "default";
      case "DELETE": return "destructive";
      default: return "outline";
    }
  };

  if (!endpoint) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="h-8 w-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
    </div>
  );

  const mockUrl = `${window.location.origin}/api/mock/${params.projectId}${endpoint.path}`;

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href={`/project/${params.projectId}`}>
              <ArrowLeft size={20} />
            </Link>
          </Button>
          <div className="flex items-center space-x-3">
            <Badge variant={getMethodVariant(endpoint.method)} className="font-black px-3 py-1 text-sm uppercase">
              {endpoint.method}
            </Badge>
            <h2 className="text-xl font-mono font-bold text-slate-800 tracking-tight truncate max-w-md">
              {endpoint.path}
            </h2>
          </div>
        </div>

        <div className="flex items-center space-x-2">
           <Badge variant="outline" className="text-[10px] hidden sm:block font-bold">MOCK ENVIRONMENT</Badge>
           <Button variant="outline" size="sm" onClick={() => copyToClipboard(mockUrl, "endpoint")} className="shadow-sm">
             {copiedEndpoint ? <Check size={14} className="mr-2 text-green-500" /> : <Copy size={14} className="mr-2 text-primary" />}
             Copy URL
           </Button>
           <Button variant="outline" size="sm" asChild className="shadow-sm">
             <a href={`/api/mock/${params.projectId}${endpoint.path}`} target="_blank">
               <ExternalLink size={14} className="mr-2 text-primary" />
               Open
             </a>
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        <div className="lg:col-span-1 space-y-6">
          <Card className="shadow-lg border-slate-200">
            <CardHeader className="p-5 border-b flex flex-row items-center space-x-2 space-y-0 bg-slate-50/50">
              <Settings size={18} className="text-muted-foreground" />
              <CardTitle className="text-xs font-bold uppercase tracking-wider">Configuration</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-4 pb-4 border-b border-slate-100">
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">HTTP Method</Label>
                  <div className="grid grid-cols-3 gap-1">
                    {["GET", "POST", "PUT", "DELETE", "PATCH"].map((m) => (
                      <button
                        key={m}
                        onClick={() => setMethod(m)}
                        className={cn(
                          "px-1 py-1 text-[10px] font-bold rounded border transition-all",
                          method === m 
                            ? "bg-primary text-white border-primary shadow-sm" 
                            : "bg-white text-slate-500 border-slate-200 hover:border-primary/50"
                        )}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Path</Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
                      <Route size={14} />
                    </div>
                    <Input 
                      value={path} 
                      onChange={(e) => setPath(e.target.value)} 
                      className="pl-9 h-8 text-xs font-mono"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-6 pt-2">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label className="text-[10px] font-black uppercase tracking-widest flex items-center text-muted-foreground">
                      <Clock size={12} className="mr-1.5" /> Latency
                    </Label>
                    <span className="text-xs font-mono font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">{latency}ms</span>
                  </div>
                  <Slider 
                    value={[latency]} 
                    onValueChange={(vals) => setLatency(vals[0])} 
                    max={5000} 
                    step={100} 
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label className="text-[10px] font-black uppercase tracking-widest flex items-center text-muted-foreground">
                      <AlertCircle size={12} className="mr-1.5" /> Error Rate
                    </Label>
                    <span className="text-xs font-mono font-bold text-destructive bg-destructive/10 px-2 py-0.5 rounded">{errorRate}%</span>
                  </div>
                  <Slider 
                    value={[errorRate]} 
                    onValueChange={(vals) => setErrorRate(vals[0])} 
                    max={100} 
                    step={5} 
                  />
                </div>
              </div>

              <Button onClick={handleSaveConfig} disabled={saving} className="w-full shadow-md font-bold mt-4">
                {saving ? (
                  <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Save size={14} className="mr-2" />
                    Apply & Save
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 text-white shadow-xl shadow-slate-900/20 overflow-hidden relative">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Cpu size={80} />
            </div>
            <CardContent className="p-6 space-y-4 text-center relative z-10">
              <div className="flex justify-center">
                <div className="p-3 bg-white/10 rounded-full border border-white/20">
                  <Play size={24} fill="white" className="ml-1" />
                </div>
              </div>
              <h3 className="font-bold text-lg">Live Test</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Execute a real request against your mock engine to inspect data flow.
              </p>
              <Button 
                variant="secondary" 
                onClick={handleSendRequest} 
                disabled={loading} 
                className="w-full bg-blue-600 hover:bg-blue-500 text-white border-none shadow-lg font-black uppercase tracking-widest text-[10px]"
              >
                {loading ? "EXECUTING..." : "Run Simulator"}
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3">
          <Card className="shadow-2xl border-slate-200 overflow-hidden h-[750px] flex flex-col">
            <Tabs value={activeTab} onValueChange={(val: any) => setActiveTab(val)} className="flex flex-col h-full">
              <CardHeader className="bg-slate-50 border-b space-y-0 p-1">
                <TabsList className="grid w-full grid-cols-3 bg-transparent h-auto">
                  <TabsTrigger value="response" className="data-[state=active]:bg-white data-[state=active]:shadow-sm py-2">
                    <Database size={14} className="mr-2" /> Mock Response
                  </TabsTrigger>
                  <TabsTrigger value="request" disabled={!["POST", "PUT", "PATCH"].includes(endpoint.method)} className="data-[state=active]:bg-white data-[state=active]:shadow-sm py-2">
                    <Terminal size={14} className="mr-2" /> Request Data
                  </TabsTrigger>
                  <TabsTrigger value="trace" className="data-[state=active]:bg-white data-[state=active]:shadow-sm py-2">
                    <Globe size={14} className="mr-2" /> Network Trace
                  </TabsTrigger>
                </TabsList>
              </CardHeader>
              
              <div className="flex-grow flex flex-col relative overflow-hidden bg-white">
                <TabsContent value="request" className="flex-grow m-0 focus-visible:ring-0 flex flex-col">
                  <div className="flex flex-row h-full">
                    <div className="flex-1 flex flex-col border-r border-slate-100">
                      <div className="px-4 py-2 bg-slate-50/50 border-b text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center justify-between">
                        <div className="flex items-center">
                          <Terminal size={12} className="mr-2" /> Body Editor
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-6 px-2 text-[10px]"
                          onClick={() => copyToClipboard(requestBody, "payload")}
                        >
                          {copiedPayload ? <Check size={10} className="mr-1" /> : <Copy size={10} className="mr-1" />}
                          Copy
                        </Button>
                      </div>
                      <Editor
                        height="100%"
                        defaultLanguage="json"
                        value={requestBody}
                        onChange={(val) => setRequestBody(val || "")}
                        options={{ 
                          minimap: { enabled: false },
                          fontSize: 14,
                          padding: { top: 20 },
                          scrollBeyondLastLine: false,
                          fontFamily: "'Fira Code', monospace",
                        }}
                      />
                    </div>
                    <div className="w-1/3 flex flex-col bg-slate-50/30">
                      <div className="px-4 py-2 bg-slate-50/50 border-b text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center">
                        <Info size={12} className="mr-2" /> Schema Reference
                      </div>
                      <div className="flex-grow overflow-auto">
                        <Editor
                          height="100%"
                          defaultLanguage="json"
                          value={endpoint.requestSchema ? JSON.stringify(endpoint.requestSchema, null, 2) : "// No request schema defined"}
                          options={{ 
                            readOnly: true,
                            minimap: { enabled: false },
                            fontSize: 12,
                            padding: { top: 20 },
                            scrollBeyondLastLine: false,
                            fontFamily: "'Fira Code', monospace",
                            lineNumbers: "off",
                            folding: true,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="response" className="flex-grow m-0 flex flex-col focus-visible:ring-0">
                  <div className={cn(
                    "px-6 py-2 flex items-center justify-between border-b",
                    trace?.response && (trace.response.status < 400 ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700")
                  )}>
                    <div className="flex items-center text-[10px] font-black uppercase tracking-widest">
                      {trace?.response ? (
                        <>
                          {trace.response.status < 400 ? <CheckCircle2 size={14} className="mr-2" /> : <AlertCircle size={14} className="mr-2" />}
                          HTTP {trace.response.status} {trace.response.statusText}
                        </>
                      ) : (
                        <span className="text-slate-400 italic">No response yet</span>
                      )}
                    </div>
                    {trace?.response && (
                      <div className="flex items-center space-x-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-6 px-2 text-[10px]"
                          onClick={() => copyToClipboard(JSON.stringify(trace.response?.data, null, 2), "payload")}
                        >
                          {copiedPayload ? <Check size={10} className="mr-1" /> : <Copy size={10} className="mr-1" />}
                          Copy Response
                        </Button>
                        <Badge variant="outline" className="font-mono text-[10px] bg-white/50">{trace.response.latency}ms</Badge>
                      </div>
                    )}
                  </div>
                  <div className="flex-grow">
                    <Editor
                      height="100%"
                      defaultLanguage="json"
                      value={trace?.response ? JSON.stringify(trace.response.data, null, 2) : "// Run a test to see the generated mock response"}
                      options={{ 
                        readOnly: true, 
                        minimap: { enabled: false },
                        fontSize: 14,
                        padding: { top: 20 },
                        scrollBeyondLastLine: false,
                        fontFamily: "'Fira Code', monospace",
                      }}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="trace" className="flex-grow m-0 flex flex-col overflow-y-auto p-6 space-y-8 bg-slate-50 focus-visible:ring-0">
                  {!trace ? (
                    <div className="h-full flex flex-col items-center justify-center text-muted-foreground italic">
                      <Globe size={40} className="mb-4 opacity-20" />
                      Execute a request to view network details
                    </div>
                  ) : (
                    <>
                      <section className="space-y-3">
                        <div className="flex justify-between items-center">
                          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Outgoing Request</h4>
                          {trace.response?.data?.meta?.validated !== undefined && (
                            <Badge variant={trace.response.status < 400 ? "outline" : "destructive"} className="text-[8px] h-5">
                              {trace.response.status < 400 ? "SCHEMA VALIDATED" : "VALIDATION FAILED"}
                            </Badge>
                          )}
                        </div>
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                          <div className="p-4 bg-slate-900 text-white font-mono text-xs flex items-center">
                            <span className={cn("px-2 py-0.5 rounded text-[10px] font-black mr-3", 
                              trace.request.method === "GET" ? "bg-emerald-500" : "bg-blue-500")}>
                              {trace.request.method}
                            </span>
                            {trace.request.url}
                          </div>
                          <div className="p-4 space-y-4">
                            <div>
                              <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">Request Headers</p>
                              <div className="grid grid-cols-1 gap-1">
                                {Object.entries(trace.request.headers).map(([k, v]) => (
                                  <div key={k} className="flex text-xs border-b border-slate-50 pb-1 last:border-0">
                                    <span className="font-bold text-slate-600 w-32 shrink-0">{k}:</span>
                                    <span className="text-slate-500 truncate">{v}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                            {trace.request.body && (
                              <div>
                                <div className="flex justify-between items-center mb-2">
                                  <p className="text-[10px] font-bold text-slate-400 uppercase">Request Body</p>
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="h-5 px-1.5 text-[8px]"
                                    onClick={() => copyToClipboard(JSON.stringify(trace.request.body, null, 2), "payload")}
                                  >
                                    <Copy size={8} className="mr-1" /> Copy
                                  </Button>
                                </div>
                                <pre className="bg-slate-50 p-3 rounded-lg text-xs font-mono text-slate-600 overflow-x-auto border border-slate-100">
                                  {JSON.stringify(trace.request.body, null, 2)}
                                </pre>
                              </div>
                            )}
                          </div>
                        </div>
                      </section>

                      {trace.response && (
                        <section className="space-y-3">
                          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Incoming Response</h4>
                          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                            <div className={cn("p-4 text-white font-mono text-xs flex items-center justify-between", 
                              trace.response.status < 400 ? "bg-emerald-600" : "bg-rose-600")}>
                              <span>{trace.response.status} {trace.response.statusText}</span>
                              <span className="text-[10px] opacity-80">{trace.response.latency}ms</span>
                            </div>
                            <div className="p-4 space-y-4">
                              <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">Response Headers</p>
                                <div className="grid grid-cols-1 gap-1">
                                  {Object.entries(trace.response.headers).map(([k, v]) => (
                                    <div key={k} className="flex text-xs border-b border-slate-50 pb-1 last:border-0">
                                      <span className="font-bold text-slate-600 w-32 shrink-0">{k}:</span>
                                      <span className="text-slate-500 truncate">{v}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              
                              {/* Validation Errors Display */}
                              {trace.response.data?.error?.code === "VALIDATION_ERROR" && (
                                <div className="bg-rose-50 p-3 rounded-lg border border-rose-100 space-y-2">
                                  <p className="text-[10px] text-rose-600 font-bold uppercase">Schema Validation Failed</p>
                                  <pre className="text-[10px] font-mono text-rose-800 overflow-x-auto">
                                    {JSON.stringify(trace.response.data.error.details, null, 2)}
                                  </pre>
                                </div>
                              )}

                              <div>
                                <div className="flex justify-between items-center mb-2">
                                  <p className="text-[10px] font-bold text-slate-400 uppercase">Response Body (Payload)</p>
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="h-5 px-1.5 text-[8px]"
                                    onClick={() => copyToClipboard(JSON.stringify(trace.response?.data, null, 2), "payload")}
                                  >
                                    <Copy size={8} className="mr-1" /> Copy
                                  </Button>
                                </div>
                                <pre className="bg-slate-50 p-3 rounded-lg text-xs font-mono text-slate-600 overflow-x-auto border border-slate-100">
                                  {JSON.stringify(trace.response.data, null, 2)}
                                </pre>
                              </div>
                            </div>
                          </div>
                        </section>
                      )}
                    </>
                  )}
                </TabsContent>
              </div>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  );
}