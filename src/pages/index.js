import React, { useState } from "react";
import styles from "@/styles/home.module.css";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";


const Home = () => {
  const products = ["plan", "service", "howto"];

  return (
    <div className={styles.container}>
      <div className={styles.video}>
        <video src="/fv.mp4" loop autoPlay muted></video>
      </div>
      <div className={styles.mainText}>
        <h1>自宅 × ChatGPT × 勉強</h1>
        <h2>宅チャ</h2>
        <Link href="/register">無料で始めてみる</Link>
      </div>
      <div className={styles.characters}>
        {products.map((product, index) => (
          <div
            className={`${styles.character} ${
              styles["character" + (index + 1)]
            }`}
          >
            <Link href={product}>
              <motion.img layoutId={product} src={"/" + product + ".svg"} height={200} width={200} animate={{scale:1}} whileHover={{scale:1.1}} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
