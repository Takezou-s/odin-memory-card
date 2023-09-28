
import styles from "../styles/StatusPrompt.module.css";

function StatusPrompt({img, success=false, imgClass, title, buttonText, onClick}) {
  return (
    <div className={styles.container + " " + (success ? styles.success: styles['game-over'])}>
      <div className={styles["status-prompt"]}>
        <span className={styles["status-prompt-img-container"]}>
          <img className={imgClass || styles["status-prompt-img"]} src={img}></img>
        </span>
        <span className={styles["status-prompt-text"]}>{title}</span>
      </div>
      <button className={styles["status-prompt-button"]} onClick={onClick}>{buttonText}</button>
    </div>
  );
}

export default StatusPrompt;
