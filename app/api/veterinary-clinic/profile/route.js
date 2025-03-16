// app/api/profile/route.js

import { NextResponse } from 'next/server';

export async function GET() {
  // In a real app, you would fetch the user's profile from your database
  // This is just an example response
  return NextResponse.json({
    name: 'John Doe',
    description: 'Software Developer with 5 years of experience in React and Next.js',
    address: '123 Main Street, Anytown, CA 12345',
    schedule: 'Monday-Friday, 9AM-5PM',
    imageUrl: '/api/placeholder/150/150'
  });
}

export async function PUT(request) {
  try {
    // Get the updated profile data from the request
    const profileData = await request.json();
    
    // In a real app, you would validate the data and save it to your database
    // For example:
    // await db.profiles.update({
    //   where: { userId: session.user.id },
    //   data: profileData
    // });
    
    // Return the updated profile
    return NextResponse.json({ 
      ...profileData,
      updated: new Date().toISOString()
    });
  } catch (error) {
    console.error('Profile update error:', error);
    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 }
    );
  }
}