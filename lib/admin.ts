// Admin wallet addresses that can approve/block mlinks
// Add your admin wallet addresses here (lowercase)
export const ADMIN_ADDRESSES: string[] = [
  '0x6fdaa3b94bfbe5dc96c4f148c811f74138e92171',
];

/**
 * Check if an address is an admin
 */
export function isAdmin(address: string | undefined | null): boolean {
  if (!address) return false;
  return ADMIN_ADDRESSES.includes(address.toLowerCase());
}

/**
 * Validate admin access from request
 * Expects x-admin-address header with a signed message for production
 * For simplicity, we'll just check the address header
 */
export function validateAdminAccess(address: string | undefined | null): {
  isValid: boolean;
  error?: string;
} {
  if (!address) {
    return {
      isValid: false,
      error: 'Admin address is required',
    };
  }

  if (!isAdmin(address)) {
    return {
      isValid: false,
      error: 'Not authorized. Admin access required.',
    };
  }

  return { isValid: true };
}
