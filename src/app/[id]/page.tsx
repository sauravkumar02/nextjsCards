"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { getSingleUserAPI, deleteAPI } from "../../utils/api";
import EditPopup from "../../components/Popup/EditPopup";

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
}

const UserDetail = () => {
  const idString = localStorage.getItem("userId");
  const id = idString ? parseInt(idString, 10) : null;
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [userDataUpdated, setUserDataUpdated] = useState(false);

  console.log("id", id);

  const fetchUserData = async (userId: number) => {
    setLoading(true);
    try {
      const response = await getSingleUserAPI(`${id}`);
      setUser(response.data);
    } catch (error) {
      console.error("Fetch User Data Error:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUserData(id);
  }, [id]);

  const handleAddButtonClick = (id: number) => {
    setSelectedUserId(id);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleUserUpdate = () => {
    setUserDataUpdated(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteAPI(`users/${id}`);
      setUser(null);
      router.push("/");
    } catch (error) {
      console.error("Delete User Error:", error);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-screen-xl mx-auto m-4 p-8 bg-white shadow-lg rounded-xl">
      <img
        src={user.avatar}
        alt={`${user.first_name} ${user.last_name}`}
        className="w-32 h-32 rounded-full mx-auto mb-4"
      />
      <p className="text-2xl font-semibold text-center">{`${user.first_name} ${user.last_name}`}</p>
      <p className="text-gray-500 text-center mb-4">{user.email}</p>
      <div className="flex justify-center">
        <button
          onClick={() => handleAddButtonClick(user.id)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
        >
          Edit
        </button>
        <button
          onClick={() => handleDelete(user.id)}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          {loading ? "Deleting..." : "Delete"}
        </button>
      </div>
      <EditPopup
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        title="Edit User"
        userId={selectedUserId}
        onUserUpdate={handleUserUpdate}
      />
    </div>
  );
};

export default UserDetail;
