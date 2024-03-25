"use client";
import React, { useState } from "react";
import Popup from "../Popup/Popup";

const Header = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleAddButtonClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };
  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <span className="h-8 w-auto text-white"> SK</span>
          </div>
          <div className="flex items-center">
            <button
              type="button"
              className="text-white flex  p-2 bg-red-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 mr-2"
              id="user-menu-button"
              onClick={handleAddButtonClick}
            >
              Add
            </button>
          </div>
        </div>
      </div>
      <Popup isOpen={isPopupOpen} onClose={handleClosePopup} title="Add User" />
    </nav>
  );
};

export default Header;
