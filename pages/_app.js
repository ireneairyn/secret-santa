import "@/styles/globals.css";
import Head from "next/head";
import * as styles from "@/styles/App.module.css";
import Link from "next/link";
import Image from "next/image";
import "@/styles/globals.css";

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
