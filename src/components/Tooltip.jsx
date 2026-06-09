import styles from './Tooltip.module.css';

export default function Tooltip({ text, children }) {
  return (
    <span className={styles.wrap}>
      {children}
      <span className={styles.icon}>?
        <span className={styles.box}>{text}</span>
      </span>
    </span>
  );
}
