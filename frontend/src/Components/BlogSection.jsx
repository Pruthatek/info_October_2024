import React, { useEffect, useState } from "react";
import axios from "axios";

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState({});
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
          category: blog.Category,
          slug: blog.slug,
          timeStamp: blog.timeStamp,
          thumbnail: blog.thumbnail,
          content: blog.content,
          isDeleted: blog.isDeleted,
          excerpt: truncateContent(blog.content, 20), // Truncate to 20 words
          isLatest: blog.latest,
        }));
        setBlogs(blogData);
        categorizeBlogs(blogData);
        setLatestBlogs(blogData.filter((blog) => blog.isLatest));
      })
      .catch((error) => {
        console.error("Error fetching blogs:", error);
      });
  }, []);

  const categorizeBlogs = (blogs) => {
    const categoryMap = {};
    blogs.forEach((blog) => {
      if (!categoryMap[blog.category]) {
        categoryMap[blog.category] = [];
      }
      categoryMap[blog.category].push(blog);
    });
    setCategories(categoryMap);
  };

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
    <div className="container mx-auto p-10">
      {/* Latest Blogs */}
      {latestBlogs.length > 0 && (
        <div className="mb-12">
          <h1 className="text-3xl font-bold mb-6 text-[#F05225] font-primary">
            Latest Blogs
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {latestBlogs.map((blog) => (
              <div
                key={blog.id}
                className="bg-[#efefef] dark:bg-[#1e1e1e] hover:shadow-[#F05225] transition-all duration-300 cursor-pointer rounded-lg shadow-sm p-4 group"
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
                <h2 className="text-xl font-semibold mb-2 text-[#101010] dark:text-[#fff] font-primary group-hover:text-[#F05225] transition-all duration-300">
                  {blog.title}
                </h2>
                <p className="text-[#101010] dark:text-[#fff] mb-4 font-secondary">
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
      )}

      {/* All Blogs */}
      {Object.keys(categories).map((category) => (
        <div key={category} className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-[#F05225] font-primary">
            {category}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories[category].map((blog) => (
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
      ))}
    </div>
  );
};

export default BlogPage;
