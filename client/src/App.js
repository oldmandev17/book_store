import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/auths/login";
import SignUp from "./pages/auths/signup";
import Forgot from "./pages/auths/forgot";
import AdminPage from "./pages/admins";
import Category from "./pages/admins/categories";
import Product from "./pages/admins/products";
import Bill from "./pages/admins/bills";
import Account from "./pages/admins/accounts";
import Setting from "./pages/admins/settings";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="forgot" element={<Forgot />} />
        <Route path="admin">
          <Route path="home" element={<AdminPage />} />
          <Route path="cate" element={<Category />} />
          <Route path="product" element={<Product />} />
          <Route path="bill" element={<Bill />} />
          <Route path="account" element={<Account />} />
          <Route path="setting" element={<Setting />} />
        </Route>
      </Routes>
    </BrowserRouter >
  );
}

export default App;
