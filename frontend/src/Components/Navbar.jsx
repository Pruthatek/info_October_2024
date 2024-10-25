import React, { useState, useEffect } from "react";
import axios from "axios";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import SearchBar from "./Search";
import Lang from "./Lang";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_SERVER}/blog/`
        );
        const data = response.data;

        const categoriesMap = {};

        data.forEach((item) => {
          const categoryTitle = item.Category;
          if (!categoriesMap[categoryTitle]) {
            categoriesMap[categoryTitle] = {
              title: categoryTitle,
              slug: categoryTitle.toLowerCase().replace(/\s+/g, "-"),
              blogs: [],
            };
          }
          categoriesMap[categoryTitle].blogs.push({
            title: item.title,
            slug: item.slug,
            id: item.id,
          });
        });

        setCategories(Object.values(categoriesMap));
      } catch (error) {
        console.error("There was an error fetching the data!", error);
      }
    };

    fetchData();
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleSubMenu = (category) => {
    if (activeCategory === category) {
      setActiveCategory(null);
    } else {
      setActiveCategory(category);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark", !darkMode);
  };

  const handleSearch = async () => {
    if (!searchQuery) {
      setSearchResults([]);
      setNoResults(false);
      return;
    }

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_SERVER}/blog/searchDatabase/`,
        {
          params: {
            searchQuery: searchQuery,
          },
        }
      );
      const results = response.data;
      setSearchResults(results);
      setNoResults(results.length === 0);
      console.log(searchResults);
    } catch (error) {
      console.error("There was an error performing the search!", error);
    }
  };

  return (
    <div className="relative">
      <nav className="bg-white dark:bg-[#101010] shadow-md w-screen fixed top-0 z-50">
        <div className="container mx-auto px-4 py-2 flex justify-between gap-x-5 items-center w-full">
          <div className="flex items-center justify-start gap-x-10 w-full">
            <div className="object-cover w-40">
              <Link to="/">
                <img src="/img/Pruthateknew.png" alt="" className="w-full" />
              </Link>
            </div>
            <div className="hidden lg:flex items-center justify-start gap-x-5 w-full">
              {categories.map((category, index) => {
                return (
                  <div key={index} className="relative group z-50">
                    <Link
                      to={`/category/${category.slug}`}
                      className="text-[#101010] dark:text-gray-200 hover:text-[#F05225] font-semibold font-primary text-lg"
                    >
                      {category.title}
                    </Link>
                    {category.blogs && category.blogs.length > 0 && (
                      <div className="absolute hidden group-hover:flex bg-white rounded dark:bg-[#262626] shadow-lg w-[500px] top-6 left-0 flex-row flex-wrap gap-x-4 gap-y-2 p-5 place-self-center place-items-center capitalize">
                        {category.blogs.map((blog, subIndex) => (
                          <Link
                            key={subIndex}
                            to={`/blogs/${blog.id}`}
                            className="text-[#101010] hover:text-[#F05225]   font-secondary font-medium"
                          >
                            {blog.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="hidden lg:flex items-center space-x-4">
            {/* Search */}
            <SearchBar />

            {/* Language */}
            <Lang darkMode={darkMode} />
            {/* Theme */}
            <div>
              <button onClick={toggleDarkMode} className="w-8">
                {darkMode ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="#fff"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 3v1m6.364.636l-.707.707m2.12 4.95h-1m-3.536 6.364l-.707-.707m-4.95 2.12v-1m-6.364-3.536l.707-.707m-2.12-4.95h1M4.222 5.636l.707-.707m6.364 12.728a6.001 6.001 0 01-6.364-9.9 6.001 6.001 0 009.9 6.364c-.73.4-1.533.68-2.364.798a6.001 6.001 0 01-1.172.234z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 3v1m6.364.636l-.707.707m2.12 4.95h-1m-3.536 6.364l-.707-.707m-4.95 2.12v-1m-6.364-3.536l.707-.707m-2.12-4.95h1M4.222 5.636l.707-.707m6.364 12.728a6.001 6.001 0 01-6.364-9.9 6.001 6.001 0 009.9 6.364c-.73.4-1.533.68-2.364.798a6.001 6.001 0 01-1.172.234z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Menu */}
          <div className="flex lg:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-500 hover:text-[#F05225] focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            </button>
          </div>
        </div>
        {/* Search Mobile */}
        <div className="px-4 py-2 block lg:hidden">
          <SearchBar />
        </div>
      </nav>
      {/* Mobile */}
      <div
        className={`fixed z-50 left-0 right-0 top-24 mt-2 gap-y-2 p-4 transition-all duration-300 flex flex-col items-start bg-[#fff] justify-center dark:bg-[#101010] ${
          isOpen
            ? "opacity-100 scale-y-100"
            : "opacity-0 scale-y-95 pointer-events-none"
        }`}
      >
        {/* Links */}
        {categories.map((category, index) => (
          <div key={index} className="w-full">
            <div
              onClick={() => toggleSubMenu(category.title)}
              className="w-full px-4 py-2 text-[#101010] dark:text-gray-200 flex items-center justify-between cursor-pointer font-primary font-semibold"
            >
              <p>{category.title}</p>
              {activeCategory === category.title ? (
                <ChevronDown />
              ) : (
                <ChevronRight />
              )}
            </div>
            {activeCategory === category.title && category.blogs && (
              <div className="pl-4">
                {category.blogs.map((blog, subIndex) => (
                  <div
                    key={subIndex}
                    className="w-full flex items-center px-4 py-2 text-[#101010] dark:text-gray-200 font-secondary font-medium"
                  >
                    <ChevronRight />
                    <Link to={`/blogs/${blog.id}`} className="ml-2">
                      {blog.title}
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
        {/* Buttons */}
        <div className="flex items-center mt-4">
          {/* Language */}
          <Lang darkMode={darkMode}/>
          {/* Theme */}
          <div className="px-4 py-2">
            <button onClick={toggleDarkMode} className="w-8">
              {darkMode ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="#fff"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3v1m6.364.636l-.707.707m2.12 4.95h-1m-3.536 6.364l-.707-.707m-4.95 2.12v-1m-6.364-3.536l.707-.707m-2.12-4.95h1M4.222 5.636l.707-.707m6.364 12.728a6.001 6.001 0 01-6.364-9.9 6.001 6.001 0 009.9 6.364c-.73.4-1.533.68-2.364.798a6.001 6.001 0 01-1.172.234z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3v1m6.364.636l-.707.707m2.12 4.95h-1m-3.536 6.364l-.707-.707m-4.95 2.12v-1m-6.364-3.536l.707-.707m-2.12-4.95h1M4.222 5.636l.707-.707m6.364 12.728a6.001 6.001 0 01-6.364-9.9 6.001 6.001 0 009.9 6.364c-.73.4-1.533.68-2.364.798a6.001 6.001 0 01-1.172.234z"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
