import styles from "../styles/Header.module.css";

function Header({ score, bestScore }) {
  return (
    <div className={styles.header}>
      <span className={styles.title}>Memogym</span>
      <div className={styles.score}>
        <span>Score: {score || 0}</span>
        <span>Best Score: {bestScore || 0}</span>
      </div>
    </div>
  );
}

export default Header;
