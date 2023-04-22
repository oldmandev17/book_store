import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/auths/login";
import SignUp from "./pages/auths/signup";
import Forgot from "./pages/auths/forgot";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="forgot" element={<Forgot />} />
      </Routes>
    </BrowserRouter >
  );
}

export default App;
