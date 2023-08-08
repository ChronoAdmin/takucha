
// hooks/useAuth.js

// useContextフックをインポート
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
// 先ほど作成したAuthContextをインポート

// カスタムフックuseAuthを作成
const useAuth = () => {
  // useContextフックでAuthContextからユーザー情報とローディング状態を取得
  return useContext(AuthContext);
};

export default useAuth;