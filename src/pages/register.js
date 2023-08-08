import React, { useState } from "react";
import { useRouter } from "next/router";
import useAuth from "../../hooks/useAuth";
import { setProfile } from "../../libs/profile"; // プロフィール関連の関数をインポート
import register from "../../libs/register";

const Register = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [grade, setGrade] = useState("");
  const [goodSubject, setGoodSubject] = useState("");
  const [badSubject, setBadSubject] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // メールアドレスとパスワードでユーザー登録
      const user = await register(email, password);
      // ユーザー登録が成功したら、プロフィール情報をFirestoreに保存
      await setProfile(user.uid, {
        nickname,
        grade,
        goodSubject,
        badSubject,
      });
      router.push("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1>Register</h1>
      {error && <p>{error}</p>}
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Nickname"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
        <input
          type="text"
          placeholder="Grade"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
        />
        <input
          type="text"
          placeholder="Good Subject"
          value={goodSubject}
          onChange={(e) => setGoodSubject(e.target.value)}
        />
        <input
          type="text"
          placeholder="Bad Subject"
          value={badSubject}
          onChange={(e) => setBadSubject(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
