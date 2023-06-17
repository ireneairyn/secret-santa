import "@/styles/globals.css";
import Head from "next/head";
import * as styles from "@/styles/App.module.css";
import Link from "next/link";
import Image from "next/image";
import firebase from "firebase/compat/app";
import { initializeApp } from "firebase/compat/app";
import "firebase/compat/database";



// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC8ZUyw-FTahqqmRhRzxYzA_QA6VAkevkM",
  authDomain: "secret-santa-d618e.firebaseapp.com",
  databaseURL: "https://secret-santa-d618e-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "secret-santa-d618e",
  storageBucket: "secret-santa-d618e.appspot.com",
  messagingSenderId: "691218473853",
  appId: "1:691218473853:web:3f25855a48748c40e9e214",
  measurementId: "G-M5B86K5Y5V"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default function App({ Component, pageProps }) {
  return (
    <>
      <div className="topLinks">
        <a
          href="https://github.com/ireneairyn/secret-santa"
          className="logo-link"
          target="_blank"
        >
          <Image
            src="/github-mark-white.png"
            alt="github logo"
            width={35}
            height={35}
          />
        </a>{" "}
        <a
          href="https://www.amazon.co.uk/"
          className="emoji-link"
          target="_blank"
        >
          <Image src="/holly.png" alt="holly logo" width={40} height={40} />
        </a>
      </div>
      <Head>
     
        <title>Secret Santa</title>
        <meta
          name="description"
          content="Plan and organize your Secret Santa party!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.container}>
        <header>
          <Link href="/">
            <img className={styles.title} src="/title.png" />
          </Link>
        </header>
        <Component {...pageProps} />
        <footer className={styles.footer}>
          <div className={styles.silhouette} />
        </footer>
      </div>
    </>
  );
}
