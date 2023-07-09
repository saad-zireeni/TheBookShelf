import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";
import Home from "./pages/home";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import Blog from "./pages/blog";
import Books from "./pages/books";
import Postdetails from "./components/postdetails";
import Addcomments from "./components/addcomments";
import Wishlist from "./pages/wishList";
import NavMenu from "./components/secondNav";
import UserProfile from "./pages/UserProfile";
import ProductOverview from "./components/productDetails";
import CategoryDetails from "./components/CategoryDetails";
import UserPosts from "./pages/userPosts";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <NavMenu />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/ContactUs" element={<ContactUs />} />
          <Route path="/LogIn" element={<LogIn />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/Blog" element={<Blog />} />
          <Route path="/books" element={<Books />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/Postdetails/:post_id" element={<Postdetails />} />
          <Route path="/Addcomments" element={<Addcomments />} />
          <Route path="/Wishlist" element={<Wishlist />} />
          <Route path="/UserProfile" element={<UserProfile />} />
          <Route path="/ProductOverview/:id" element={<ProductOverview />} />
          <Route path="/category/:categoryName" element={<CategoryDetails />} />
          <Route path="/UserPosts/:user_id" element={<UserPosts />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

//هاض عشان يشتغل السيرفر اللي راح نجيب من الكتب

// json-server --watch db.json --port 9000

export default App;
