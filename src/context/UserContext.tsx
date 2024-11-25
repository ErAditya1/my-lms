'use client';

import api from '@/api';
import { toast } from '@/components/ui/use-toast';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { loginUser, logoutUser } from '@/store/user/userSlice';
import { AxiosError } from 'axios';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { Suspense, useEffect, useMemo, useState } from 'react';
import { FaSpinner } from 'react-icons/fa6';
import { MdOutlineCloudOff } from 'react-icons/md';

function Page({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const accessToken = searchParams.get('accessToken');

  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const [loading, setLoading] = useState(true);

  // Check for online status only on the client
  const [isOnline, setIsOnline] = useState(false);

  const isPublicPath = useMemo(
    () =>
      ["/sign-in", "/sign-up", "/verify", "/reset-password", "/forget-password"].some((path) =>
        pathname.startsWith(path)
      ),
    [pathname]
  );

  // Monitor changes to online status
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Only run this code on the client-side
      const handleOnline = () => setIsOnline(true);
      const handleOffline = () => setIsOnline(false);

      // Set initial state based on current network status
      setIsOnline(navigator.onLine);

      // Add event listeners for online/offline status
      window.addEventListener('online', handleOnline);
      window.addEventListener('offline', handleOffline);

      // Cleanup listeners on component unmount
      return () => {
        window.removeEventListener('online', handleOnline);
        window.removeEventListener('offline', handleOffline);
      };
    }
  }, []); // Empty dependency array means this effect runs only once, on mount

  useEffect(() => {

    if (isOnline) {
      api
        .get('/v1/users/current-user', {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          console.log('user fetched successfully');
          const user = response.data.data;
          if (accessToken) {
            localStorage.setItem('BrightVeilUser', JSON.stringify(user));
          }
          dispatch(loginUser(user));
          if (isPublicPath) {
            router.push('/');
          }
        })
        .catch((error) => {
          const axiosError = error as AxiosError<AxiosError>;
          if (!isPublicPath) {
            toast({
              title: 'Authentication Failed',
              description: axiosError.response?.data.message,
              variant: 'destructive',
            });
            console.log('User not found');
            router.push('/sign-in');
          }

          dispatch(logoutUser());
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      toast({
        title: 'No internet connection',
        description: 'Please check your internet connection and try again',
        variant: 'warning',
      });
      setLoading(false); // Make sure loading stops even when offline
    }
  }, [dispatch, isOnline, isPublicPath, router]);

  useEffect(() => {
    if (isLoggedIn && isPublicPath) {
      router.push('/');
    }
  }, [isLoggedIn, isPublicPath, router]);

  if (loading) {
    return (
      <div className="bg-background text-foreground h-dvh w-screen flex justify-center items-center m-0 p-0">
        <FaSpinner className="animate-spin mx-4" size={50} />
        Verifying...
      </div>
    );
  } else if (!isOnline) {
    return (
      <div className="bg-background text-foreground h-dvh w-screen flex justify-center items-center m-0 p-0 text-sm sm:text-md">
        <MdOutlineCloudOff className=" mx-4" size={50} />
        No Network Connetion ...
      </div>
    )
  }

  return <>{children}</>;
}

export default function UserContext ({ children }:any) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Page>
        {children}
      </Page>
    </Suspense>
  )
}
