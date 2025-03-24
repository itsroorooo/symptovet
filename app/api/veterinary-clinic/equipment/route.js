// app/api/veterinary-clinic/equipment/route.js
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const equipmentFilePath = path.join(process.cwd(), 'data', 'equipment.json');

export async function POST(request) {
  const { name, description } = await request.json();
  const equipmentData = JSON.parse(fs.readFileSync(equipmentFilePath, 'utf8') || []);
  equipmentData.push({ id: Date.now(), name, description });
  fs.writeFileSync(equipmentFilePath, JSON.stringify(equipmentData));
  return NextResponse.json({ message: 'Equipment added successfully' });
}