import React, { useState } from 'react';
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../../firebase/client.js";

const PasswordUpdate = () => {
  const [email, setEmail] = useState('');

  const submitPasswordResetEmail = async () => {
    const actionCodeSettings = {
      url: 'http://localhost:3000/login',
      handleCodeInApp: false,
    };

    await sendPasswordResetEmail(auth, email, actionCodeSettings)
      .then((resp) => {
        // メール送信成功
        console.log('Email sent');
      })
      .catch((error) => {
        // メール送信失敗
        console.log(error);
      });
  };

  return (
    <div>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={submitPasswordResetEmail}>
        Send Password Reset Email
      </button>
    </div>
  );
};

export default PasswordUpdate;
