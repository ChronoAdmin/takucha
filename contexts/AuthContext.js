// contexts/AuthContext.js

// 必要なパッケージとFirebase設定をインポート
import React, { createContext, useState, useEffect } from 'react';
import { auth } from '../firebase/client';
import { onAuthStateChanged } from 'firebase/auth';

// ReactのcreateContextメソッドで新しいコンテクストを作成
export const AuthContext = createContext();

// AuthProviderコンポーネントを作成
export const AuthProvider = ({ children }) => {
  // 現在のユーザー情報とローディング状態のstateを作成
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // コンポーネントがマウントされたら実行
  useEffect(() => {
    // Firebaseの認証状態が変更されると、ユーザー情報をstateに保存
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    // コンポーネントがアンマウントされたときにFirebaseの認証状態のリスナーを解除
    return () => unsubscribe();
  }, []);

  // 子コンポーネントにユーザー情報とローディング状態を提供
  return (
    <AuthContext.Provider value={{ user, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

