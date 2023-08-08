import Link from "next/link";
import React, { useState } from "react";
import useProfile from "../../../hooks/userProfile";
import { useRouter } from "next/router";
import useAuth from "../../../hooks/useAuth";
import styles from "@/styles/settings/contents/ProfileUpdate.module.css";
import Image from "next/image";
import { db } from "../../../firebase/client";
import { setProfile } from "../../../libs/profile";

const ProfileUpdate = () => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { profile } = useProfile(); // ← Add this line
  

  //ニックネームのhandleChange
  const [nickname, setNickname] = useState(profile.nickname);
  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };
  //学年のhandleChange
  const [grade, setGrade] = useState(profile.grade);
  const handleGradeChange = (e) => {
    setGrade(e.target.value);
  };
  //得意科目のhandleChange
  const [goodSubject, setGoodSubject] = useState(profile.goodSubject);
  const handleGoodSubjectChange = (e) => {
    setGoodSubject(e.target.value);
  };
  //苦手科目のhandleChange
  const [badSubject, setBadSubject] = useState(profile.badSubject);
  const handleBadSubjectChange = (e) => {
    setBadSubject(e.target.value);
  };

  const [showDefaultIcons, setShowDefaultIcons] = useState(false); // ← 追加
  console.log("showDefaultIcons:", showDefaultIcons); // ここでログ出力
  const handleCloseDefaultIcons = () => {
    setShowDefaultIcons(false);
  };

  // 選択されたアバターのURLを管理するための状態
  const [selectedAvatar, setSelectedAvatar] = useState(profile.avatar || "/icon.svg");

  // 選択されたアバターのURLを更新する関数
  const updateProfileIcon = (url) => {
    setSelectedAvatar(url);
    handleCloseDefaultIcons(); // 選択画面を閉じる
  };

  const handleUpdateProfile = async () => {
    const updatedProfile = {
      nickname,
      grade,
      goodSubject,
      badSubject,
      avatar: selectedAvatar // アバターのURLも保存したい場合
    };
    // ユーザーのIDを取得していると仮定します。適切な値に置き換える必要があります。
    const userId = user?.uid;

    // プロファイルをデータベースに保存する
    await setProfile(userId, updatedProfile);

    // 保存が成功したら、適切なフィードバックを提供したり、ルーターで別のページに移動するなどの追加のロジックをここに追加できます。
    window.location.reload();
  };

  return (
    <>
      <div className={styles.wrap}>
        <div className={styles.icon}>
          <Image src={selectedAvatar} height={200} width={200} />
          <button onClick={() => setShowDefaultIcons(true)}>変更</button>
        </div>
        {showDefaultIcons && ( // ← 追加
          <div className={styles.defaultIcons}>
            <div className={styles.close} onClick={handleCloseDefaultIcons}>
              <span></span>
              <span></span>
            </div>
            {/* デフォルトアイコンのコンポーネント */}
            <div className={styles.defaultIcon}>
              <Image
                src="/settings/defaultIcon1.svg"
                height={100}
                width={100}
              />
              <button
                onClick={() => updateProfileIcon("/settings/defaultIcon1.svg")}
              >
                選択
              </button>
            </div>
            <div className={styles.defaultIcon}>
              <Image
                src="/settings/defaultIcon3.svg"
                height={100}
                width={100}
              />
              <button
                onClick={() => updateProfileIcon("/settings/defaultIcon3.svg")}
              >
                選択
              </button>
            </div>
            <div className={styles.defaultIcon}>
              <Image
                src="/settings/defaultIcon2.svg"
                height={100}
                width={100}
              />
              <button
                onClick={() => updateProfileIcon("/settings/defaultIcon2.svg")}
              >
                選択
              </button>
            </div>
            <div className={styles.defaultIcon}>
              <Image
                src="/settings/defaultIcon2.svg"
                height={100}
                width={100}
              />
              <button
                onClick={() => updateProfileIcon("/settings/defaultIcon2.svg")}
              >
                選択
              </button>
            </div>
            <div className={styles.defaultIcon}>
              <Image
                src="/settings/defaultIcon2.svg"
                height={100}
                width={100}
              />
              <button
                onClick={() => updateProfileIcon("/settings/defaultIcon2.svg")}
              >
                選択
              </button>
            </div>
            <div className={styles.defaultIcon}>
              <Image
                src="/settings/defaultIcon2.svg"
                height={100}
                width={100}
              />
              <button
                onClick={() => updateProfileIcon("/settings/defaultIcon2.svg")}
              >
                選択
              </button>
            </div>
            <div className={styles.defaultIcon}>
              <Image
                src="/settings/defaultIcon2.svg"
                height={100}
                width={100}
              />
              <button
                onClick={() => updateProfileIcon("/settings/defaultIcon2.svg")}
              >
                選択
              </button>
            </div>
          </div>
        )}
        <div className={styles.profiles}>
          <div className={styles.changeInput}>
            <div>ニックネーム</div>
            <input
              type="text"
              value={nickname}
              onChange={handleNicknameChange}
            />
          </div>
          <div className={styles.changeInput}>
            <div>学年</div>
            <input type="text" value={grade} onChange={handleGradeChange} />
          </div>
          <div className={styles.changeInput}>
            <div>得意科目</div>
            <input
              type="text"
              value={goodSubject}
              onChange={handleGoodSubjectChange}
            />
          </div>
          <div className={styles.changeInput}>
            <div>苦手科目</div>
            <input
              type="text"
              value={badSubject}
              onChange={handleBadSubjectChange}
            />
          </div>
        </div>
        <div className={styles.update}>
          <button onClick={handleUpdateProfile}>更新</button>
        </div>
      </div>
    </>
  );
};

export default ProfileUpdate;
