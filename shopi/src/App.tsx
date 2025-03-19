import LandingPage from "./pages/landingPages";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CheckOUT from "./pages/checkOut";
import CompletePage from "./Components/Landing/CompletePage";
import Test from "./pages/text";
import StripeProvider from "./pages/providesCheckout";
import CheckoutForm from "./pages/checkoutForm";
import Cancel from "./Components/Landing/failed";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/checkout" element={<CheckOUT />} />
        <Route
          path="/payment"
          element={
            <StripeProvider>
              <CheckoutForm />
            </StripeProvider>
          }
        />
        <Route path="/test" element={<Test />} />
        <Route path="/complete" element={<CompletePage />} />
        <Route path="/cancel" element={<Cancel />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;