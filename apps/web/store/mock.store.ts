import { create } from "zustand";

export type NetworkTrace = {
  request: {
    url: string;
    method: string;
    headers: Record<string, string>;
    body: any;
  };
  response: {
    status: number;
    statusText: string;
    headers: Record<string, string>;
    data: any;
    latency: number;
  } | null;
  loading: boolean;
  error: string | null;
};

type MockState = {
  trace: NetworkTrace | null;
  loading: boolean;
  sendRequest: (url: string, method: string, body?: any) => Promise<void>;
  clearTrace: () => void;
};

export const useMockStore = create<MockState>((set) => ({
  trace: null,
  loading: false,
  clearTrace: () => set({ trace: null }),
  sendRequest: async (url, method, body) => {
    const requestHeaders = body ? { "Content-Type": "application/json" } : {};
    
    const initialTrace: NetworkTrace = {
      request: { url, method, headers: requestHeaders, body },
      response: null,
      loading: true,
      error: null,
    };

    set({ loading: true, trace: initialTrace });
    const start = Date.now();

    try {
      const res = await fetch(url, {
        method,
        headers: requestHeaders,
        body: body ? JSON.stringify(body) : undefined,
      });
      
      const latency = Date.now() - start;
      const data = await res.json();
      
      const responseHeaders: Record<string, string> = {};
      res.headers.forEach((value, key) => {
        responseHeaders[key] = value;
      });

      set({ 
        loading: false, 
        trace: {
          ...initialTrace,
          loading: false,
          response: {
            status: res.status,
            statusText: res.statusText,
            headers: responseHeaders,
            data,
            latency
          }
        }
      });
    } catch (error: any) {
      set({ 
        loading: false, 
        trace: {
          ...initialTrace,
          loading: false,
          error: error.message
        }
      });
    }
  },
}));