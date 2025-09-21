import React, { createContext, useContext, useState } from "react";
import { authDataContext } from "./AuthContext";
import axios from "axios";
import { userDataContext } from "./UserContext";
import { listingDataContext } from "./ListingContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const bookingDataContext = createContext();

function BookingContext({ children }) {
  let [checkIn, setCheckIn] = useState("");
  let [checkOut, setCheckOut] = useState("");
  let [total, setTotal] = useState(0);
  let [night, setNight] = useState(0);
  let { serverUrl } = useContext(authDataContext);
  let { getCurrentUser } = useContext(userDataContext);
  let { getListing } = useContext(listingDataContext);
  let [bookingData, setBookingData] = useState([]);
  let [booking, setBooking] = useState(false);
  let navigate = useNavigate();

  const resetBookingForm = () => {
    setCheckIn("");
    setCheckOut("");
    setTotal(0);
    setNight(0);
  };

  const handleBooking = async (id) => {
    if (!checkIn || !checkOut) {
      toast.error("Please select check-in and check-out dates");
      return;
    }

    // Validate dates
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (checkInDate < today) {
      toast.error("Check-in date cannot be in the past");
      return;
    }

    if (checkOutDate <= checkInDate) {
      toast.error("Check-out date must be after check-in date");
      return;
    }

    if (total <= 0) {
      toast.error("Invalid booking total. Please check your dates.");
      return;
    }

    setBooking(true);
    try {
      let result = await axios.post(
        serverUrl + `/api/booking/create/${id}`,
        {
          checkIn,
          checkOut,
          totalRent: total,
        },
        { withCredentials: true }
      );
      await getCurrentUser();
      await getListing();
      setBookingData(result.data);
      console.log(result.data);
      setBooking(false);
      resetBookingForm();
      navigate(`/booked/${result.data._id}`);
      toast.success("Booking Successful");
    } catch (error) {
      console.log(error);
      setBookingData(null);
      setBooking(false);
      toast.error(error.response?.data?.message || "Booking failed");
    }
  };

  const cancelBooking = async (id) => {
    try {
      let result;
      try {
        result = await axios.delete(serverUrl + `/api/booking/cancel/${id}`, {
          withCredentials: true,
        });
      } catch (err) {
        // Fallback: try cancel by listing id if booking id not found
        if (err?.response?.status === 404) {
          result = await axios.delete(
            serverUrl + `/api/booking/cancel-by-listing/${id}`,
            { withCredentials: true }
          );
        } else {
          throw err;
        }
      }
      await getCurrentUser();
      await getListing();
      console.log(result.data);
      toast.success("Cancel Booking Successful");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to cancel booking");
    }
  };

  let value = {
    checkIn,
    setCheckIn,
    checkOut,
    setCheckOut,
    total,
    setTotal,
    night,
    setNight,
    bookingData,
    setBookingData,
    handleBooking,
    cancelBooking,
    booking,
    setBooking,
    resetBookingForm,
  };
  return (
    <div>
      <bookingDataContext.Provider value={value}>
        {children}
      </bookingDataContext.Provider>
    </div>
  );
}

export default BookingContext;
