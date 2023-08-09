import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { motion } from "framer-motion";
import styles from "@/styles/product.module.css";
import Plan from "../../components/home/Plan";
import Service from "../../components/home/Service";
import Howto from "../../components/home/Howto";
import Link from "next/link";

const Product = () => {
  const {
    query: { product },
  } = useRouter();
  return (
    <div className={styles.container}>
      <div className={styles.video}>
        <video src="/fv.mp4" loop autoPlay muted></video>
      </div>
      <div className={styles.chara}>
        <motion.img
          layoutId={product}
          src={"/" + product + ".svg"}
          height={200}
          width={200}
        />
      </div>
      <div className={styles.content}>
        <Link href="/" style={{color:"#999"}}>←back</Link>
        <h1>{product}について</h1>
        {product === "plan" && <Plan />}
        {product === "service" && <Service />}
        {product === "howto" && <Howto />}
      </div>
    </div>
  );
};

export default Product;
