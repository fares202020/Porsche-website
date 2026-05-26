import { Routes, Route } from 'react-router-dom'
import CarListing from "./pages/CarsListing/CarsListing"
import CarDetails from "./pages/CarDetails/CarDetails"
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Profile from "./pages/Profile/Profile";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService/TermsOfService";
import CookieConsent from "./components/Cookies/CookieConsent";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/shop" element={<CarListing />} />
        <Route path="/shop/suv" element={<CarListing />} />
        <Route path="/shop/sports" element={<CarListing />} />
        <Route path="/shop/electric" element={<CarListing />} />
        <Route path="/shop/sedan" element={<CarListing />} />
        <Route path="/shop/all" element={<CarListing />} />
        <Route path="/CarDetails" element={<CarDetails />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
      </Routes>
      <CookieConsent />
    </>
  );
}

export default App;
