// app/api/veterinary-clinic/appointments/route.js
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const appointmentsFilePath = path.join(process.cwd(), 'data', 'appointments.json');

export async function POST(request) {
  try {
    const { petName, ownerName, date } = await request.json();

    // Read existing appointments
    let appointmentsData = [];
    if (fs.existsSync(appointmentsFilePath)) {
      appointmentsData = JSON.parse(fs.readFileSync(appointmentsFilePath, 'utf8'));
    }

    // Add new appointment
    appointmentsData.push({ id: Date.now(), petName, ownerName, date });

    // Save updated appointments
    fs.writeFileSync(appointmentsFilePath, JSON.stringify(appointmentsData));

    return NextResponse.json({ message: 'Appointment request received' });
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}