import Link from "next/link";
import styles from "@/styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.content}>
      <div>
        <Link href="/about">
          <button>How does it work?</button>
        </Link>
      </div>
      <div>
        <Link href="/create">
          <button>Get started!</button>
        </Link>
      </div>
    </div>
  );
}
