import { Route, Routes } from "react-router";
import "./App.css";
import Home from "./pages/Home/Home.jsx";
import MainLayout from "./Layouts/MainLayout";
import SignUp from "./pages/SignUp/SignUp.jsx";
import Login from "./pages/Login/Login.jsx";

function App() {


  return (
    <Routes>
      <Route path="/" element={<MainLayout />} >
        <Route index element={<Home />} />

        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>

  );
}

export default App;
