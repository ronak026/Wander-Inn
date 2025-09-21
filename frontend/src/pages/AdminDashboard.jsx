import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { authDataContext } from "../Context/AuthContext";

export default function AdminDashboard() {
  const { serverUrl } = useContext(authDataContext);
  const [data, setData] = useState({ users: [], listings: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);
      setError("");

      const [resUsers, resListings] = await Promise.all([
        fetch(`${serverUrl}/api/admin/users`, {
          credentials: "include",
        }),
        fetch(`${serverUrl}/api/admin/listings`, {
          credentials: "include",
        }),
      ]);

      if (!resUsers.ok || !resListings.ok) {
        throw new Error("Failed to fetch admin data");
      }

      const users = await resUsers.json();
      const listings = await resListings.json();

      setData({ users, listings });
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // --- ACTIONS ---
  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await fetch(`${serverUrl}/api/admin/users/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      fetchData(); // re-fetch after action
    } catch (error) {
      alert("Error deleting user");
    }
  };

  const toggleAdmin = async (id) => {
    try {
      await fetch(`${serverUrl}/api/admin/users/${id}/toggle-admin`, {
        method: "PATCH",
        credentials: "include",
      });
      fetchData();
    } catch (error) {
      alert("Error toggling admin rights");
    }
  };

  const deleteListing = async (id) => {
    if (!window.confirm("Are you sure you want to delete this listing?"))
      return;
    try {
      await fetch(`${serverUrl}/api/admin/listings/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      fetchData();
    } catch (error) {
      alert("Error deleting listing");
    }
  };

  // --- RENDER ---
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-semibold text-gray-600">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-semibold text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>

      {/* Users Section */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Users</h2>
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full border border-gray-200">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Admin</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.users.length === 0 ? (
                <tr>
                  <td colSpan="4" className="py-4 text-center text-gray-500">
                    No users found
                  </td>
                </tr>
              ) : (
                data.users.map((user) => (
                  <tr key={user._id} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-4">{user.name}</td>
                    <td className="py-2 px-4">{user.email}</td>
                    <td className="py-2 px-4">
                      {user.isAdmin ? (
                        <span className="text-green-600 font-medium">Yes</span>
                      ) : (
                        <span className="text-red-600 font-medium">No</span>
                      )}
                    </td>
                    <td className="py-2 px-4 text-center space-x-2">
                      <button
                        onClick={() => toggleAdmin(user._id)}
                        className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-sm"
                      >
                        {user.isAdmin ? "Remove Admin" : "Make Admin"}
                      </button>
                      <button
                        onClick={() => deleteUser(user._id)}
                        className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Listings Section */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Listings</h2>
        {data.listings.length === 0 ? (
          <p className="text-gray-500">No listings found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.listings.map((listing) => (
              <div
                key={listing._id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
              >
                <img
                  src={listing.image1 || "https://via.placeholder.com/400"}
                  alt={listing.title}
                  className="h-48 w-full object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-bold">{listing.title}</h3>
                  <p className="text-gray-600 text-sm mt-2">
                    {listing.description?.slice(0, 80)}...
                  </p>
                  <p className="text-indigo-600 font-semibold mt-3">
                    ₹ {listing.rent}
                  </p>
                  <p className="text-gray-500 text-sm">
                    {listing.city} • {listing.landmark}
                  </p>
                  <p
                    className={`mt-2 inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      listing.isBooked
                        ? "bg-red-100 text-red-600"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    {listing.isBooked ? "Booked" : "Available"}
                  </p>

                  {/* Actions */}
                  <div className="mt-4 flex justify-between">
                    <button
                      onClick={() => deleteListing(listing._id)}
                      className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md text-sm"
                    >
                      Delete Listing
                    </button>
                    {/* Future: Add Edit button */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
