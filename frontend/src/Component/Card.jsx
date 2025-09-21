import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userDataContext } from "../Context/UserContext";
import { listingDataContext } from "../Context/ListingContext";
import { FaStar } from "react-icons/fa";
import { GiConfirmed } from "react-icons/gi";
import { FcCancel } from "react-icons/fc";
import { bookingDataContext } from "../Context/BookingContext";

function Card({
  title,
  landmark,
  image1,
  image2,
  image3,
  rent,
  city,
  id,
  ratings,
  isBooked,
  host,
  bookingId, // optional: when provided, enables cancel for guest using booking id
}) {
  let navigate = useNavigate();
  let { userData } = useContext(userDataContext);
  let { handleViewCard } = useContext(listingDataContext);
  let [popUp, setPopUp] = useState(false);
  let { cancelBooking } = useContext(bookingDataContext);
  const handleClick = () => {
    // Let everyone open the view page; booking is gated there
    handleViewCard(id);
  };
  const [imgLoaded, setImgLoaded] = useState(false);
  return (
    <div
      className="w-full bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden cursor-pointer relative"
      onClick={handleClick}
    >
      {isBooked && (
        <div
          className="text-[green] bg-white rounded-lg absolute flex items-center justify-center right-1
          top-1 gap-[5px] p-[5px]"
        >
          <GiConfirmed className="w-[20px] h-[20px] text-[green]" />
          Booked
        </div>
      )}

      {isBooked && (host == userData?._id || Boolean(bookingId)) && (
        <div
          className="text-[red] bg-white rounded-lg absolute flex items-center justify-center right-1
          top-10 gap-[5px] p-[5px]" // ⬅️ Changed from top-1 to top-10
          onClick={() => setPopUp(true)}
        >
          <FcCancel className="w-[20px] h-[20px]" />
          Cancel Booking
        </div>
      )}

      {popUp && (
        <div className="w-[300px] h-[100px] bg-[#ffffffdf] absolute top-[110px] left-[13px] rounded-lg">
          <div
            className="w-[100%] h-[50%] text-[#2e2d2d] flex items-start justify-center
        rounded-lg overflow-auto text-[20px] p-[10px]"
          >
            Booking Cancel
          </div>
          <div
            className="w-[100%] h-[50%] text-[18px] font-semibold flex items-start justify-center 
        gap-[10px] text-[#986b6b]"
          >
            Are you Sure ?
            <button
              className="px-[20px] bg-[red] text-[white] rounded-lg 
        hover:bg-slate-600"
              onClick={() => {
                cancelBooking(bookingId || id);
                setPopUp(false);
              }}
            >
              Yes
            </button>
            <button
              className="px-[10px] bg-[red] text-[white] rounded-lg 
        hover:bg-slate-600"
              onClick={() => setPopUp(false)}
            >
              No
            </button>
          </div>
        </div>
      )}
      <div className="w-full h-[220px] overflow-hidden bg-gray-200">
        {!imgLoaded && (
          <div className="w-full h-full animate-pulse bg-gray-200" />
        )}
        <img
          src={image1}
          alt=""
          className={`w-full h-full object-cover ${
            imgLoaded ? "block" : "hidden"
          }`}
          onLoad={() => setImgLoaded(true)}
        />
      </div>
      <div className="p-3 flex flex-col gap-1">
        <div className="flex items-center justify-between text-[16px]">
          <span className="w-[80%] truncate font-semibold text-[#1f2937]">
            In {landmark.toUpperCase()},{city.toUpperCase()}
          </span>
          <span className="flex items-center justify-center gap-[5px] text-[14px] text-gray-700">
            <FaStar />
            {ratings}
          </span>
        </div>
        <span className="text-[14px] w-[80%] truncate text-gray-700">
          {title.toUpperCase()}
        </span>
        <span className="text-[15px] font-semibold text-[#ef4444]">
          ₹ {rent} /day
        </span>
      </div>
    </div>
  );
}

export default Card;
