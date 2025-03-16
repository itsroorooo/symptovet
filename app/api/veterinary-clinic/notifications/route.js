// app/api/veterinary-clinic/notifications/route.js
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const notificationsFilePath = path.join(process.cwd(), 'data', 'notifications.json');

export async function GET() {
  const notificationsData = JSON.parse(fs.readFileSync(notificationsFilePath, 'utf8') || []);
  return NextResponse.json(notificationsData);
}