// app/api/veterinary-clinic/records/route.js
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const recordsFilePath = path.join(process.cwd(), 'data', 'records.json');

export async function GET() {
  const recordsData = JSON.parse(fs.readFileSync(recordsFilePath, 'utf8') || []);
  return NextResponse.json(recordsData);
}