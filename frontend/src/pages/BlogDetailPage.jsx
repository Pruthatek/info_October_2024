import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const BlogDetailPage = () => {
  const { id } = useParams();
  const [blogData, setBlogData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_APP_SERVER
          }/blog/getBlogDetails/?post_id=${id}`
        );
        setBlogData(response.data);
        setLoading(false);
        console.log(response.data);
      } catch (err) {
        console.error("Error fetching blog data:", err);
        setError(err);
        setLoading(false);
      }
    };
    fetchBlogData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading data: {error.message}</div>;
  }

  if (!blogData) {
    return <div>No blog found.</div>;
  }
  const handleViewMoreClick = (index) => {
    const section = document.getElementById(index);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="container mx-auto p-4 md:mt-12 mt-24">
      <h1 className="text-3xl font-bold mb-4 font-primary text-[#F05225] capitalize">
        {blogData.title}
      </h1>
      <div className="flex lg:flex-row flex-col my-7">
        {/* experience box start */}
        <div className="rounded border-slate-300 w-[260px] h-[248px] border-[1px] md:mx-4 md:my-4 lg:my-0">
          <div className="w-20  m-4">
            <img src="/img/Pruthateknew.png" alt="" />
          </div>

          <div className="flex">
            <div className="mx-4 dark:text-white text-black font-semibold text-[12px]">
              <p className="text-start mx-5">3+</p>
              <p className="text-start w-[60px]">Years of Experience</p>
            </div>

            <div className="mx-4 dark:text-white text-black font-semibold text-[12px]">
              <p className="text-start mx-6">5</p>
              <p className="text-start w-[60px]">Products Delivered</p>
            </div>

            <div className="mx-4 dark:text-white text-black font-semibold text-[12px]">
              <p className="text-start mx-3">30+</p>
              <p className="text-start w-[60px]">Clients</p>
            </div>
          </div>

          <p className=" text-black font-medium bg-slate-200 text-[12px] rounded-md text-start p-3 m-4">
            We are a global company that offers top-notch and superior online
            and mobile app development.{" "}
            <a
              target="_blank"
              href="https://pruthatek.com"
              className="underline text-blue-400"
            >
              Pruthatek.com
            </a>
          </p>
        </div>
        {/* experience box end */}
        {/* ads box start */}
        {blogData.add_to_top === true && (
          <div className="rounded md:flex md:flex-row md:flex-wrap border-slate-300 h-fit dark:text-white text-black lg:w-[900px] md:w-[730px] w-[100%] border-[1px] md:m-4 md:my-0 my-4">
            {blogData.paragraphs.map((para, index) => {
              return (
                <div
                  key={index}
                  className="lg:w-[400px] md:h-[100px] h-fit w-full md:w-[314px] md:mx-6  md:mb-2 flex justify-center  border-b-slate-300 border-b-[1px]"
                >
                  <div className="pt-8">
                    <div className="md:w-[50px] md:h-[50px] w-[70px] h-[70px] ">
                      <img
                        src={`${import.meta.env.VITE_APP_SERVER}${
                          para.ad_field_image
                        }`}
                      />
                    </div>
                  </div>
                  <div className="flex md:flex-row flex-col justify-between dark:text-white text-black">
                    <div className="flex flex-col pl-4">
                      <p className="text-[14px] font-semibold pt-[30px] text-start lg:w-[154px] w-[154px] md:w-[150px] truncate">
                        {para.ad_field_product_name}
                      </p>
                      <p className="text-start text-[14px] text-[#737373]">
                        {para.ad_field_model}
                      </p>
                    </div>
                    <div>
                      <div className="border-[#f05225] border-[1px] flex justify-center items-center text-[12px] lg:ml-[34px] md:ml-[0px] ml-[10px] md:mt-8 mt-6  rounded bg-transparent w-[110px] lg:w-[140px] md:w-[100px] h-[32px]">
                        <Link to={para.ad_field_link} target="_blank">
                          &#8377;{para.ad_field_price}
                        </Link>
                      </div>
                      <p
                        onClick={() => handleViewMoreClick(index)}
                        className="text-[12px] cursor-pointer lg:ml-[64px] md:ml-[15px] ml-[30px] mt-2 mb-2 md:mb-0"
                      >
                        View Details
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {/* ads box end */}
      </div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-x-2 w-1/2">
          <div className="w-[19%] h-[19%] md:w-[6%] md:h-[6%] border-2 border-black dark:border-white rounded-full">
            <img
              src="/img/UserProfile.png"
              alt=""
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <p className="text-[#101010] dark:text-[#fff] text-[16px] font-primary font-semibold">
            {blogData.author}
          </p>
        </div>
        <div className="text-[#101010] dark:text-[#fff] text-xs border-[1px] border-[#F05225] px-4 py-2 rounded-full flex items-center justify-center font-medium font-primary">
          <p>{new Date(blogData.timestamp).toLocaleDateString()}</p>
        </div>
      </div>
      <div className="text-[#101010] dark:text-[#fff] mb-4 font-secondary  flex flex-col gap-y-4 items-center tracking-wide text-justify">
        {blogData.paragraphs.map((para, index) => (
          <div className="">
            <h1 className="text-[20px] font-semibold text-black py-2 ">
              {para.ad_field_product_name}
            </h1>
            <img
              id={index}
              src={`${import.meta.env.VITE_APP_SERVER}${para.ad_field_image}`}
              className="lg:w-[70%] w-[100%] object-cover h-[500px]"
            />
            <p key={para.id} className="text-[18px] font-medium py-5">
              {para.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogDetailPage;
