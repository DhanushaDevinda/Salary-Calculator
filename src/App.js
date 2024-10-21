import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Calculator from "./component/Calculator";
import Layout from "./component/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="calculator" element={<Calculator />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
