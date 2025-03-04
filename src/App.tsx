import LandingPage from "./pages/landingPages";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Test from "./pages/text";
import Tata from "./pages/text";


const App = () => {
  return (
    <BrowserRouter>
      <Routes >
        <Route path="/" element={<LandingPage />}/>
        <Route path="/home" element={<Test />}/>
        <Route path="/tata" element={<Tata />}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
