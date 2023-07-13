import { Routes, Route } from "react-router-dom";
import Signup from "./Components/Signup/Signup";
import Home from "./Components/Home/Home";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Signup />} />
        <Route exact path="/dashboard" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;