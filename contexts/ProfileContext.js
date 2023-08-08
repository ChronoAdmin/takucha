// contexts/ProfileContext.js
import React, { createContext, useState, useEffect } from 'react';
import { getProfile } from '../libs/profile';
import useAuth from '../hooks/useAuth';

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      // ユーザーがログインしている場合、そのユーザーのプロフィールを取得
      getProfile(user.uid).then(profile => {
        setProfile(profile);
        setLoading(false);
      });
    } else {
      // ユーザーがログインしていない場合、プロフィールはnull
      setProfile(null);
      setLoading(false);
    }
  }, [user]);

  return (
    <ProfileContext.Provider value={{ profile, loading }}>
      {!loading && children}
    </ProfileContext.Provider>
  );
};


