import mongoose, { Document, Model, Schema } from "mongoose";

export interface IProject extends Document {
  userId: string;
  name: string;
  spec: object;
  createdAt: Date;
}

const ProjectSchema = new Schema<IProject>({
  userId: { type: String, required: true, index: true },
  name: { type: String, required: true },
  spec: { type: Object, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Project: Model<IProject> = mongoose.models.Project || mongoose.model<IProject>("Project", ProjectSchema);