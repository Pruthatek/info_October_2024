import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const CategoryPage = () => {
  const { category } = useParams(); // Get category from params
  const [blogs, setBlogs] = useState([]);
  const [latestBlogs, setLatestBlogs] = useState([]);

  useEffect(() => {
    // Fetch blogs from API
    axios
      .get(`${import.meta.env.VITE_APP_SERVER}/blog/`)
      .then((response) => {
        const blogData = response.data.map((blog) => ({
          id: blog.id,
          title: blog.title,
          author: blog.author,
          category: blog.Category, // Match category field with params
          slug: blog.slug,
          timeStamp: blog.timeStamp,
          thumbnail: blog.thumbnail,
          content: blog.content,
          isDeleted: blog.isDeleted,
          excerpt: truncateContent(blog.content, 20), // Truncate to 20 words
          isLatest: blog.latest,
        }));
        console.log("Category from params:", category);
        console.log("Categories in blog data:", blogData.map(blog => blog.category));


        const filteredBlogs = blogData.filter((blog) => {
          const blogCategory = blog.category?.toLowerCase().trim();
          const paramCategory = category?.toLowerCase().trim();
          return blogCategory === paramCategory;
        });

        // Log the filtered blogs
        console.log("Filtered Blogs:", filteredBlogs);

        // Set the blogs
        setBlogs(filteredBlogs);
        setLatestBlogs(blogData.filter((blog) => blog.isLatest));
      
      })
      .catch((error) => {
        console.error("Error fetching blogs:", error);
      });
  }, [category]); // Rerun when category changes

  const truncateContent = (content, wordLimit) => {
    const text = content.replace(/<[^>]+>/g, ""); // Strip HTML tags
    const words = text.split(/\s+/); // Split by whitespace
    return (
      words.slice(0, wordLimit).join(" ") +
      (words.length > wordLimit ? "..." : "")
    );
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="container mx-auto px-4 pt-14 mt-24 md:mt-12 h-screen">
      {/* Render blogs that match the category */}
      <h2 className="text-2xl capitalize font-bold mb-4 text-[#F05225] font-primary">
        {category}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-[#efefef] dark:bg-[#1e1e1e] rounded-lg shadow-sm hover:shadow-[#F05225] transition-all duration-300 p-4 cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-x-2 w-1/2">
                <div className="w-8 h-8 border-2 border-black dark:border-white rounded-full">
                  <img
                    src="/img/UserProfile.png"
                    alt=""
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <p className="text-[#101010] dark:text-[#fff] text-sm font-primary font-semibold">
                  {blog.author}
                </p>
              </div>
              <div className="text-[#101010] dark:text-[#fff] text-xs border-[1px] border-[#F05225] px-2 rounded-full flex items-center justify-center font-medium font-primary">
                <p>{formatDate(blog.timeStamp)}</p>
              </div>
            </div>
            <div className="mb-4 h-48 w-full overflow-hidden rounded">
              <img
                src={`${import.meta.env.VITE_APP_SERVER}${blog.thumbnail}`}
                alt={blog.title}
                className="w-full h-full object-cover rounded transition duration-300 ease-in-out group-hover:scale-105"
              />
            </div>
            <h2 className="text-xl font-semibold mb-2 text-[#101010] dark:text-[#fff] font-primary">
              {blog.title}
            </h2>
            <p className="text-[#101010] dark:text-[#fff] mb-4 font-secondary font-medium">
              {blog.excerpt}
            </p>
            <a
              href={`/blogs/${blog.id}`}
              className="text-[#F05225] group-hover:underline font-secondary font-medium text-sm"
            >
              Read more
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
