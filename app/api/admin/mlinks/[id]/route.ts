import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { validateAdminAccess } from '@/lib/admin';
import MLink from '@/models/MLink';

/**
 * PUT - Update mlink status (approve/block)
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

    const { id } = await params;
    const body = await request.json();
    const { status, reason } = body;

    // Validate status
    const validStatuses = ['pending', 'approved', 'blocked'];
    if (!status || !validStatuses.includes(status)) {
      return NextResponse.json(
        { error: { message: 'Invalid status. Must be pending, approved, or blocked' } },
        { status: 400 }
      );
    }

    await connectToDatabase();

    // Find and update the mlink
    const mlink = await MLink.findOneAndUpdate(
      { mlinkId: id },
      {
        status,
        statusReason: reason || undefined,
        statusUpdatedAt: new Date(),
        statusUpdatedBy: adminAddress,
      },
      { new: true }
    );

    if (!mlink) {
      return NextResponse.json(
        { error: { message: 'MLink not found' } },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      mlink: {
        mlinkId: mlink.mlinkId,
        name: mlink.name,
        status: mlink.status,
        statusReason: mlink.statusReason,
        statusUpdatedAt: mlink.statusUpdatedAt,
      },
    });
  } catch (error) {
    console.error('Error updating mlink status:', error);
    return NextResponse.json(
      { error: { message: 'Failed to update MLink status' } },
      { status: 500 }
    );
  }
}

/**
 * GET - Get single mlink details for admin
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

    const { id } = await params;

    await connectToDatabase();

    const mlink = await MLink.findOne({ mlinkId: id });

    if (!mlink) {
      return NextResponse.json(
        { error: { message: 'MLink not found' } },
        { status: 404 }
      );
    }

    return NextResponse.json({ mlink });
  } catch (error) {
    console.error('Error fetching mlink for admin:', error);
    return NextResponse.json(
      { error: { message: 'Failed to fetch MLink' } },
      { status: 500 }
    );
  }
}
