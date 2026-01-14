import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import ApiKey, { generateApiKey } from '@/models/ApiKey';

// GET - List API keys for a wallet
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

    const keys = await ApiKey.find({
      ownerAddress: ownerAddress.toLowerCase(),
    }).sort({ createdAt: -1 });

    // Return full API keys (user can view/copy anytime)
    const formattedKeys = keys.map((key) => ({
      _id: key._id,
      name: key.name,
      key: key.key,
      createdAt: key.createdAt,
      lastUsedAt: key.lastUsedAt,
      isActive: key.isActive,
    }));

    return NextResponse.json({ keys: formattedKeys });
  } catch (error) {
    console.error('Error fetching API keys:', error);
    return NextResponse.json(
      { error: { message: 'Failed to fetch API keys' } },
      { status: 500 }
    );
  }
}

// POST - Create a new API key
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { ownerAddress, name } = body;

    if (!ownerAddress) {
      return NextResponse.json(
        { error: { message: 'Owner address is required' } },
        { status: 400 }
      );
    }

    if (!name || name.trim().length === 0) {
      return NextResponse.json(
        { error: { message: 'Key name is required' } },
        { status: 400 }
      );
    }

    await connectToDatabase();

    // Check if user already has 5 keys (limit)
    const existingKeys = await ApiKey.countDocuments({
      ownerAddress: ownerAddress.toLowerCase(),
    });

    if (existingKeys >= 5) {
      return NextResponse.json(
        { error: { message: 'Maximum 5 API keys allowed per wallet' } },
        { status: 400 }
      );
    }

    // Generate new API key
    const key = generateApiKey();

    const apiKey = new ApiKey({
      key,
      name: name.trim(),
      ownerAddress: ownerAddress.toLowerCase(),
    });

    await apiKey.save();

    // Return the full key only on creation (user should save it)
    return NextResponse.json(
      {
        key: {
          _id: apiKey._id,
          key: apiKey.key, // Full key - only shown once!
          name: apiKey.name,
          createdAt: apiKey.createdAt,
        },
        message: 'API key created. Save it now - it won\'t be shown again!',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating API key:', error);
    return NextResponse.json(
      { error: { message: 'Failed to create API key' } },
      { status: 500 }
    );
  }
}
