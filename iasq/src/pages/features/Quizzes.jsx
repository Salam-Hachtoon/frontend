import React, { useState, useEffect } from "react";
import "../../App.css";
import Card from "../../components/card";
import Header from "../../components/header";
import PCHeader from "../../components/PageContentHeader";
import axios from "axios";
import { API_BASE_URL } from "../../../config";


const Quizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const { data } = await axios.get(`${API_BASE_URL}/user/quizzes/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setQuizzes(data.data);
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  if (loading) return <div>Loading quizzes...</div>;

  return (
    <div>
      <Header />
      <div className="page-content px-[64px] py-[48px]">
        <PCHeader pageHeader="Your Quizzes" />
        <div className="cards-container grid grid-cols-3 mt-[16px] gap-[8px]">
          {quizzes.map((quiz) => (
            <Card
              key={quiz.id}
              card_topic={quiz.summary?.category || "No Category"} 
              card_level={quiz.difficulty}
              card_title={quiz.summary?.title || "Untitled Quiz"}
              card_description={
                (quiz.summary?.content 
                  ? quiz.summary.content.substring(0, 50) + "..."
                  : "No description available") 
              }
              card_date={new Date(quiz.created_at).toLocaleDateString()}
              navroute={`quiz/${quiz.id}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Quizzes;