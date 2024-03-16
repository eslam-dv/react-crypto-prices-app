import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./Pages/HomePage/Home";
import { Coin } from "./Pages/CoinPage/Coin";
import { Navbar } from "./Components/Navbar/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<Coin />} path="/coin/:id" />
      </Routes>
    </Router>
  );
}

export default App;
