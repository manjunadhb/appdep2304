import "./App.css";
import EditProfile from "./components/EditProfile";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/editProfile" element={<EditProfile />}></Route>
        <Route path="/home" element={<Home />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
