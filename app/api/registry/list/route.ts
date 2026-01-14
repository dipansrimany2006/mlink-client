import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import MLink from '@/models/MLink';

// GET - Public list of approved mlinks
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 100);
    const tag = searchParams.get('tag');
    const search = searchParams.get('search');

    await connectToDatabase();

    // Build query - only approved mlinks are public
    const query: Record<string, unknown> = { status: 'approved' };

    if (tag) {
      query.tags = tag;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const skip = (page - 1) * limit;

    const [mlinks, total] = await Promise.all([
      MLink.find(query)
        .select('mlinkId actionUrl name description icon tags createdAt')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      MLink.countDocuments(query),
    ]);

    return NextResponse.json({
      mlinks,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching mlinks:', error);
    return NextResponse.json(
      { error: { message: 'Failed to fetch MLinks' } },
      { status: 500 }
    );
  }
}
