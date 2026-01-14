import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { validateApiKey } from '@/lib/auth';
import { validateActionUrl } from '@/lib/mlinkValidator';
import MLink, { generateMlinkId } from '@/models/MLink';
import ApiKey from '@/models/ApiKey';

export async function POST(request: NextRequest) {
  try {
    // Validate API key
    const authResult = await validateApiKey(request);
    if (!authResult.isValid) {
      return NextResponse.json(
        { error: { message: authResult.error } },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { actionUrl, name, description, icon, tags } = body;

    // Validate required fields
    if (!actionUrl) {
      return NextResponse.json(
        { error: { message: 'actionUrl is required' } },
        { status: 400 }
      );
    }

    // Validate action URL accessibility and metadata
    const validation = await validateActionUrl(actionUrl);
    if (!validation.isValid) {
      return NextResponse.json(
        { error: { message: validation.error } },
        { status: 400 }
      );
    }

    await connectToDatabase();

    // Check if mlink already exists
    const existingMLink = await MLink.findOne({ actionUrl });
    if (existingMLink) {
      return NextResponse.json(
        { error: { message: 'An MLink with this action URL is already registered' } },
        { status: 409 }
      );
    }

    // Get the API key document for the reference
    const apiKey = await ApiKey.findOne({
      key: request.headers.get('x-api-key'),
    });

    if (!apiKey) {
      return NextResponse.json(
        { error: { message: 'API key not found' } },
        { status: 401 }
      );
    }

    // Validate tags
    const parsedTags = Array.isArray(tags) ? tags.slice(0, 10) : [];

    // Use provided metadata or fall back to fetched metadata
    const mlinkData = {
      mlinkId: generateMlinkId(),
      actionUrl,
      name: name || validation.metadata!.title,
      description: description || validation.metadata!.description,
      icon: icon || validation.metadata!.icon,
      ownerAddress: authResult.ownerAddress!.toLowerCase(),
      apiKeyId: apiKey._id,
      tags: parsedTags,
      status: 'pending',
    };

    const mlink = new MLink(mlinkData);
    await mlink.save();

    return NextResponse.json(
      {
        mlink: {
          mlinkId: mlink.mlinkId,
          actionUrl: mlink.actionUrl,
          name: mlink.name,
          description: mlink.description,
          icon: mlink.icon,
          status: mlink.status,
          tags: mlink.tags,
          createdAt: mlink.createdAt,
        },
        message: 'MLink registered successfully. Status: pending review.',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error registering mlink:', error);
    return NextResponse.json(
      { error: { message: 'Failed to register MLink' } },
      { status: 500 }
    );
  }
}
