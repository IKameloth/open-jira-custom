import { isValidObjectId } from "mongoose";
import { connect, disconnect } from "./dbConfig";
import EntryModel, { IEntry } from "../models/EntryModel";

export const getEntryById = async (id: string): Promise<IEntry | null> => {
  if (!isValidObjectId(id)) return null;

  await connect();

  const entry = await EntryModel.findById(id).lean();
  await disconnect();

  return JSON.parse(JSON.stringify(entry));
};
