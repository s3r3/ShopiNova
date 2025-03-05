import LandingPage from "./pages/landingPages";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Test from "./pages/text.tsx";
import Cart from "./pages/text.tsx";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Test />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
