import React, { useState } from "react";
import { useRouter } from 'next/router'
import useAuth from '../../../hooks/useAuth'
import { setProfile } from "../../../libs/profile";
import styles from "../../styles/profile/Profile.module.css";

const subjects = ["算数", "国語", "理科", "社会", "英語"];

export default function CreateProfile() {
  const [nickname, setNickname] = useState("");
  const [grade, setGrade] = useState("");
  const [goodSubject, setGoodSubject] = useState("");
  const [badSubject, setBadSubject] = useState("");
  const { user } = useAuth();
  const router = useRouter();

  const submitForm = async (event) => {
    event.preventDefault();

    const profile = {
      nickname,
      grade,
      goodSubject,
      badSubject,
    };

    if(user){
      await setProfile(user.uid, profile);
      router.push("/profile"); // プロフィール作成後、プロフィールページにリダイレクト
    }
  };

  return (
    <div className={styles.container}>
      <h1>あなたのプロフィールを<br />作成しましょう！</h1>
      <form onSubmit={submitForm}>
        <label>
          ニックネーム:
          <input type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} required />
        </label>
        <label>
          学年:
          <input type="number" value={grade} onChange={(e) => setGrade(e.target.value)} required />
        </label>
        <label>
          得意な科目:
          <select value={goodSubject} onChange={(e) => setGoodSubject(e.target.value)}>
            <option value="">--Select--</option>
            {subjects.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
        </label>
        <label>
          苦手な科目:
          <select value={badSubject} onChange={(e) => setBadSubject(e.target.value)}>
            <option value="">--Select--</option>
            {subjects.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">プロフィール作成</button>
      </form>
    </div>
  );
}
