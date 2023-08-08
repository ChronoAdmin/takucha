import React, { useState } from "react";
import SideHeader from "../../../components/settings/SideHeader";

import styles from "@/styles/settings/index.module.css";
import ProfileUpdate from "../../../components/settings/contents/ProfileUpdate";
import PasswordUpdate from "../../../components/settings/contents/PasswordUpdate";

const Settings = () => {
  const [selectedContent, setSelectedContent] = useState('profile');

  const renderContent = () => {
    switch (selectedContent) {
      case 'profile':
        return <ProfileUpdate />;
      case 'password':
        return <PasswordUpdate />;
      case 'payment':
        return <div>支払い情報の内容</div>;
      default:
        return <div>選択したコンテンツがありません</div>;
    }
  }

  return (
    <>
      <div className="pt-10">
        <div className={styles.wrap}>
          <SideHeader setSelectedContent={setSelectedContent} />
          <div className={styles.contents}>
            {renderContent()}
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
