import { useCallback, useEffect, useReducer } from "react";
import { CitiesContext } from "./citiesContext";
const BASE_URL = "http://localhost:8000";

const initialState = {
  cities: [],
  currentCity: null,
  isLoading: false,
  error: false,
};
function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "citiesFetched":
      return { ...state, cities: action.payload, isLoading: false };
    case "cityFetched":
      return {
        ...state,
        currentCity: action.payload,
        isLoading: false,
      };
    case "cityCreated":
      return {
        ...state,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
        isLoading: false,
      };
    case "cityDeleted":
      return {
        ...state,
        cities: state.cities.filter((c) => c.id !== action.payload),
        isLoading: false,
      };
    case "error":
      return { ...state, isLoading: false, error: action.payload };
  }
}

function CitiesProvider({ children }) {
  const [{ cities, currentCity, isLoading }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  useEffect(() => {
    async function fetchCities() {
      dispatch({ type: "loading" });
      const res = await fetch(`${BASE_URL}/cities`);
      const fetchedCities = await res.json();
      dispatch({ type: "citiesFetched", payload: fetchedCities });
    }
    fetchCities();
  }, []);

  const getCity = useCallback(
    async function getCity(id) {
      try {
        dispatch({ type: "loading" });
        const res = await fetch(`${BASE_URL}/cities/${id}`);
        const city = await res.json();
        dispatch({ type: "cityFetched", payload: city });
      } catch (error) {
        console.error("Error fetching city:", error);
      }
    },
    []
  );

  async function createCity(city) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(city),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      dispatch({ type: "cityCreated", payload: data });
    } catch (e) {
      dispatch({ type: "error", payload: e.message });
      console.error(e);
    }
  }

  async function deleteCity(cityId) {
    dispatch({ type: "loading" });
    try {
      await fetch(`${BASE_URL}/cities/${cityId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      dispatch({ type: "cityDeleted", payload: cityId });
    } catch (e) {
      dispatch({ type: "error", payload: e.message });
      console.error(e);
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

export default CitiesProvider;
