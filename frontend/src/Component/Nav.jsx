import React, { useContext, useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { GiHamburgerMenu, GiTreehouse } from "react-icons/gi";
import logo from "../assets/logo.png";
import { CgProfile } from "react-icons/cg";
import { MdWhatshot } from "react-icons/md";
import { GiFamilyHouse } from "react-icons/gi";
import { MdBedroomParent } from "react-icons/md";
import { MdOutlinePool } from "react-icons/md";
import { GiWoodCabin } from "react-icons/gi";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { IoBedOutline } from "react-icons/io5";
import { FaTreeCity } from "react-icons/fa6";
import { BiBuildingHouse } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { authDataContext } from "../Context/AuthContext";
import axios from "axios";
import { userDataContext } from "../Context/UserContext";
import { listingDataContext } from "../Context/ListingContext";
// import { search } from "../../../backend/controllers/listing.controller";
function Nav() {
  let [showpopup, setShowpopup] = useState(false);
  let { userData, setUserData } = useContext(userDataContext);
  let navigate = useNavigate();
  let { serverUrl, loading } = useContext(authDataContext);
  let [cate, setCate] = useState();
  let {
    listingData,
    setListingData,
    setNewListData,
    newListData,
    searchData,
    handleSearch,
    handleViewCard,
    startNewListing,
  } = useContext(listingDataContext);
  let [input, setInput] = useState("");

  const handleLogout = async () => {
    try {
      let result = await axios.post(
        serverUrl + "/api/auth/logout",
        {},
        { withCredentials: true }
      );

      setUserData(null);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };
  const handleCategory = (category) => {
    setCate(category);
    if (category == "trending") {
      setNewListData(listingData);
    } else {
      setNewListData(listingData.filter((list) => list.category == category));
    }
  };
  const handleClick = (id) => {
    if (userData) {
      handleViewCard(id);
    } else {
      navigate("/login");
    }
  };
  useEffect(() => {
    handleSearch(input);
  }, [input]);
  return (
    <div className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-[#e5e7eb]">
      {/* Global Loading Indicator */}
      {loading && (
        <div className="w-full h-1 bg-gray-200">
          <div
            className="h-full bg-red-500 animate-pulse"
            style={{ width: "100%" }}
          />
        </div>
      )}
      <div className="w-[100vw] min-h-[80px] border-b-[1px] border-[#dcdcdc] px-[40px] flex items-center justify-between md:px-[40px] ">
        <div
          className="flex items-center gap-[10px] cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img
            src={logo}
            alt="Wander Inn logo"
            className="w-[70px] h-[56px] md:w-[70px] md:h-[64px] object-contain"
          />
          <span className="text-[24px] brand-font text-[#333]">WanderInn</span>
        </div>
        <div className="w-[35%] relative hidden md:block">
          <input
            type="text"
            className="w-[100%] px-[30px] py-[10px] border-[2px] border-[#bdbaba] outline-none overflow-auto rounded-[30px] text-[17px]"
            placeholder="Any Where | Any Location | Any City "
            onChange={(e) => setInput(e.target.value)}
            value={input}
          />
          <button className="absolute p-[10px] rounded-[50px] bg-[red] right-[3%] top-[5px]">
            <FiSearch className="w-[20px] h-[20px] text-[white]" />
          </button>
        </div>
        <div className="flex items-center justify-center gap-[10px] relative">
          <span
            className="text-[18px] cursor-pointer rounded-[50px] hover:bg-[#ded9d9] px-[8px] py-[5px] hidden md:block"
            onClick={() => {
              startNewListing();
              navigate("/listingpage1");
            }}
          >
            Add Your Home
          </span>
          <button
            className="px-[20px] py-[10px] flex items-center justify-center gap-[5px] border-[1px] border-[#8d8c8c] rounded-[50px] hover:shadow-lg"
            onClick={() => setShowpopup((prev) => !prev)}
          >
            <span>
              <GiHamburgerMenu className="w-[20px] h-[20px]" />
            </span>
            {userData == null && (
              <span>
                <CgProfile className="w-[23px] h-[23px]" />
              </span>
            )}
            {userData != null && (
              <span className="w-[30px] h-[30px] bg-[#080808] text-[white] rounded-full flex items-center justify-center">
                {userData?.name.slice(0, 1)}
              </span>
            )}
          </button>
          {showpopup && (
            <div className="w-[220px] h-[250px] absolute bg-slate-50 top-[110%] right-[3%] border-[1px] border-[#aaa9a9] z-10 rounded-lg md:right-[10%]">
              <ul className="w-[100%] h-[100%] text-[17px] flex items-start justify-around flex-col py-[10px]">
                {!userData && (
                  <li
                    className="w-[100%] px-[15px] py-[10px] hover:bg-[#f4f3f3] cursor-pointer"
                    onClick={() => {
                      navigate("/login");
                      setShowpopup(false);
                    }}
                  >
                    Login
                  </li>
                )}
                {userData && (
                  <li
                    className="w-[100%] px-[15px] py-[10px] hover:bg-[#f4f3f3] cursor-pointer"
                    onClick={() => {
                      handleLogout();
                      setShowpopup(false);
                    }}
                  >
                    Logout
                  </li>
                )}
                {/* <div className="w-[100%] h-[1px] bg-[#c1c0c0]"></div>
                <li
                  className="w-[100%] px-[15px] py-[10px] hover:bg-[#f4f3f3] cursor-pointer"
                  onClick={() => {
                    navigate("/listingpage1");
                    setShowpopup(false);
                  }}
                >
                  List Your Home
                </li> */}
                <li
                  className="w-[100%] px-[15px] py-[10px] hover:bg-[#f4f3f3] cursor-pointer"
                  onClick={() => {
                    navigate("/mylisting");
                    setShowpopup(false);
                  }}
                >
                  My Listings
                </li>
                <li
                  className="w-[100%] px-[15px] py-[10px] hover:bg-[#f4f3f3] cursor-pointer"
                  onClick={() => {
                    navigate("/mybooking");
                    setShowpopup(false);
                  }}
                >
                  My Booking
                </li>
              </ul>
            </div>
          )}
        </div>

        {searchData?.length > 0 && (
          <div
            className="w-[100vw] h-[450px] flex flex-col gap-[20px] absolute top-[50%] overflow-auto left-[0] justify-start
        items-center"
          >
            <div
              className="max-w-[500px] w-[100vw] h-[300px] overflow-hidden flex flex-col bg-[#fefdfd]
          p-[20px] rounded-lg border-[1px] border-[#a2a1a1] cursor-pointer"
            >
              {searchData.map((search) => (
                <div
                  key={search._id}
                  className="border-b border-[black] p-[10px] cursor-pointer hover:bg-gray-100"
                  onClick={() => handleClick(search._id)} // ✅ FIXED
                >
                  {search.title} in {search.landmark}, {search.city}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="w-[100%] h-[60px] flex items-center justify-center md:hidden">
        <div className="w-[90%] relative">
          <input
            type="text"
            className="w-[100%] px-[30px] py-[10px] border-[2px] border-[#bdbaba] outline-none overflow-auto rounded-[30px] text-[17px]"
            placeholder="Any Where | Any Location | Any City "
            onChange={(e) => setInput(e.target.value)}
            value={input}
          />
          <button className="absolute p-[10px] rounded-[50px] bg-[red] right-[3%] top-[5px]">
            <FiSearch className="w-[20px] h-[20px] text-[white]" />
          </button>
        </div>
      </div>
      <div className="w-[100vw] h-[85px] bg-white flex items-center justify-start cursor-pointer gap-[40px] overflow-auto md:justify-center px-[15px]">
        <div
          className="flex items-center justify-center flex-col hover:border-b-[1px]
         border-[#a6a5a5] text-[13px]"
          onClick={() => {
            handleCategory("trending");
            setCate("");
          }}
        >
          <MdWhatshot className="w-[30px] h-[30px] text-black" />
          <h3>Trending</h3>
        </div>
        <div
          className={`flex items-center justify-center flex-col 
          hover:border-b-[1px] border-[#a6a5a5] text-[13px] 
          ${cate == "villa" ? "border-b-[1px] border-[#a6a5a5]" : ""}`}
          onClick={() => handleCategory("villa")}
        >
          <GiFamilyHouse className="w-[30px] h-[30px] text-black" />
          <h3>Villa</h3>
        </div>
        <div
          className={`flex items-center justify-center flex-col hover:border-b-[1px] border-[#a6a5a5] text-[13px] ${
            cate == "room" ? "border-b-[1px] border-[#a6a5a5]" : ""
          }`}
          onClick={() => handleCategory("room")}
        >
          <MdBedroomParent className="w-[30px] h-[30px] text-black" />
          <h3>Room</h3>
        </div>
        <div
          className={`flex items-center justify-center flex-col hover:border-b-[1px] border-[#a6a5a5] text-[13px] ${
            cate == "poolHouse" ? "border-b-[1px] border-[#a6a5a5]" : ""
          }`}
          onClick={() => handleCategory("poolHouse")}
        >
          <MdOutlinePool className="w-[30px] h-[30px] text-black" />
          <h3>Pool House</h3>
        </div>
        <div
          className={`flex items-center justify-center flex-col hover:border-b-[1px] border-[#a6a5a5] text-[13px] ${
            cate == "cabin" ? "border-b-[1px] border-[#a6a5a5]" : ""
          }`}
          onClick={() => handleCategory("cabin")}
        >
          <GiWoodCabin className="w-[30px] h-[30px] text-black" />
          <h3>Cabin</h3>
        </div>
        <div
          className={`flex items-center justify-center flex-col hover:border-b-[1px] border-[#a6a5a5] text-[13px] ${
            cate == "shop" ? "border-b-[1px] border-[#a6a5a5]" : ""
          }`}
          onClick={() => handleCategory("shop")}
        >
          <SiHomeassistantcommunitystore className="w-[30px] h-[30px] text-black" />
          <h3>Shop</h3>
        </div>
        <div
          className={`flex items-center justify-center flex-col hover:border-b-[1px] border-[#a6a5a5] text-[13px] ${
            cate == "pg" ? "border-b-[1px] border-[#a6a5a5]" : ""
          }`}
          onClick={() => handleCategory("pg")}
        >
          <IoBedOutline className="w-[30px] h-[30px] text-black" />
          <h3>PG</h3>
        </div>
        <div
          className={`flex items-center justify-center flex-col hover:border-b-[1px] border-[#a6a5a5] text-[13px] ${
            cate == "farmHouse" ? "border-b-[1px] border-[#a6a5a5]" : ""
          }`}
          onClick={() => handleCategory("farmHouse")}
        >
          <FaTreeCity className="w-[30px] h-[30px] text-black" />
          <h3>Farm House</h3>
        </div>
        <div
          className={`flex items-center justify-center flex-col hover:border-b-[1px] border-[#a6a5a5] text-[13px] ${
            cate == "flat" ? "border-b-[1px] border-[#a6a5a5]" : ""
          }`}
          onClick={() => handleCategory("flat")}
        >
          <BiBuildingHouse className="w-[30px] h-[30px] text-black" />
          <h3>Flat</h3>
        </div>
      </div>
    </div>
  );
}

export default Nav;
