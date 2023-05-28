import Link from "next/link";
import styles from "@/styles/Home.module.css";

export default function Home() {
  return (
    <div className="starterContent">
      <div className={styles.content}>
      <div>
        <Link href="/about">
        <button className="starterButton">HOW DOES IT WORK?</button>
        </Link>
      </div>
      <div>
        <Link href="/form">
        <button className="starterButton">CREATE NEW PARTY!</button>
        </Link>
      </div>
    </div>
    </div>
  );
}
