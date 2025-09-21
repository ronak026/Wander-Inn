import React, { useContext } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { userDataContext } from "../Context/UserContext";
import Card from "../Component/Card";
import { listingDataContext } from "../Context/ListingContext";
import { useState } from "react";

function MyListing() {
  let navigate = useNavigate();
  let { userData } = useContext(userDataContext);
  const { startEditListing, handleDeleteListing, deleting } =
    useContext(listingDataContext);
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [frontEndImage1, setFrontEndImage1] = useState(null);
  let [frontEndImage2, setFrontEndImage2] = useState(null);
  let [frontEndImage3, setFrontEndImage3] = useState(null);
  let [backEndImage1, setBackEndImage1] = useState(null);
  let [backEndImage2, setBackEndImage2] = useState(null);
  let [backEndImage3, setBackEndImage3] = useState(null);
  let [rent, setRent] = useState("");
  let [city, setCity] = useState("");
  let [landmark, setLandmark] = useState("");
  return (
    <div className="w-[100vw] min-h-[100vh] flex justify-start items-center flex-col gap-[50px] relative px-[20px]">
      <div
        className="w-[50px] h-[50px] bg-[red] cursor-pointer absolute top-[10%] left-[20px] 
      rounded-[50%] flex items-center justify-center "
        onClick={() => navigate("/")}
      >
        <FaArrowLeft className="w-[22px] h-[22px] text-[white]" />
      </div>
      <div
        className="w-[60%] h-[10%] border-[2px] border-[#908c8c] p-[15px] flex items-center 
        justify-center text-[30px] rounded-md text-[#613b3b] font-semibold mt-[50px] text-nowrap md:w-[600px] "
      >
        MY LISTING
      </div>
      <div className="w-[100%] h-[90%] flex items-center justify-center gap-[25px] flex-wrap mt-[30px]">
        {userData.listing.map((list) => (
          <div key={list._id} className="relative">
            <Card
              title={list.title}
              landmark={list.landmark}
              city={list.city}
              image1={list.image1}
              image2={list.image2}
              image3={list.image3}
              rent={list.rent}
              id={list._id}
              isBooked={list.isBooked}
              host={list.host}
              ratings={list.ratings}
            />
            <div className="flex gap-2 mt-2">
              <button
                className="px-3 py-1 bg-blue-500 text-white rounded"
                onClick={() => startEditListing(list)}
              >
                Edit
              </button>
              <button
                className="px-3 py-1 bg-red-500 text-white rounded"
                onClick={() => handleDeleteListing(list._id)}
                disabled={deleting}
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyListing;
