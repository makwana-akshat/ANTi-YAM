import { useEffect } from 'react';
import { useAuth, useUser } from '@clerk/clerk-react';
import axios from 'axios';

export const AuthSync = ({ children }: { children: React.ReactNode }) => {
  const { getToken, isLoaded: isAuthLoaded, isSignedIn } = useAuth();
  const { isLoaded: isUserLoaded } = useUser();

  useEffect(() => {
    const syncUser = async () => {
      // Ensure auth is loaded and user is signed in
      if (!isAuthLoaded || !isUserLoaded || !isSignedIn) return;

      try {
        const token = await getToken();
        // Call the backend to sync the user to Supabase
        await axios.post(
          'http://localhost:8000/api/v1/auth/sync',
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        console.log("User synced successfully with the backend");
      } catch (error) {
        console.error("Failed to sync user with backend:", error);
      }
    };

    syncUser();
  }, [isAuthLoaded, isUserLoaded, isSignedIn, getToken]);

  return <>{children}</>;
};
