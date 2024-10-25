import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./pages/Home";
import CategoryPage from "./pages/CategoryPage";
import BlogDetailPage from "./pages/BlogDetailPage";
import Editor from "./pages/Editor";
import HomeOutlet from "./Outlet/HomeOutlet";
import AdminOutlet from "./Outlet/AdminOutlet";
import AllBlogs from "./pages/AllBlogs";
import LatestPosts from "./Components/LatestPost";
import EditBlog from "./pages/EditBlog";

function App() {
  return (
    <div className="bg-white dark:bg-[#101010]">
      <Router>
        <Routes>
          <Route path="/" element={<HomeOutlet />}>
            <Route path="/" element={<Home />} />
            <Route path="/category/:category" element={<CategoryPage />} />
            <Route path="/blogs/:id" element={<BlogDetailPage />} />
          </Route>
          <Route path="/dashboard" element={<AdminOutlet />}>
            <Route path="/dashboard" element={<AllBlogs />} />
            <Route path="/dashboard/latest" element={<LatestPosts />} />
            <Route path="/dashboard/edit/:post_id" element={<EditBlog />} />
            <Route path="/dashboard/editor" element={<Editor />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
