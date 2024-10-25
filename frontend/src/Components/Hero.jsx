import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";

const Hero = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_SERVER}/blog/`
        );
        const data = response.data
          .filter((post) => post.latest) // Filter for latest posts
          .map((post) => ({
            title: post.title,
            description: post.content.substring(0, 150) + "...",
            thumbnail: post.thumbnail,
            id: post.id,
          }));
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="hero bg-gray-100 dark:bg-[#1c1c1c] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          className="mySwiper"
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
        >
          {posts.map((post, index) => (
            <SwiperSlide key={index}>
              <div className="post-card bg-white dark:bg-[#101010] rounded-lg shadow-lg overflow-hidden p-6 text-center">
                <img
                  className="w-full h-48 object-cover mb-4 mx-auto"
                  src={`${import.meta.env.VITE_APP_SERVER}/${post.thumbnail}`}
                  alt={post.title}
                />
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2 font-primary">
                  {post.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4 font-secondary font-medium">
                  {post.description}
                </p>
                <div className="flex items-center justify-center cursor-pointer md:w-[10%] mx-auto">
                  <a
                    href={`/blogs/${post.id}`}
                    className="text-[#f05225]/90 hover:text-[#f05225] font-semibold font-secondary"
                  >
                    Read More
                  </a>

                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    stroke="#f05225"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Hero;
