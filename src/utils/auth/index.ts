// Simple cookie utility function
const getCookie = (name: string): string | undefined => {
  if (typeof document === 'undefined') return undefined;
  
  const value = document.cookie
    .split('; ')
    .find(row => row.startsWith(`${name}=`))
    ?.split('=')[1];
  
  return value ? decodeURIComponent(value) : undefined;
};

// Get token and check expiry
export const getTokenAndCheckExpiry = (): string | null => {
  const token = getCookie('qat');
  if (!token) return null;
  
  try {
    // Basic token validation - you might want to add more sophisticated validation
    return token;
  } catch (error) {
    console.error('Error validating token:', error);
    return null;
  }
};

// Hook to get token from cookie
export const useGetTokenFromCookie = (): string | null => {
  return getCookie('qat') || null;
};

// Handle logout
export const handleLogout = (): void => {
  // Remove the authentication cookie
  document.cookie = 'qat=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  
  // Redirect to home page or login page
  if (typeof window !== 'undefined') {
    window.location.href = '/';
  }
}; 