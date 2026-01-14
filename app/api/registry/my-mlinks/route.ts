import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import MLink from '@/models/MLink';

// GET - List user's registered mlinks
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const ownerAddress = searchParams.get('address');

    if (!ownerAddress) {
      return NextResponse.json(
        { error: { message: 'Address parameter is required' } },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const mlinks = await MLink.find({
      ownerAddress: ownerAddress.toLowerCase(),
    })
      .select('mlinkId actionUrl name description icon status tags createdAt updatedAt')
      .sort({ createdAt: -1 });

    return NextResponse.json({ mlinks });
  } catch (error) {
    console.error('Error fetching user mlinks:', error);
    return NextResponse.json(
      { error: { message: 'Failed to fetch MLinks' } },
      { status: 500 }
    );
  }
}
