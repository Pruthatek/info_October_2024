// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const AllBlogs = () => {
//   const [blogs, setBlogs] = useState([]);

//   useEffect(() => {
//     // Fetch blogs from API
//     axios
//       .get(`${import.meta.env.VITE_APP_SERVER}/blog/`)
//       .then((response) => {
//         const blogData = response.data.map((blog) => ({
//           id: blog.pk,
//           title: blog.fields.title,
//           author: blog.fields.author,
//           category: blog.fields.Category,
//           slug: blog.fields.slug,
//           timeStamp: blog.fields.timeStamp,
//           thumbnail: blog.fields.thumbnail,
//           content: blog.fields.content,
//           isDeleted: blog.fields.isDeleted,
//           excerpt: truncateContent(blog.fields.content, 100), // Truncate to 100 words
//         }));
//         setBlogs(blogData);
//       })
//       .catch((error) => {
//         console.error("Error fetching blogs:", error);
//       });
//   }, []);

//   const truncateContent = (content, wordLimit) => {
//     return content.split(" ").slice(0, wordLimit).join(" ") + "...";
//   };

//   const handleDelete = (id) => {
//     // Add delete functionality here
//     console.log("Delete blog with id:", id);
//   };

//   const handleEdit = (id) => {
//     // Add edit functionality here
//     console.log("Edit blog with id:", id);
//   };

//   const handlePreview = (id) => {
//     // Add preview functionality here
//     console.log("Preview blog with id:", id);
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {blogs.map((blog) => (
//           <div key={blog.id} className="bg-white shadow-md rounded p-4">
//             <img
//               src={`http://127.0.0.1:8000/media/${blog.thumbnail}`}
//               alt={blog.title}
//               className="w-full h-40 object-cover rounded mb-4"
//             />
//             <h2 className="text-3xl font-bold mb-2">{blog.title}</h2>
//             <div
//               className="text-gray-700 mb-4"
//               dangerouslySetInnerHTML={{ __html: blog.excerpt }}
//             />
//             <div className="flex justify-between">
//               <button
//                 onClick={() => handleDelete(blog.id)}
//                 className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-700"
//               >
//                 Delete
//               </button>
//               <button
//                 onClick={() => handleEdit(blog.id)}
//                 className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-700"
//               >
//                 Edit
//               </button>
//               <button
//                 onClick={() => handlePreview(blog.id)}
//                 className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-700"
//               >
//                 Preview
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AllBlogs;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const AllBlogs = (props) => {
  const [blogData, setBlogData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_SERVER}/blog/`
        );
        const fetchedBlogData = response.data;
        setBlogData(fetchedBlogData);
      } catch (error) {
        console.error("Error fetching blog data:", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    const formData = new FormData();
    formData.append("id", id);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_SERVER}/blog/delete/?id=${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        alert(`${id} deleted`);
        setBlogData((prevData) => prevData.filter((blog) => blog.id !== id));
      } else {
        console.error("Error deleting blog:", response.data.msg);
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  return (
    <div className="my-5 flex flex-row flex-wrap items-center justify-center gap-x-10 gap-y-5 lg:px-20 px-10 w-full">
      {blogData.map((blog, index) => (
        <div key={blog.id}>
          <div
            className={
              "hover:shadow-none hover:border-[#F05225] border-transparent border-[1px] hover:border-[1px] transition-all duration-500 ease-in-out hover:bg-gradient-to-b rounded-lg cursor-pointer " +
              (props.theme === "light" ? "glassmorphism-2" : "glassmorphism")
            }
            data-aos="fade-up"
            data-aos-duration="600"
            data-aos-delay="0"
            data-aos-easing="ease-in-out"
            data-aos-mirror="true"
            data-aos-once="false"
            data-aos-anchor-placement="top-center"
          >
            <div className="w-[260px] h-[380px] p-3 rounded-md">
              <div className="flex flex-row justify-between  items-center">
                <div className="flex flex-row justify-start items-center space-x-3">
                  <img
                    className="w-[15%] h-[15%] dark:border-[2px] dark:bg-white border-[2px] object-cover border-black rounded-full dark:border-white"
                    src="/img/UserProfile.png"
                    alt="owner"
                  />
                  <div className=" font-normal font-cabin text-[13px] capitalize ">
                    <h1>{blog.author}</h1>
                  </div>
                </div>
                <div className="border-[1px] border-[#F05225] rounded-full py-1 whitespace-nowrap px-2">
                  <h5 className=" flex items-center font-normal lg:text-description text-[10px]">
                    {blog.timeStamp}
                  </h5>
                </div>
              </div>
              <div className="mt-4 h-[50%] mb-2 overflow-hidden rounded-lg">
                <img
                  className="w-full h-full mb-1 rounded-md transition duration-300 ease-in-out hover:scale-105"
                  src={`${import.meta.env.VITE_APP_SERVER}${blog.thumbnail}`}
                  alt="Blog Thumbnail"
                />
              </div>
              <div className="">
                <h1 className="p-1 text-subtitle not-italic font-cabin font-medium capitalize">
                  {blog.title}
                </h1>
              </div>
              <div className="">
                <p className="p-1 text-description not-italic font-light capitalize">
                  {blog.content.slice(0, 20)}...
                </p>
              </div>
              <Link
                to={`/blogs/${blog.id}`}
                className="text-[#F05225] font-normal text-end cursor-pointer"
              >
                Read more
              </Link>
              <div className="flex gap-x-5 items-center">
                <Link
                  to={`/dashboard/edit/${blog.id}`}
                  className="w-[100px] h-[30px] rounded-[10px] cursor-pointer mt-2 bg-orange-400 text-white flex justify-center items-center"
                >
                  Edit
                </Link>
                <div
                  onClick={() => handleDelete(blog.id)}
                  className="bg-red-500 cursor-pointer text-white w-[100px] h-[30px] flex justify-center mt-2 items-center rounded hover:bg-red-700"
                >
                  Delete
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllBlogs;
