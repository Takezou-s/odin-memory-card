import { useState, useEffect } from "react";

import Icon from "@mdi/react";
import { mdiMenuDown, mdiMenuUp } from "@mdi/js";

import pikachu from "../assets/pikachu.png";
import styles from "../styles/StartGameCard.module.css";

function StartGameCard({ className, onStarted }) {
  const [cardCount, setCardCount] = useState(5);

  useEffect(() => {
    if (cardCount < 5) setCardCount(5);
    else if (cardCount > 20) setCardCount(20);
  }, [cardCount]);

  const clickHandler = (operation, e) => {
    let num = e.shiftKey ? 5 : 1;
    num = operation === "+" ? num : -num;
    setCardCount((prev) => prev + num);
  };

  return (
    <div className={styles["start-game"] + " " + (className || "")}>
      <div className={styles["container"]}>
        <img src={pikachu}></img>
        <div className={styles["card-count"]}>
          <span>
            <span>Number of cards: </span>
            <span>(5 - 20)</span>
          </span>
          <div className={styles["card-count-inner"]}>
            <span>{cardCount}</span>
            <div className={styles["card-count-button-container"]}>
              <button className={styles["card-count-button"]} onClick={clickHandler.bind(this, "+")}>
                <Icon path={mdiMenuUp} size={1.75} />
              </button>
              <button className={styles["card-count-button"]} onClick={clickHandler.bind(this, "-")}>
                <Icon path={mdiMenuDown} size={1.75} />
              </button>
            </div>
          </div>
        </div>
      </div>
      <button className={styles["start-button"]} onClick={onStarted && onStarted.bind(this, cardCount)}>
        Start
      </button>
    </div>
  );
}

export default StartGameCard;
