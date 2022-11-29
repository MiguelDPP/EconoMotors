import { useAuth } from '@hooks/useAuth';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Cookie from 'js-cookie';

const AuthLayout = ({children}) => {
  const router = useRouter();
  const auth  = useAuth();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    auth.getUser()
      .then((response) => {
        router.push("/dashboard");
      })
      .catch((error) => {
        Cookie.remove("access_token");
        auth.setUser(null);
        setIsReady(true);
      });
  }, [
    auth.user
  ]);
  return (
    <>
      {isReady && children}
    </>
  )
}

export default AuthLayout