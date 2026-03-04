import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

import CityList from "./components/cityList";
import CountryList from "./components/countryList";
import City from "./components/city";
import Form from "./components/form";
import CitiesProvider from "./features/cities/citiesProvider";
import AuthProvider from "./features/auth/authProvider";
import SpinnerFullPage from "./components/spinnerFull";
import "./App.css";

const Home = lazy(() => import("./pages/home"));
const Pricing = lazy(() => import("./pages/pricing"));
const Product = lazy(() => import("./pages/product"));
const Login = lazy(() => import("./pages/login"));
const AppLayout = lazy(() => import("./pages/appLayout"));

function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route index element={<Home />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="product" element={<Product />} />
              <Route path="app" element={<AppLayout />}>
                <Route index element={<Navigate replace to="cities" />} />
                <Route path="cities" element={<CityList />} />
                <Route path="cities/:id" element={<City />} />
                <Route path="countries" element={<CountryList />} />
                <Route path="form" element={<Form />} />
              </Route>
              <Route path="login" element={<Login />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
