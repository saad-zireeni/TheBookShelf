import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Sidebar from "./pages/Sidebar";

function App() {
  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="" element={<Sidebar />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
