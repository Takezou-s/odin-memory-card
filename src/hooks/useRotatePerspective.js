import { useState } from "react";
import styles from "../styles/RotatePerspective.module.css";

export default function useRotatePerspective(
  options = {
    negativeX: true,
    negativeY: false,
    disableX: false,
    disableY: false,
    perspective: 1000,
    maxDegX: 20,
    maxDegY: 15,
    deadRangeX: 1,
    deadRangeY: 1,
  }
) {
  const [style, setStyle] = useState({});

  const mouseMoveHandler = (e) => {
    const event = e.nativeEvent;
    let el = event.target;
    while (!el.classList.contains(styles.tilt) && el !== document.body) {
      el = el.parentElement;
    }
    if (!el || !el.classList.contains(styles.tilt)) return;
    const pointerX = event.offsetX;
    const pointerY = event.offsetY;
    const deadAmountX = (el.offsetWidth * options.deadRangeX) / 100;
    const deadAmountY = (el.offsetHeight * options.deadRangeY) / 100;
    const minX = deadAmountX;
    const maxX = el.offsetWidth - deadAmountX;
    const minY = deadAmountY;
    const maxY = el.offsetHeight - deadAmountY;
    if (pointerX < minX || pointerX > maxX || pointerY < minY || pointerY > maxY) return;
    el.classList.remove(styles["rotate-perspective"]);
    const midX = el.offsetWidth / 2;
    const midY = el.offsetHeight / 2;
    let rotateX = ((pointerY - midY) * options.maxDegX) / midY;
    let rotateY = ((pointerX - midX) * options.maxDegY) / midX;
    rotateX = options.negativeX ? -rotateX : rotateX;
    rotateY = options.negativeY ? -rotateY : rotateY;
    rotateX = options.disableX ? 0 : rotateX;
    rotateY = options.disableY ? 0 : rotateY;
    const transform = `perspective(${options.perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    // el.style.transform = transform;
    setStyle({ transform });
  };

  const mouseLeaveHandler = (e) => {
    const event = e.nativeEvent;
    let el = event.target;
    while (!el.classList.contains(styles.tilt) && el !== document.body) {
      el = el.parentElement;
    }
    if (!el || !el.classList.contains(styles.tilt)) return;
    el.classList.add(styles["rotate-perspective"]);
    // el.style.transform = `perspective(${options.perspective}px) rotateX(${0}deg) rotateY(${0}deg)`;
    setStyle({});
  };

  return [mouseMoveHandler, mouseLeaveHandler, style, setStyle.bind(this, {})];
}
