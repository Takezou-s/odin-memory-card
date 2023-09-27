// import { useState } from "react";
import { useEffect } from "react";

import useRotatePerspective from "../hooks/useRotatePerspective";

import styles from "../styles/Card.module.css";
import tiltStyles from "../styles/RotatePerspective.module.css";
import cardBack from "../assets/poke-card-back.png";
import pokeBall from "../assets/pokeball.png";

function Card({ img, name, className, onClick, back, tilt }) {
  const [mouseMoveHandler, mouseLeaveHandler, rotatePerspectiveStyle, resetHook] = useRotatePerspective();
  //   const [back, setBack] = useState(false);

  useEffect(() => {
    if (!tilt) resetHook();
  }, [tilt]);

  const clickHandler = () => {
    // setBack((prev) => !prev);
    if (onClick) onClick();
  };
  return (
    <button
      onClick={clickHandler}
      className={styles.card + " " + ((tilt && tiltStyles.tilt) || "") + " " + (className || "")}
      style={rotatePerspectiveStyle}
      onMouseMove={mouseMoveHandler}
      onMouseLeave={mouseLeaveHandler}
    >
      <div className={styles.container + " " + ((back && styles.back) || "")}>
        <div className={styles["front-face"]}>
          <img src={img} className={styles["card-img"]} />
          <span className={styles["card-name"]}>{name}</span>
        </div>
        <div className={styles["back-face"]}>
          <img className={styles["card-img"]} src={cardBack}></img>
        </div>
      </div>
    </button>
  );
}

export function LoadingCard({ className }) {
  return (
    <div className={(className || "") + " " + styles["loading-container"]}>
      <div className={styles["loading-front-face"]}>
        <img className={styles["card-img"]} src={cardBack}></img>
      </div>
      <div className={styles["back-face"]}>
        <img className={styles["card-img"]} src={cardBack}></img>
      </div>
    </div>
  );
}

export function Loading2() {
  return (
    <div className={styles["cube-container"]}>
      <div className={styles.cubes}>
        <div className={styles.cube + " " + styles.front}>
          <img src={cardBack} className={styles["card-img"]}></img>
        </div>
        <div className={styles.cube + " " + styles.back}>
          <img src={cardBack} className={styles["card-img"]}></img>
        </div>
        <div className={styles.cube + " " + styles.right}>
          <img src={cardBack} className={styles["card-img"]}></img>
        </div>
        <div className={styles.cube + " " + styles.left}>
          <img src={cardBack} className={styles["card-img"]}></img>
        </div>
      </div>
    </div>
  );
}

export default Card;
