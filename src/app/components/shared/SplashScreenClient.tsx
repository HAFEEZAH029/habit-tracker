'use client';

import SplashScreen from "../../components/shared/SplashScreen";
import { getSession } from "../../lib/auth";
import { SPLASH_DELAY } from "../../lib/constants";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const SplashScreenClient = () => {
  const router = useRouter();

   useEffect(() => {
      const timer = setTimeout(() => {
        const session = getSession();

        if (session) {
          router.replace("/dashboard");
        } else {
          router.replace("/login");
        }
      }, SPLASH_DELAY);

      return () => clearTimeout(timer);
    }, [router]);

    return (
      <>
        <SplashScreen />
      </>
    )
}

export default SplashScreenClient

