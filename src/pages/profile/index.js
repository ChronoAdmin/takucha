import React from "react";
import useAuth from "../../../hooks/useAuth";
import useProfile from "../../../hooks/userProfile";
import { useRouter } from "next/router";

const Profile = () => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { profile } = useProfile();

  if (!user) {
    router.push("/");
  }

  if (loading || !profile) {
    return <div>Loading...</div>;
  }

  console.log(user, profile);
  return (
    <div className="pt-10 flex">
      <div>
        <p>ニックネーム：{profile.nickname ? `${profile.nickname}` : "未設定"}</p>
        <p>学年：{profile.grade ? `${profile.grade}年生` : "未設定"}</p>
        <p>得意な科目：{profile.goodSubject ? `${profile.goodSubject}` : "未設定"}</p>
        <p>苦手な科目：{profile.badSubject ? `${profile.badSubject}` : "未設定"}</p>
      </div>
    </div>
  );
};

export default Profile;