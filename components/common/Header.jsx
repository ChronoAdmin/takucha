import Image from "next/image";
import React from "react";
import styles from "@/styles/header/index.module.css";
import Link from "next/link";
import useAuth from "../../hooks/useAuth";
import useProfile from "../../hooks/userProfile";
import { useRouter } from "next/router";
import { auth } from "../../firebase/client";

const Header = () => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { profile } = useProfile(); // ← Add this line

  const logout = async () => {
    try {
      await auth.signOut();
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className={styles.wrap}>
        {/* Other content */}
        <div className={styles.left}>
          <div className={styles.logo}>
            <Link href="/">
              <Image
                src="/logo/logo_500x500_remove.svg"
                height={70}
                width={70}
                alt="logo"
              />
            </Link>
          </div>
          <div className={styles.g_nav}>
            <ul>
              <li>
                <Link href="/">ホーム</Link>
              </li>
              <li>
                <Link href="/courses">コース一覧</Link>
              </li>
              <li>
                <Link href="#">プラン</Link>
              </li>
              <li>
                <Link href="#">進捗状況</Link>
              </li>
              <li>
                <Link href="#">お問い合わせ</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.right}>
          {/* If the user is loaded and exists, show user-specific links */}
          {!loading && user ? (
            <>
              <p>
                {profile && profile.nickname ? profile.nickname : user.email}
                さん
              </p>
              <div className={styles.mypage}>
                <Link href="/settings">アカウント設定</Link>
              </div>
              <div className={styles.logout}>
                <button onClick={logout}>Logout</button>
              </div>
            </>
          ) : (
            // Otherwise, show general links
            <>
              <div className={`${styles.login}`}>
                <Link href="/login">Login</Link>
              </div>
              <div className={`${styles.login} ${styles.register}`}>
                <Link href="/register">無料登録</Link>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
