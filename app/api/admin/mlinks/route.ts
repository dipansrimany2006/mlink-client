import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { validateAdminAccess } from '@/lib/admin';
import MLink from '@/models/MLink';

/**
 * GET - List all mlinks for admin review
 * Query params: status, page, limit, search
 */
export async function GET(request: NextRequest) {
  try {
    // Validate admin access
    const adminAddress = request.headers.get('x-admin-address');
    const adminCheck = validateAdminAccess(adminAddress);

    if (!adminCheck.isValid) {
      return NextResponse.json(
        { error: { message: adminCheck.error } },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status'); // pending, approved, blocked, or all
    const page = parseInt(searchParams.get('page') || '1');
    const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 100);
    const search = searchParams.get('search');

    await connectToDatabase();

    // Build query
    const query: Record<string, unknown> = {};

    if (status && status !== 'all') {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { actionUrl: { $regex: search, $options: 'i' } },
        { ownerAddress: { $regex: search, $options: 'i' } },
      ];
    }

    const skip = (page - 1) * limit;

    const [mlinks, total, statusCounts] = await Promise.all([
      MLink.find(query)
        .select('mlinkId actionUrl name description icon tags status ownerAddress createdAt updatedAt')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      MLink.countDocuments(query),
      // Get counts for each status
      MLink.aggregate([
        {
          $group: {
            _id: '$status',
            count: { $sum: 1 },
          },
        },
      ]),
    ]);

    // Format status counts
    const counts = {
      all: 0,
      pending: 0,
      approved: 0,
      blocked: 0,
    };

    statusCounts.forEach((item: { _id: string; count: number }) => {
      counts[item._id as keyof typeof counts] = item.count;
      counts.all += item.count;
    });

    return NextResponse.json({
      mlinks,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
      counts,
    });
  } catch (error) {
    console.error('Error fetching mlinks for admin:', error);
    return NextResponse.json(
      { error: { message: 'Failed to fetch MLinks' } },
      { status: 500 }
    );
  }
}
