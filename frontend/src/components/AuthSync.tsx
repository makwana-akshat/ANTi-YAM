import { useEffect } from 'react';
import { useAuth, useUser } from '@clerk/clerk-react';
import axios from 'axios';

export const AuthSync = ({ children }: { children: React.ReactNode }) => {
  const { getToken, isLoaded: isAuthLoaded, isSignedIn } = useAuth();
  const { user, isLoaded: isUserLoaded } = useUser();

  useEffect(() => {
    const syncUser = async () => {
      if (!isAuthLoaded || !isUserLoaded || !isSignedIn || !user) return;

      console.log("Starting sync...");
      try {
        const token = await getToken();
        console.log("JWT received");
        
        console.log("Sending request...");
        const response = await axios.post(
          'http://127.0.0.1:8000/api/v1/auth/sync',
          {
            email: user.primaryEmailAddress?.emailAddress,
            full_name: user.fullName,
            avatar_url: user.imageUrl,
            phone_number: user.primaryPhoneNumber?.phoneNumber
          },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        console.log("Response received");
        console.log("Sync successful", response.data);
      } catch (error: any) {
        if (error.response) {
          console.error("Failed to sync user with backend:", {
            status: error.response.status,
            body: error.response.data,
            message: error.message
          });
        } else {
          console.error("Failed to sync user with backend (Network/Setup Error):", error.message);
        }
      }
    };

    syncUser();
  }, [isAuthLoaded, isUserLoaded, isSignedIn, getToken, user]);

  return <>{children}</>;
};
