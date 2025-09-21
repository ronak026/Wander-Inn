// controllers/adminController.js
//Working////////////////////

import User from "../model/user.model.js";
import Listing from "../model/listing.model.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
};

export const getAllListings = async (req, res) => {
  try {
    const listings = await Listing.find();
    res.json(listings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching listings" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user" });
  }
};

export const deleteListing = async (req, res) => {
  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.json({ message: "Listing deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting listing" });
  }
};
