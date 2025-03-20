import "../App.css"
import React, { useState } from "react";


const FlashcardPopup = ({ set, onClose }) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Handle card flip
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  // Navigation between cards
  const handlePreviousCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      setIsFlipped(false); // Reset flip state
    }
  };


  const handleNextCard = () => {
    if (currentCardIndex < set.cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setIsFlipped(false); // Reset flip state
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg w-[400px] relative">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
          onClick={onClose}
        >
          &times;
        </button>

        {/* Flashcard Content */}
        <div
          className={`flashcard ${isFlipped ? "flipped" : ""}`}
          onClick={handleFlip}
        >
          <div className="flashcard-inner">
            <div className="flashcard-front">
              <p className="text-xl font-semibold text-center">
                {set.cards[currentCardIndex].term}
              </p>
            </div>
            <div className="flashcard-back">
              <p className="text-xl font-semibold text-center">
                {set.cards[currentCardIndex].definition}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
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
      </div>
    </div>
  );
};

export default FlashcardPopup;