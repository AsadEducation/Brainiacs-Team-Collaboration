import { Route, Routes } from "react-router";
import "./App.css";
import Home from "./pages/Home/Home";
import MainLayout from "./Layouts/MainLayout";
import Login from "./pages/Login/Login";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />} >
        <Route index element={<Home />} />
        
        <Route path="login" element={<Login />} />
      </Route>
    </Routes>
  );
}

export default App;
