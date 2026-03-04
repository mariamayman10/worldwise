import useCities from '../features/cities/useCities';
import CountryItem from './countryItem';
import styles from './countryList.module.css'
import Message from './message';
import Spinner from './spinner';
function CountryList() {
  const { cities, isLoading } = useCities();
  const countries = cities
    .map((c) => ({name:c.country, emoji:c.emoji}))
    .reduce((acc, cur) => {
      return acc.includes(cur) ? acc : [...acc, cur];
    }, []);
    console.log(countries)
  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );

  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        <ul className={styles.countryList}>
          {countries.map((c) => (
            <CountryItem country={c} key={c.name} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default CountryList;
