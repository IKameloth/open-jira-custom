import mongoose, { Model, Schema } from "mongoose";
import { Entry } from "@/interfaces";

export interface IEntry extends Entry {}

export const entrySchema = new Schema({
  description: {
    type: String,
    required: [true, "Please provide a description"],
  },
  createdAt: { type: Number },
  status: {
    type: String,
    enum: {
      values: ["pending", "in-progress", "finished"],
      message: "{VALUE} is not valid status value",
    },
    default: "pending",
  },
});

const EntryModel: Model<IEntry> =
  mongoose.models.Entry || mongoose.model("Entry", entrySchema);

export default EntryModel;
