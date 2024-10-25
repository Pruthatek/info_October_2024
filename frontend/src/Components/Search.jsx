import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (searchQuery.length > 0) {
      axios
        .get(
          `${
            import.meta.env.VITE_APP_SERVER
          }/blog/searchDatabase/?searchQuery=${searchQuery}`
        )
        .then((res) => {
          setSearchResults(res.data.data.posts);
          setDropdownVisible(true);
        });
    } else {
      setSearchResults([]);
      setDropdownVisible(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="bg-gradient-to-r from-[#f05225] to-[#eea820] p-[2px] lg:ml-[30px] md:ml-[50px] text-lg rounded-lg relative md:w-[260px]">
        <div className="dark:bg-[#101010] bg-white rounded-md px-1 lg:px-3 py-0.5 flex items-center md:justify-center">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="lg:bg-transparent dark:bg-[#101010] bg-white rounded-lg pl-2 dark:text-white text-black lg:p-0 py-1 lg:py-0 outline-none font-primary w-full"
          />
          {/* Search icon svg */}
          <svg
            width="22"
            height="21"
            viewBox="0 0 22 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="cursor-pointer"
          >
            <circle
              cx="8.65871"
              cy="7.92366"
              r="6.76271"
              stroke="url(#paint0_linear_1148_5902)"
              strokeWidth="2"
            />
            <path
              d="M15.4214 14.6865L20.896 19.839"
              stroke="url(#paint1_linear_1148_5902)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient
                id="paint0_linear_1148_5902"
                x1="6.60191"
                y1="9.45887"
                x2="-2.70468"
                y2="3.4708"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#f05225" />
                <stop offset="1" stopColor="#eea820" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_1148_5902"
                x1="17.3262"
                y1="17.8476"
                x2="13.6962"
                y2="15.366"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#f05225" />
                <stop offset="1" stopColor="#eea820" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
      {dropdownVisible && (
        <div className="absolute md:top-[30px] top-10 md:right-0 w-[260px] mt-5 bg-white/90 dark:bg-[#262626] backdrop-blur rounded-lg transition-all duration-300 shadow-lg z-50 font-primary">
          {searchResults.length > 0 ? (
            searchResults.map((result) => (
              <a
                href={`/blogs/${result.pk}`}
                key={result.pk}
                className="flex items-center gap-8 px-2 py-2 border-b border-[rgba(166,166,166,0.3)] last-of-type:border-none"
                onClick={() => setDropdownVisible(false)}
              >
                <div className="text-sm font-medium w-full px-4 py-2 text-[#101010] dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-[#1d1d1d] rounded">
                  <p>{result.title}</p>
                </div>
              </a>
            ))
          ) : (
            <div className="px-2 py-2">
              <p className="dark:text-white text-[#101010] font-medium">
                No results Found
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
