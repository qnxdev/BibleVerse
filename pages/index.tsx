import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [index, setIndex] = useState(0);
  const fn = async () => {
    await fetch("/api/hello?book=" + index);
    setIndex(index + 1);
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <button onClick={fn}>Create {index}</button>
        <div className="header">
          <h1>+</h1>
          <h4>ML</h4>
          <h4>Dark</h4>
        </div>
        <div className="content">
          <div className="verse">
            <div className="text"></div>
            <div className="desc"></div>
          </div>
          <div className="detailed"></div>
        </div>
      </main>
    </>
  );
}
