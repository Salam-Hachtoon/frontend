import "../App.css";
import React, { useState } from "react";
import axios from "axios";

const FlashcardPopup = ({ set, onClose, onCardDelete }) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  if (!set || !set.cards || set.cards.length === 0) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg w-[400px] relative text-center">
          <button
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
            onClick={onClose}
          >
            &times;
          </button>
          <p className="text-lg font-semibold text-gray-700">No flashcards available.</p>
        </div>
      </div>
    );
  }

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handlePreviousCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      setIsFlipped(false);
    }
  };

  const handleNextCard = () => {
    if (currentCardIndex < set.cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setIsFlipped(false);
    }
  };

  const handleDeleteCard = async () => {
    const cardId = set.cards[currentCardIndex].id;
    try {
      await axios.delete(`https://your-api.com/flashcards/${cardId}`);
      onCardDelete(cardId);
      if (currentCardIndex > 0) {
        setCurrentCardIndex(currentCardIndex - 1);
      }
      setIsFlipped(false);
    } catch (error) {
      console.error("Failed to delete card:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg w-[400px] relative">
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
          onClick={onClose}
        >
          &times;
        </button>

        <div className={`flashcard cursor-pointer ${isFlipped ? "flipped" : ""}`} onClick={handleFlip}>
          <div className="flashcard-inner">
            <div className={`flashcard-front ${isFlipped ? "hidden" : "block"}`}>
              <p className="text-xl font-semibold text-center">
                {set.cards[currentCardIndex]?.term}
              </p>
            </div>
            <div className={`flashcard-back ${isFlipped ? "block" : "hidden"}`}>
              <p className="text-xl font-semibold text-center">
                {set.cards[currentCardIndex]?.definition}
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 disabled:bg-gray-300"
            onClick={handlePreviousCard}
            disabled={currentCardIndex === 0}
          >
            Previous
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-blue-300"
            onClick={handleNextCard}
            disabled={currentCardIndex === set.cards.length - 1}
          >
            Next
          </button>
        </div>

        <button
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 w-full"
          onClick={handleDeleteCard}
        >
          Delete Card
        </button>
      </div>
    </div>
  );
};

export default FlashcardPopup;