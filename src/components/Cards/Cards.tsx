"use client";
import { useState, useEffect, useRef } from "react";
import { getAPI, deleteAPI } from "../../utils/api";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import EditPopup from "../Popup/EditPopup";
import { useRouter } from "next/navigation";

interface User {
  id: number;
  first_name: string;
  last_name: string;
  avatar: string;
  email: string;
}

const Cards = () => {
  const [cards, setCards] = useState<User[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const observer = useRef<IntersectionObserver | null>(null);
  const observerElement = useRef<HTMLDivElement>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [userDataUpdated, setUserDataUpdated] = useState(false);
  const router = useRouter();

  const handleCardClick = (id: number) => {
    localStorage.setItem("userId", id.toString());
    router.push(`/${id}`);
  };

  const handleAddButtonClick = (id: number) => {
    setSelectedUserId(id);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteAPI(`users/${id}`);
      setCards(cards.filter((card) => card.id !== id));
    } catch (error) {
      console.error("Delete User Error:", error);
    }
  };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await getAPI(`users?page=${page}`);
      if (response.data.length === 0) {
        setHasMore(false);
      } else {
        setCards([...cards, ...response.data]);
        setPage(page + 1);
      }
    } catch (error) {
      console.error("Fetch Users Error:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (userDataUpdated) {
      fetchUsers();
      setUserDataUpdated(false);
    }
  }, [userDataUpdated]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 100 &&
        !loading &&
        hasMore
      ) {
        fetchUsers();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loading, hasMore]);

  const handleUserUpdate = () => {
    setUserDataUpdated(true);
  };

  return (
    <div className="max-w-screen-xl mx-auto m-4 grid grid-cols-1 md:grid-cols-3 gap-24 justify-center items-center mt-24">
      {cards.map((card) => (
        <div
          key={card.id}
          className="bg-white p-6 shadow-lg rounded-xl text-center mt-4 relative"
        >
          <div onClick={() => handleCardClick(card.id)}>
            <img
              src={card.avatar}
              alt={card.first_name}
              className="w-16 h-16 rounded-full mx-auto mb-4"
            />
            <p className="text-lg font-semibold mb-2">{`${card.first_name} ${card.last_name}`}</p>
            <p className="text-gray-500 mb-4">{card.email}</p>
          </div>
          <div className="absolute inset-x-0 bottom-4 flex justify-center md:static">
            <FiEdit
              onClick={() => handleAddButtonClick(card.id)}
              className="text-blue-500 cursor-pointer"
            />
            <FiTrash2
              onClick={() => handleDelete(card.id)}
              className="text-red-500 cursor-pointer ml-2"
            />
          </div>
        </div>
      ))}
      <div id="observer" ref={observerElement} />

      {!loading && !hasMore && (
        <div className="col-span-3 flex justify-center items-center">
          <p>No more results</p>
        </div>
      )}
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

export default Cards;
