import styles from './countryItem.module.css'

function CountryItem({country}) {
  return (
    <div>
      <li className={styles.countryItem}>
        <span>{country.emoji}</span>
        <span>{country.name}</span>
      </li>
    </div>
  );
}

export default CountryItem
