import LandingPage from "./pages/landingPages";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CheckOUT from "./pages/checkOut";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/checkout" element={<CheckOUT/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
