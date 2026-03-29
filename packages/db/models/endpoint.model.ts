import mongoose, { Document, Model, Schema } from "mongoose";

export interface IEndpoint extends Document {
  projectId: string;
  path: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  requestSchema?: object;
  responseSchema: object;
  config: {
    latency: number;
    errorRate: number;
    staticResponse?: any;
  };
}

const EndpointSchema = new Schema<IEndpoint>({
  projectId: { type: String, required: true, index: true },
  path: { type: String, required: true },
  method: { type: String, required: true, enum: ["GET", "POST", "PUT", "DELETE", "PATCH"] },
  requestSchema: { type: Object, default: null },
  responseSchema: { type: Object, required: true },
  config: {
    latency: { type: Number, default: 0 },
    errorRate: { type: Number, default: 0 },
    staticResponse: { type: Schema.Types.Mixed, default: null },
  }
});

export const Endpoint: Model<IEndpoint> = mongoose.models.Endpoint || mongoose.model<IEndpoint>("Endpoint", EndpointSchema);