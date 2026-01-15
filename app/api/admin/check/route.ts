import { NextRequest, NextResponse } from 'next/server';
import { isAdmin } from '@/lib/admin';

/**
 * GET - Check if the provided address is an admin
 */
export async function GET(request: NextRequest) {
  const address = request.headers.get('x-admin-address');

  if (!address) {
    return NextResponse.json({ isAdmin: false });
  }

  return NextResponse.json({ isAdmin: isAdmin(address) });
}
