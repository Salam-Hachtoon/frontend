import "../../App.css"
import React, { useState, useEffect } from "react";
import Header from "../../components/header";
import FlashcardPopup from "../../components/FlashcardPopup"; 

const FlashcardSets = () => {
  const [flashcardSets, setFlashcardSets] = useState([]);
  const [selectedSet, setSelectedSet] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // replace with actual fetching from the api
  useEffect(() => {
    const fetchFlashcardSets = async () => {
      // fake api call
      setTimeout(() => {
        const fakeFlashcardSets = [
          {
            id: 1,
            name: "Biology Terms",
            cardCount: 2,
            createdAt: "2023-10-01",
            cards: [
              { term: "Photosynthesis", definition: "The process by which green plants make their own food." },
              { term: "Mitochondria", definition: "The powerhouse of the cell." },
            ],
          },
          {
            id: 2,
            name: "Chemistry Terms",
            cardCount: 2,
            createdAt: "2023-10-05",
            cards: [
              { term: "Atom", definition: "The basic unit of matter." },
              { term: "Molecule", definition: "A group of atoms bonded together." },
            ],
          },
        ];
        setFlashcardSets(fakeFlashcardSets);
      }, 1000); // fake delay, prob remove later
    };

    fetchFlashcardSets();
  }, []);

  // Handle set selection
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

        {/* Flashcard Sets*/}
        <div className="grid grid-cols-3 gap-[24px]">
          {/* loop through flash card SETS and not individual cards */}
          {flashcardSets.map((set) => (
            <div
              key={set.id}
              className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => handleSetClick(set)}
            >
              <h2 className="text-xl font-semibold">{set.name}</h2>
              {/* Didn't add category attribute in the fake set object */}
              <span>Category: set-category</span> 
              <p className="text-gray-600 mt-2">{set.cardCount} cards</p>
              <p className="text-gray-500 text-sm mt-2">
                Created on: {set.createdAt}
              </p>
            </div>
          ))}
        </div>

        {/* Flashcard Popup */}
        {isPopupOpen && (
          <FlashcardPopup
            set={selectedSet}
            onClose={() => setIsPopupOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default FlashcardSets; 