import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { validateApiKey } from '@/lib/auth';
import MLink from '@/models/MLink';

// PUT - Update a mlink
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authResult = await validateApiKey(request);
    if (!authResult.isValid) {
      return NextResponse.json(
        { error: { message: authResult.error } },
        { status: 401 }
      );
    }

    const { id } = await params;
    const body = await request.json();
    const { name, description, icon, tags } = body;

    await connectToDatabase();

    // Find mlink and verify ownership
    const mlink = await MLink.findOne({ mlinkId: id });

    if (!mlink) {
      return NextResponse.json(
        { error: { message: 'MLink not found' } },
        { status: 404 }
      );
    }

    if (mlink.ownerAddress !== authResult.ownerAddress!.toLowerCase()) {
      return NextResponse.json(
        { error: { message: 'Not authorized to update this MLink' } },
        { status: 403 }
      );
    }

    // Update allowed fields
    const updates: Record<string, unknown> = {};
    if (name) updates.name = name;
    if (description) updates.description = description;
    if (icon) updates.icon = icon;
    if (tags && Array.isArray(tags)) updates.tags = tags.slice(0, 10);

    // Reset status to pending on significant changes
    if (name || description) {
      updates.status = 'pending';
    }

    const updatedMLink = await MLink.findOneAndUpdate(
      { mlinkId: id },
      updates,
      { new: true }
    );

    return NextResponse.json({
      mlink: {
        mlinkId: updatedMLink!.mlinkId,
        actionUrl: updatedMLink!.actionUrl,
        name: updatedMLink!.name,
        description: updatedMLink!.description,
        icon: updatedMLink!.icon,
        status: updatedMLink!.status,
        tags: updatedMLink!.tags,
        updatedAt: updatedMLink!.updatedAt,
      },
      message:
        updates.status === 'pending'
          ? 'MLink updated. Status reset to pending review.'
          : 'MLink updated successfully.',
    });
  } catch (error) {
    console.error('Error updating mlink:', error);
    return NextResponse.json(
      { error: { message: 'Failed to update MLink' } },
      { status: 500 }
    );
  }
}

// DELETE - Delete a mlink
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authResult = await validateApiKey(request);
    if (!authResult.isValid) {
      return NextResponse.json(
        { error: { message: authResult.error } },
        { status: 401 }
      );
    }

    const { id } = await params;

    await connectToDatabase();

    const result = await MLink.findOneAndDelete({
      mlinkId: id,
      ownerAddress: authResult.ownerAddress!.toLowerCase(),
    });

    if (!result) {
      return NextResponse.json(
        { error: { message: 'MLink not found or not authorized' } },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'MLink deleted successfully' });
  } catch (error) {
    console.error('Error deleting mlink:', error);
    return NextResponse.json(
      { error: { message: 'Failed to delete MLink' } },
      { status: 500 }
    );
  }
}
