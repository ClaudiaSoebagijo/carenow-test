import { NextRequest, NextResponse } from "next/server";
import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data.json');

export async function POST(req: NextRequest) {
    const newEntry = await req.json();

    let existingData = [];
    if (fs.existsSync(DATA_FILE)) {
        const file = fs.readFileSync(DATA_FILE, 'utf-8');
        existingData = JSON.parse(file);
    }

    existingData.push(newEntry);
    console.log('New entry added:', newEntry);
    fs.writeFileSync(DATA_FILE, JSON.stringify(existingData, null, 2));

    return NextResponse.json({ message: 'Data saved' });
}
