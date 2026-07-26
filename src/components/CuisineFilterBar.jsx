/**
 * A filter bar component for selecting a cuisine.
 *
 * @param {Object} props
 * @param {string} props.value - The currently selected cuisine value
 * @param {Function} props.onChange - Callback function triggered when the selection changes
 * @param {string[]} props.cuisines - Array of available unique cuisine strings
 */
export function CuisineFilterBar({ value, onChange, cuisines = [] }) {
  console.log("CuisineFilterBar rendered");

  return (
    <div className="cuisine-filter-bar">
      <label htmlFor="cuisine-select">Filter by Cuisine: </label>
      <select
        id="cuisine-select"
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
