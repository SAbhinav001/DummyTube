import React, { useEffect, useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import ytLogo from "../images/yt-logo.png";
import ytLogoMobile from "../images/yt-logo-mobile.png";

import { SlMenu } from "react-icons/sl";
import { IoIosSearch } from "react-icons/io";
import { RiVideoAddLine } from "react-icons/ri";
import { FiBell } from "react-icons/fi";
import { CgClose } from "react-icons/cg";

import { Context } from "../context/contextApi";
import Loader from "../shared/loader";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const { loading, mobileMenu, setMobileMenu } = useContext(Context);

  const [searchResult, setSearchresults] = useState([]);
  const [showSuggestion, setShowSuggestion] = useState(false);

  const navigate = useNavigate();

  const searchQueryHandler = (event) => {
    navigate(`/search/${searchQuery}`);
  };

  const searchQueryHandler1 = (item) => {
    
    navigate(`/search/${item}`);

  };

  useEffect(() => {
    const i = setTimeout(() => fetchResults(), 150);

    return () => {
      clearTimeout(i);
    };
  }, [searchQuery]);

  const fetchResults = async () => {
    const results = await fetch(
      "http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=" +
        searchQuery
    );
    const json = await results.json();

    setSearchresults(json[1]);
  };

  const mobileMenuToggle = () => {
    setMobileMenu(!mobileMenu);
  };

  const { pathname } = useLocation();
  const pageName = pathname?.split("/")?.filter(Boolean)?.[0];

  return (
    <div className="sticky top-0 z-10 flex flex-row items-center justify-between h-14 px-4 md:px-5 bg-white dark:bg-black">
      {loading && <Loader />}

      <div className="flex h-5 items-center">
        {pageName !== "video" && (
          <div
            className="flex md:hidden md:mr-6 cursor-pointer items-center justify-center h-10 w-10 rounded-full hover:bg-[#303030]/[0.6]"
            onClick={mobileMenuToggle}
          >
            {mobileMenu ? (
              <CgClose className="text-white text-xl" />
            ) : (
              <SlMenu className="text-white text-xl" />
            )}
          </div>
        )}
        <Link to="/" className="flex h-5 items-center">
          <img
            className="h-full hidden dark:md:block"
            src={ytLogo}
            alt="Youtube"
          />
          <img className="h-full md:hidden" src={ytLogoMobile} alt="Youtube" />
        </Link>
      </div>
      <div className="group flex items-center relative">
        <div className="flex h-8 md:h-10 md:ml-10 md:pl-5 border border-[#303030] rounded-l-3xl group-focus-within:border-blue-500 md:group-focus-within:ml-5 md:group-focus-within:pl-0">
          <div className="w-10 items-center justify-center hidden group-focus-within:md:flex">
            <IoIosSearch className="text-white text-xl" />
          </div>
          <input
            type="text"
            className="bg-transparent outline-none text-white pr-5 pl-5 md:pl-0 w-44 md:group-focus-within:pl-0 md:w-64 lg:w-[500px]"
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                searchQueryHandler();
              }
            }}
            placeholder="Search"
            value={searchQuery}
            onFocus={() => setShowSuggestion(true)}
            onBlur={() =>  {
                setTimeout(() => {
                    setShowSuggestion(false);
                  }, 200);
            }}
          />
        </div>

        {searchResult.length > 0 && showSuggestion && (
          <div className="absolute top-full left-0 w-full mt-2 bg-black border border-[#303030] rounded-3xl">
            {searchResult.map((item, index) => {
          
              return (
                <li
                onClick={()=>{
                    searchQueryHandler1(item)
                }}
                  key={index}
                  className="py-2 px-4 hover:bg-gray-700 cursor-pointer text-white"
                >
                  {item}
                </li>
              );
            })}
          </div>
        )}

        <button
          className="w-[40px] md:w-[60px] h-8 md:h-10 flex items-center justify-center border border-l-0 border-[#303030] rounded-r-3xl bg-white/[0.1]"
          onClick={searchQueryHandler}
        >
          <IoIosSearch className="text-white text-xl" />
        </button>
      </div>
      <div className="flex items-center">
        <div className="hidden md:flex">
          <div className="flex items-center justify-center h-10 w-10 rounded-full hover:bg-[#303030]/[0.6]">
            <RiVideoAddLine className="text-white text-xl cursor-pointer" />
          </div>
          <div className="flex items-center justify-center ml-2 h-10 w-10 rounded-full hover:bg-[#303030]/[0.6]">
            <FiBell className="text-white text-xl cursor-pointer" />
          </div>
        </div>
        <div className="flex h-8 w-8 overflow-hidden rounded-full md:ml-4">
          <img src="https://xsgames.co/randomusers/assets/avatars/male/65.jpg" />
        </div>
      </div>
    </div>
  );
};

export default Header;
