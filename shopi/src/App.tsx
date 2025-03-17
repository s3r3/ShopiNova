import LandingPage from "./pages/landingPages";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CheckOUT from "./pages/checkOut";
import PaymentForm from "./pages/paymentForm";
import Test from "./pages/text";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/checkout" element={<CheckOUT/>}/>
        <Route path="/payment" element={<PaymentForm onPaymentSuccess={function (): void {
          throw new Error("Function not implemented.");
        } }/>}/>
        <Route path="/test" element={<Test />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
