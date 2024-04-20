import { connect, disconnect } from "@/db/dbConfig";
import EntryModel, { IEntry } from "@/models/EntryModel";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

type Data = { message: string } | IEntry | IEntry[];

export async function GET(_req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    await connect();
    const entries = await EntryModel.find().sort({ createdAt: "ascending" });
    await disconnect();
    return NextResponse.json(entries);
  } catch (err) {
    await disconnect();
    console.log(err);
    return res.status(500).json({ message: "Server Error" });
  }
}

export async function POST(req: NextRequest, res: NextApiResponse<Data>) {
  try {
    const reqBody = await req.json();
    const { description } = reqBody;

    const newEntry = new EntryModel({
      description,
      createdAt: Date.now(),
    });

    await connect();
    await newEntry.save();
    await disconnect();

    return NextResponse.json(newEntry);
  } catch (err: any) {
    await disconnect();
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
