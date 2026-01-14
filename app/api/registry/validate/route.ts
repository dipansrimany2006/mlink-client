import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import MLink from '@/models/MLink';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

/**
 * GET - Validate if an action URL is registered in the registry
 * This endpoint is used by mlink-sdk to verify mlinks before rendering
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const actionUrl = searchParams.get('url');

    if (!actionUrl) {
      return NextResponse.json(
        {
          isRegistered: false,
          error: 'url parameter is required'
        },
        { status: 400, headers: corsHeaders }
      );
    }

    // Decode the URL if it's encoded
    const decodedUrl = decodeURIComponent(actionUrl);

    await connectToDatabase();

    // Check if mlink exists and is approved
    const mlink = await MLink.findOne({
      actionUrl: decodedUrl
    }).select('mlinkId name description icon status ownerAddress createdAt');

    if (!mlink) {
      return NextResponse.json(
        {
          isRegistered: false,
          status: null,
          error: 'This action URL is not registered in the MLinks registry. Please register it at https://mlinks-fe.vercel.app/dashboard/register'
        },
        { headers: corsHeaders }
      );
    }

    // Return registration status
    return NextResponse.json(
      {
        isRegistered: true,
        status: mlink.status,
        mlink: {
          mlinkId: mlink.mlinkId,
          name: mlink.name,
          description: mlink.description,
          icon: mlink.icon,
          status: mlink.status,
        },
        // If not approved, include a message
        ...(mlink.status !== 'approved' && {
          warning: mlink.status === 'pending'
            ? 'This MLink is pending review and may not be fully accessible.'
            : 'This MLink has been blocked for policy violations.'
        })
      },
      { headers: corsHeaders }
    );
  } catch (error) {
    console.error('Error validating mlink:', error);
    return NextResponse.json(
      {
        isRegistered: false,
        error: 'Failed to validate MLink'
      },
      { status: 500, headers: corsHeaders }
    );
  }
}

// Enable CORS for SDK requests
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
