import React, { useEffect, useState } from "react";
import axios from "axios";

const LatestPosts = () => {
  const [blogs, setBlogs] = useState([]);
  const [checkedPosts, setCheckedPosts] = useState({});

  useEffect(() => {
    // Fetch blogs from API
    axios
      .get(import.meta.env.VITE_APP_SERVER + "/blog/")
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
          excerpt: truncateContent(blog.content, 100), // Truncate to 100 words
          isLatest: blog.latest, // Use the latest property from the backend
        }));
        setBlogs(blogData);

        // Initialize checkedPosts based on isLatest property
        const initialCheckedPosts = {};
        blogData.forEach((blog) => {
          initialCheckedPosts[blog.id] = blog.isLatest;
        });
        setCheckedPosts(initialCheckedPosts);
      })
      .catch((error) => {
        console.error("Error fetching blogs:", error);
      });
  }, []);

  const truncateContent = (content, wordLimit) => {
    const text = content.replace(/<[^>]+>/g, ""); // Strip HTML tags
    const words = text.split(/\s+/); // Split by whitespace
    return (
      words.slice(0, wordLimit).join(" ") +
      (words.length > wordLimit ? "..." : "")
    );
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleChange = async (e, id) => {
    const isChecked = e.target.checked;
    setCheckedPosts((prevState) => ({ ...prevState, [id]: isChecked }));

    const formData = new FormData();
    formData.append("id", id);
    formData.append("latest", isChecked);

    try {
      const response = await axios.post(
        import.meta.env.VITE_APP_SERVER + "/blog/addtolatest/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        setBlogs((prevBlogs) =>
          prevBlogs.map((blog) =>
            blog.id === id ? { ...blog, isLatest: isChecked } : blog
          )
        );
      } else {
        console.error("Failed to update the latest status:", response.data.msg);
      }
    } catch (error) {
      console.error("There was an error updating the status!", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-[#F05225]">All Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-white dark:bg-[#101010] hover:shadow-[#F05225]/90 transition-all duration-300 cursor-pointer rounded-lg shadow-sm p-4"
          >
            <div className="flex justify-end items-center mb-3">
              <input
                type="checkbox"
                name={`latest-post-${blog.id}`}
                checked={!!checkedPosts[blog.id]}
                onChange={(e) => handleChange(e, blog.id)}
                className="custom-checkbox"
              />
            </div>
            <img
              src={`${import.meta.env.VITE_APP_SERVER}${blog.thumbnail}`}
              alt={blog.title}
              className="mb-4 w-full h-48 object-cover rounded"
            />
            <h2 className="text-xl font-semibold mb-2 text-[#101010] dark:text-[#fff]">
              {blog.title}
            </h2>
            <div className="flex items-center justify-between mb-4">
              <p className="text-[#101010] dark:text-[#fff] text-sm">
                Author: {blog.author}
              </p>
              <p className="text-[#101010] dark:text-[#fff] text-sm">
                Posted on: {formatDate(blog.timeStamp)}
              </p>
            </div>
            <p className="text-[#101010] dark:text-[#fff] mb-4">
              {blog.excerpt}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestPosts;
