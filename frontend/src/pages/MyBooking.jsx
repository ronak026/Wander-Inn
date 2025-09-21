import React, { useContext, useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { userDataContext } from "../Context/UserContext";
import { authDataContext } from "../Context/AuthContext";
import axios from "axios";
import Card from "../Component/Card";

function MyBooking() {
  let navigate = useNavigate();
  let { userData } = useContext(userDataContext);
  let { serverUrl } = useContext(authDataContext);
  let [bookings, setBookings] = useState([]);
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!userData?.booking?.length) {
        setLoading(false);
        return;
      }

      try {
        const bookingPromises = userData.booking.map(async (bookingId) => {
          const response = await axios.get(
            `${serverUrl}/api/booking/${bookingId}`,
            {
              withCredentials: true,
            }
          );
          return response.data;
        });

        const bookingData = await Promise.all(bookingPromises);
        setBookings(bookingData);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [userData, serverUrl]);

  if (loading) {
    return (
      <div className="w-[100vw] min-h-[100vh] flex justify-start items-center flex-col gap-[50px] relative px-[20px]">
        <div
          className="w-[50px] h-[50px] bg-[red] cursor-pointer absolute top-[10%] left-[20px] 
                    rounded-[50%] flex items-center justify-center"
          onClick={() => navigate("/")}
        >
          <FaArrowLeft className="w-[22px] h-[22px] text-[white]" />
        </div>
        <div
          className="w-[60%] h-[10%] border-[2px] border-[#908c8c] p-[15px] flex items-center 
                    justify-center text-[30px] rounded-md text-[#613b3b] font-semibold mt-[50px] text-nowrap md:w-[600px]"
        >
          MY BOOKINGS
        </div>
        <div className="w-[100%] h-[90%] flex items-center justify-center">
          <div className="text-lg">Loading bookings...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-[100vw] min-h-[100vh] flex justify-start items-center flex-col gap-[50px] relative px-[20px]">
      <div
        className="w-[50px] h-[50px] bg-[red] cursor-pointer absolute top-[10%] left-[20px] 
                rounded-[50%] flex items-center justify-center"
        onClick={() => navigate("/")}
      >
        <FaArrowLeft className="w-[22px] h-[22px] text-[white]" />
      </div>
      <div
        className="w-[60%] h-[10%] border-[2px] border-[#908c8c] p-[15px] flex items-center 
                justify-center text-[30px] rounded-md text-[#613b3b] font-semibold mt-[50px] text-nowrap md:w-[600px]"
      >
        MY BOOKINGS
      </div>
      <div className="w-[100%] h-[90%] flex items-center justify-center gap-[25px] flex-wrap mt-[30px]">
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <Card
              key={booking._id}
              title={booking.listing?.title || "N/A"}
              landmark={booking.listing?.landmark || "N/A"}
              city={booking.listing?.city || "N/A"}
              image1={booking.listing?.image1 || ""}
              image2={booking.listing?.image2 || ""}
              image3={booking.listing?.image3 || ""}
              rent={booking.listing?.rent || 0}
              id={booking.listing?._id || booking._id}
              bookingId={booking._id}
              isBooked={booking.listing?.isBooked || false}
              host={booking.listing?.host || ""}
              ratings={booking.listing?.ratings || 0}
            />
          ))
        ) : (
          <div className="text-lg text-gray-600">No bookings found</div>
        )}
      </div>
    </div>
  );
}

export default MyBooking;
