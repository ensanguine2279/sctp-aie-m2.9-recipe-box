import { formatDuration } from "../utils/formatDuration";
import styles from "./RecipeCard.module.css";

export function RecipeCard({ name, cuisine, servings, minutes, onClick }) {
  return (
    <div
      className={styles.card}
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <h3 className={styles.title}>{name}</h3>
      <div className={styles.details}>
        <p className={styles.detailItem}>
          <strong>Cuisine:</strong> {cuisine}
        </p>
        <p className={styles.detailItem}>
          <strong>Servings:</strong> {servings}
        </p>
        <p className={styles.detailItem}>
          <strong>Time:</strong> {formatDuration(minutes)}
        </p>
      </div>
    </div>
  );
}
