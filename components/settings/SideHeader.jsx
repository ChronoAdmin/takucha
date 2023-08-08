import React from 'react';
import ProfileUpdate from './contents/ProfileUpdate';
import PasswordUpdate from './contents/PasswordUpdate';
import Payment from './contents/Payment';

import styles from "@/styles/settings/sideHeader/index.module.css";

const SideHeader = ({ setSelectedContent }) => {
  return (
    <div className={styles.wrap}>
      <ul>
        <li onClick={() => setSelectedContent('profile')}>プロフィール</li>
        <li onClick={() => setSelectedContent('password')}>パスワード</li>
        <li onClick={() => setSelectedContent('payment')}>支払い状況</li>
      </ul>
    </div>
  )
}

export default SideHeader;
