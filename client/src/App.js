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
import Author from "./pages/admins/authors";
import MainUSer from "./pages/User";
import ProductUSer from "./pages/User/product";
import DetailProductUSer from "./pages/User/product/detail";


function App() {
  return (
    <BrowserRouter>
      <Routes>
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
          <Route path="author" element={<Author />} />
        </Route>
        <Route path="">
          <Route path="home" element={<MainUSer />} />
          <Route path="product" element={<ProductUSer />} />
          <Route path="detail" element={<DetailProductUSer />} />
        </Route>
      </Routes>
    </BrowserRouter >
  );
}

export default App;
