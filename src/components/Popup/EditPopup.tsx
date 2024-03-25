"use client";
import React, { useEffect } from "react";
import { getSingleUserAPI, updateSingleUserAPI } from "../../utils/api";

interface EditPopupProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  userId: number | null;
  onUserUpdate: () => void;
}

const EditPopup: React.FC<EditPopupProps> = ({
  isOpen,
  onClose,
  title,
  userId,
  onUserUpdate,
}) => {
  const [userData, setUserData] = React.useState<any>({});

  useEffect(() => {
    const fetchUserData = async (userId: number) => {
      try {
        const response = await getSingleUserAPI(`${userId}`);
        setUserData(response.data);
      } catch (error) {
        console.error("Fetch User Data Error:", error);
      }
    };

    if (userId !== null) {
      fetchUserData(userId);
    }
  }, [userId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (userData) {
        await updateSingleUserAPI(`${userData.id}`, userData);
        onClose();
        onUserUpdate();
      }
    } catch (error) {
      console.error("Failed to save user:", error);
    }
  };

  if (!isOpen || !userData) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 shadow-lg">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <label className="block">
              <span className="text-gray-700">First Name:</span>
              <input
                type="text"
                name="first_name"
                value={userData.first_name}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </label>
            <label className="block">
              <span className="text-gray-700">Last Name:</span>
              <input
                type="text"
                name="last_name"
                value={userData.last_name}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </label>
            <label className="block">
              <span className="text-gray-700">Email:</span>
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </label>
            <label className="block">
              <span className="text-gray-700">Avatar:</span>
              <input
                type="text"
                name="avatar"
                value={userData.avatar}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </label>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Save
            </button>
            <button
              type="button"
              onClick={onClose}
              className="ml-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPopup;
