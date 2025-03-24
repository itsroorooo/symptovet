// app/api/veterinary-clinic/dashboard/route.js
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const appointmentsFilePath = path.join(process.cwd(), 'data', 'appointments.json');
const notificationsFilePath = path.join(process.cwd(), 'data', 'notifications.json');
const equipmentFilePath = path.join(process.cwd(), 'data', 'equipment.json');
const recordsFilePath = path.join(process.cwd(), 'data', 'records.json');

export async function GET() {
  try {
    // Read data from files
    const appointments = JSON.parse(fs.readFileSync(appointmentsFilePath, 'utf8'));
    const notifications = JSON.parse(fs.readFileSync(notificationsFilePath, 'utf8'));
    const equipment = JSON.parse(fs.readFileSync(equipmentFilePath, 'utf8'));
    const records = JSON.parse(fs.readFileSync(recordsFilePath, 'utf8'));

    // Return aggregated data
    return NextResponse.json({
      appointments: appointments.slice(0, 5), // Show only the first 5 items
      notifications: notifications.slice(0, 5),
      equipment: equipment.slice(0, 5),
      records: records.slice(0, 5),
    });
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}