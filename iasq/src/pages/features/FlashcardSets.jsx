import "../../App.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../../components/header";
import Loader from "../../components/Loader";
import EmptyState from "../../components/EmptyState";
import { API_BASE_URL } from "../../../config";

const FlashcardSets = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFlashcards();
  }, []);

  const fetchFlashcards = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Authentication required");
      
      const { data } = await axios.get(`${API_BASE_URL}/user/flashcards/`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setFlashcards(data.data);
    } catch (error) {
      console.error("Failed to fetch flashcards:", error);
      setError("Failed to fetch flashcards");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Your Flashcards</h1>
        {loading ? (
          <Loader message="Loading your flashcards..." />
        ) : error ? (
          <div className="alert-error">{error}</div>
        ) : flashcards.length === 0 ? (
          <EmptyState
            title="No Flashcards Found"
            message="Get started by creating your first set of flashcards!"
            actionText="Create New Set"
            onAction={() => navigate("/home")}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {flashcards.map((card) => (
              <Flashcard key={card.id} term={card.term} definition={card.definition} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const Flashcard = ({ term, definition }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="perspective-1000 cursor-pointer"
      onClick={() => setFlipped(!flipped)}
    >
      <div className={`relative w-full h-40 transform transition-transform duration-500 preserve-3d ${flipped ? "rotate-y-180" : ""}`}>
        {/* Front Side */}
        <div className="absolute w-full h-full backface-hidden flex items-center justify-center bg-gradient-to-r from-blue-900  to-purple-500 text-white text-xl font-bold p-4 rounded-lg shadow-md">
          {term}
        </div>
        {/* Back Side */}
        <div className="absolute w-full h-full backface-hidden rotate-y-180 flex items-center justify-center bg-gradient-to-r from-green-900 to-teal-500 text-white text-lg p-4 rounded-lg shadow-md">
          {definition}
        </div>
      </div>
    </div>
  );
};
export default FlashcardSets;
