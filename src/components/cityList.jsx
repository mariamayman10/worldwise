import Spinner from "./spinner";
import Message from "./message";
import styles from "./cityList.module.css";
import CityItem from "./cityItem";
import useCities from "../features/cities/useCities";

function CityList() {
  const {cities, isLoading} = useCities();
  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );

  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        <ul className={styles.cityList}>
          {cities.map((city) => (
            <CityItem city={city} key={city.id} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default CityList;
