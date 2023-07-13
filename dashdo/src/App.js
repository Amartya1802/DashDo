import { Routes, Route } from "react-router-dom";

import Signup from "./Components/Signup/Signup";
import Dashboard from "./Components/Home/Home";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Signup />} />
        <Route exact path="/home_page" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;