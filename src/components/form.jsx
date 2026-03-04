import { useEffect, useState } from "react";
import { useUrlPosition } from "../customHooks/useUrlPosition";
import { useNavigate } from "react-router-dom";
import { convertToEmoji } from "../utilities/helperFunctions";
import useCities from "../features/cities/useCities";
import Button from "./button";
import BackButton from "./backButton";
import Spinner from "./spinner";
import Message from "./message";
import styles from "./Form.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
  const [lat, lng] = useUrlPosition();
  const { createCity, isLoading } = useCities();
  const navigate = useNavigate();

  const [isLoadingGeolocation, setIsLoadingGeolocation] = useState(false);
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [emoji, setEmoji] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [geoError, setGeoError] = useState("");

  useEffect(() => {
    async function fetchCity() {
      if (!lat && !lng) return;
      try {
        setIsLoadingGeolocation(true);
        setGeoError("");
        const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
        const data = await res.json();
        if (!data.countryCode)
          throw new Error(
            "That doesn't seem to be a city. Click somewhere else 😉",
          );

        setCityName(data.city || data.locality || "");
        setCountry(data.countryName);
        setEmoji(convertToEmoji(data.countryCode));
      } catch (e) {
        setGeoError(e.message);
      } finally {
        setIsLoadingGeolocation(false);
      }
    }
    fetchCity();
  }, [lat, lng]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!cityName || !date) return;
    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat, lng },
    };
    await createCity(newCity);
    navigate(`/app/cities`);
  }

  if (!lat && !lng)
    return <Message message="Start by clicking somewhere on the map" />;
  if (isLoadingGeolocation) return <Spinner />;
  if (geoError) return <Message message={geoError} />;

  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker
          id="date"
          selected={date}
          onChange={(date) => setDate(date)}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton>&larr; Back</BackButton>
      </div>
    </form>
  );
}

export default Form;
