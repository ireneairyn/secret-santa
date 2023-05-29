import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import React, { useState } from "react";

export default function About() {
  const [showExtendedText1, setShowExtendedText1] = useState(false);
  const [showExtendedText2, setShowExtendedText2] = useState(false);

  function handleButtonClick1() {
    setShowExtendedText1(!showExtendedText1);
  }

  function handleButtonClick2() {
    setShowExtendedText2(!showExtendedText2);
  }

  return (
    <div className={styles.content}>
      <div className={styles.what}>
        <h2>What is Secret Santa?</h2>
        <p>
          In four words:<strong> Anonymous gift exchange tradition</strong>.
        </p>
        <div className={styles.displayButton}>
          <button onClick={handleButtonClick1}>
            {showExtendedText1 ? "I need less" : "I need more"}
          </button>
        </div>
        {showExtendedText1 && (
          <div className={styles.whatExtended}>
            <p>
              Secret Santa, known as
              <em> amigo invisible (invisible friend)</em> in Spain or <em> Kris Kindle</em> in Ireland, is a
              gift-giving tradition where members of a group are randomly
              assigned to give a gift to one person without revealing their
              identity until the gift is opened.
            </p>
            <p>
              Ok, now that you know what it is, you are ready to play. What do
              you need?
            </p>
            <p>
              Generous people that want to spend money on someone they might not
              know very well in exchange for a present they probably don't like.
            </p>
            <p>
              I know, I'm not selling it very well so far, BUT that's not going
              to happen this time!
            </p>
            <p>Here's what you have to do:</p>
          </div>
        )}
      </div>
      <div className={styles.how}>
        <h2>How to play</h2>
        <p>
          In six words:
          <strong> name | email | exceptions | budget | date | time</strong>
        </p>
        <div className={styles.displayButton}>
          <button onClick={handleButtonClick2}>
            {showExtendedText2 ? "I need less" : "I need more"}
          </button>
        </div>
        {showExtendedText2 && (
          <div className={styles.whatExtended}>
            <p>
              Write the name and email of the participants, including yours as
              the organiser. Next to each participant choose the name or names
              of those they shouldn't give a gift to.
            </p>
            <p>
              For example: Sara, Sam, Elena, Daniel, Alex and Nico are playing,
              but Sam and Nico are a couple so they don't want to give a present
              to each other as part of this game, You would add the exception
              next to one of their names and will guarantee they'll give and get
              a present from other people.
            </p>
            <p>Once that's sorted, choose a budget for the presents.</p>
            <p>Finally, add a date and place for the event!</p>
          </div>
        )}
      </div>
      <div className={styles.create}>
        <h2>Ready to play!</h2>
        <p>
          I get it now, <strong>let's do this!</strong>
        </p>
        <div className={styles.displayButton}>
          <Link href="/form">
            <button>Create party!</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
