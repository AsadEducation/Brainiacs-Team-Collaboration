import { Route, Routes } from "react-router";
import "./App.css";
import Home from "./pages/Home/Home";
import MainLayout from "./Layouts/MainLayout";

function App() {
  return (
    <Routes>
      <Route  path="/" element={<MainLayout />} >
        <Route index element={<Home/>} />
      </Route>
    </Routes>
  );
}

export default App;
