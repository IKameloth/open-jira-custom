import { connect, disconnect } from "@/db/dbConfig";
import EntryModel, { IEntry } from "@/models/EntryModel";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

type Data = { message: string } | IEntry | IEntry[];

export async function GET(_req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    await connect();
    const entries = await EntryModel.find().sort({ createdAt: "ascending" });
    await disconnect();
    // return res.status(200).json(entries);
    return NextResponse.json(entries);
  } catch (err) {
    await disconnect();
    console.log(err);
    return res.status(500).json({ message: "Server Error" });
  }
}

export async function POST(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { description = "" } = req.body;

  const newEntry = new EntryModel({
    description,
    createdAt: Date.now(),
  });

  try {
    await connect();
    await newEntry.save();
    await disconnect();

    // return res.status(201).json(newEntry);
    return NextResponse.json(newEntry);
  } catch (err) {
    await disconnect();
    console.log(err);
    return res.status(500).json({ message: "Server Error" });
  }
}
