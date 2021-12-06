import "./App.css";
import NavBar from "./Components/NavBar";
import Backoffice from "./Components/Backoffice";
import Body from "./Components/Body";
import DetailsPage from "./Components/DetailsPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Router>
        <Routes>
          <Route path="/" element={<Body />} />
          <Route path="/backoffice" element={<Backoffice />} />
          <Route path="/detailsPage/:productId" element={<DetailsPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
