import "../../App.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import axios from "axios";
import Header from "../../components/header";
import FlashcardPopup from "../../components/FlashcardPopup";

const FlashcardSets = () => {
  const [flashcardSets, setFlashcardSets] = useState([]);
  const [selectedSet, setSelectedSet] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    fetchFlashcardSets();
  }, []);

  const fetchFlashcardSets = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        throw new Error("User not authenticated.");
      }

      const response = await axios.get("https://your-api.com/flashcard-sets", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setFlashcardSets(response.data);
    } catch (err) {
      setError(err.message || "Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSet = async (setId) => {
    if (!window.confirm("Are you sure you want to delete this flashcard set?")) return;

    try {
      const token = localStorage.getItem("accessToken");
      await axios.delete(`https://your-api.com/flashcard-sets/${setId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setFlashcardSets(flashcardSets.filter(set => set.id !== setId));
    } catch (err) {
      setError(err.message || "Failed to delete flashcard set.");
    }
  };

  const handleDeleteCard = async (setId, cardId) => {
    if (!window.confirm("Are you sure you want to delete this flashcard?")) return;

    try {
      const token = localStorage.getItem("accessToken");
      await axios.delete(`https://your-api.com/flashcard-sets/${setId}/cards/${cardId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setFlashcardSets(flashcardSets.map(set => 
        set.id === setId 
          ? { ...set, cards: set.cards.filter(card => card.id !== cardId), cardCount: set.cardCount - 1 }
          : set
      ));
    } catch (err) {
      setError(err.message || "Failed to delete flashcard.");
    }
  };

  const handleSetClick = (set) => {
    setSelectedSet(set);
    setIsPopupOpen(true);
  };

  return (
    <div>
      <Header />
      <div className="page-content px-[64px] py-[48px]">
        <h1 className="text-[24px] font-semibold underline mb-[36px]">
          Flashcard Sets
        </h1>

        {loading && <p className="text-center text-gray-600">Loading flashcards...</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}

        {!loading && !error && flashcardSets.length === 0 && (
          <div className="text-center mt-10">
            <p className="text-gray-600 text-lg mb-4">
              You haven’t created any flashcard sets yet.
            </p>
            <button
              onClick={() => navigate("/home")} 
              className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
            >
              Create Flashcard Set
            </button>
          </div>
        )}

        {!loading && !error && flashcardSets.length > 0 && (
          <div className="grid grid-cols-3 gap-[24px]">
            {flashcardSets.map((set) => (
              <div
                key={set.id}
                className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow relative"
              >
                <h2 className="text-xl font-semibold">{set.name}</h2>
                <span>Category: {set.category || "Unknown"}</span>
                <p className="text-gray-600 mt-2">{set.cardCount} cards</p>
                <p className="text-gray-500 text-sm mt-2">
                  Created on: {new Date(set.createdAt).toLocaleDateString()}
                </p>

                <button
                  onClick={() => handleSetClick(set)}
                  className="mt-3 px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
                >
                  View Cards
                </button>

                <button
                  onClick={() => handleDeleteSet(set.id)}
                  className="absolute top-3 right-3 px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                  X
                </button>
              </div>
            ))}
          </div>
        )}

        {isPopupOpen && selectedSet && (
          <FlashcardPopup
            set={selectedSet}
            onClose={() => setIsPopupOpen(false)}
            onDeleteCard={handleDeleteCard}
          />
        )}
      </div>
    </div>
  );
};

export default FlashcardSets;
