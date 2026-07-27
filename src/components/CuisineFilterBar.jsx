import { memo } from "react";

import styles from "./CuisineFilterBar.module.css";

/**
 * A filter bar component for selecting a cuisine.
 *
 * @param {Object} props
 * @param {string} props.value - The currently selected cuisine value
 * @param {Function} props.onChange - Callback function triggered when the selection changes
 * @param {string[]} props.cuisines - Array of available unique cuisine strings
 */
function CuisineFilterBar({ value, onChange, cuisines = [] }) {
  console.log("CuisineFilterBar rendered");

  return (
    <div className={styles.filterBar}>
      <label htmlFor="cuisine-select" className={styles.label}>
        Filter by Cuisine:{" "}
      </label>
      <select
        id="cuisine-select"
        className={styles.select}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">All</option>
        {cuisines.map((cuisine) => (
          <option key={cuisine} value={cuisine}>
            {cuisine}
          </option>
        ))}
      </select>
    </div>
  );
}

// Exporting the component wrapped in React.memo to prevent unnecessary re-renders
export default memo(CuisineFilterBar);
