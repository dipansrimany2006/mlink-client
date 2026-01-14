import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import ApiKey from '@/models/ApiKey';

// DELETE - Revoke/delete an API key
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const ownerAddress = searchParams.get('address');

    if (!ownerAddress) {
      return NextResponse.json(
        { error: { message: 'Address parameter is required' } },
        { status: 400 }
      );
    }

    await connectToDatabase();

    // Find and delete the key (only if owned by the requester)
    const result = await ApiKey.findOneAndDelete({
      _id: id,
      ownerAddress: ownerAddress.toLowerCase(),
    });

    if (!result) {
      return NextResponse.json(
        { error: { message: 'API key not found or not authorized' } },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'API key deleted successfully' });
  } catch (error) {
    console.error('Error deleting API key:', error);
    return NextResponse.json(
      { error: { message: 'Failed to delete API key' } },
      { status: 500 }
    );
  }
}

// PATCH - Toggle API key active status
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { ownerAddress, isActive } = body;

    if (!ownerAddress) {
      return NextResponse.json(
        { error: { message: 'Owner address is required' } },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const apiKey = await ApiKey.findOneAndUpdate(
      {
        _id: id,
        ownerAddress: ownerAddress.toLowerCase(),
      },
      { isActive },
      { new: true }
    );

    if (!apiKey) {
      return NextResponse.json(
        { error: { message: 'API key not found or not authorized' } },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: `API key ${isActive ? 'activated' : 'deactivated'}`,
      isActive: apiKey.isActive,
    });
  } catch (error) {
    console.error('Error updating API key:', error);
    return NextResponse.json(
      { error: { message: 'Failed to update API key' } },
      { status: 500 }
    );
  }
}
