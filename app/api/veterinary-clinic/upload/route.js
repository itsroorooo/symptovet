// app/api/upload/route.js

import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid'; // You'd need to install this package

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('profileImage');
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }
    
    // In a production app, you would likely upload to a storage service like S3, Firebase Storage, etc.
    // This is a simple example saving locally (not recommended for production)
    
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Generate a unique filename
    const filename = `${uuidv4()}${path.extname(file.name)}`;
    const filepath = path.join(process.cwd(), 'public', 'uploads', filename);
    
    // Ensure directory exists and write file
    // In a real app you should include proper error handling and dir checking
    await writeFile(filepath, buffer);
    
    // Return the URL to the saved file
    return NextResponse.json({ 
      imageUrl: `/uploads/${filename}` 
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'File upload failed' },
      { status: 500 }
    );
  }
}

// Note: You'll need to configure the server to allow larger uploads
// In your next.config.js:
// module.exports = {
//   api: {
//     bodyParser: {
//       sizeLimit: '8mb',
//     },
//   },
// };