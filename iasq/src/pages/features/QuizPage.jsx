import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../../components/header";
import { API_BASE_URL } from "../../../config";

const QuizPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const { data } = await axios.get(`${API_BASE_URL}/user/quizzes/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        const foundQuiz = data.data.find((q) => q.id === Number(id));
        if (!foundQuiz) {
          navigate("quizzes");
          return;
        }
        setQuiz(foundQuiz);
      } catch (error) {
        console.error("Error fetching quiz:", error);
        navigate("quizzes");
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuizData();
  }, [id, navigate]);

  const handleAnswerSelect = (selectedChoiceId) => {
    const newUserAnswers = [...userAnswers];
    newUserAnswers[currentQuestionIndex] = selectedChoiceId;
    setUserAnswers(newUserAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    quiz.questions.forEach((question, index) => {
      const selectedChoiceId = userAnswers[index];
      if (selectedChoiceId) {
        const correctChoice = question.choices.find(c => c.is_correct);
        if (correctChoice?.id === selectedChoiceId) {
          correct++;
        }
      }
    });
    setScore(correct);
    setShowResults(true);
  };

  const isAnswerCorrect = (choice) => {
    return userAnswers[currentQuestionIndex] === choice.id && choice.is_correct;
  };

  const isAnswerIncorrect = (choice) => {
    return userAnswers[currentQuestionIndex] === choice.id && !choice.is_correct;
  };

  // Removed unused isCorrectAnswer function to resolve the error

  if (isLoading) return <div className="text-center py-8">Loading quiz...</div>;
  if (!quiz || !quiz.questions) return <div className="text-center py-8">Quiz not found</div>;

  const totalQuestions = quiz.questions.length;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 pb-2">
          {quiz.summary.title}
        </h1>

        {/* Progress Section */}
        <div className="mb-8 bg-white p-4 rounded-lg shadow">
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-blue-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="flex justify-between mt-2 text-gray-600 text-sm">
            <span>Question {currentQuestionIndex + 1} of {totalQuestions}</span>
            <span>{Math.round(progress)}% Completed</span>
          </div>
        </div>

        {showResults ? (
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Quiz Results</h2>
            <div className="text-4xl font-semibold text-blue-600 mb-6">
              {score}/{totalQuestions}
            </div>
            <button
              onClick={() => navigate("/home/quizzes")}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Back to Quizzes
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow">
            {/* Question Card */}
            <div className="p-6 border-b">
              <div className="mb-4">
                <span className="text-gray-500 text-sm">Question {currentQuestionIndex + 1}</span>
                <h2 className="text-xl font-semibold text-gray-800 mt-1">
                  {quiz.questions[currentQuestionIndex].question_text}
                </h2>
              </div>

              {/* Answer Options */}
              <div className="space-y-3">
                {quiz.questions[currentQuestionIndex].choices.map((choice) => (
                  <button
                    key={choice.id}
                    className={`w-full text-left p-4 rounded-lg border transition-all ${
                      isAnswerCorrect(choice)
                        ? "bg-green-100 border-green-500"
                        : isAnswerIncorrect(choice)
                        ? "bg-red-100 border-red-500"
                        : userAnswers[currentQuestionIndex] === choice.id
                        ? "bg-blue-100 border-blue-500"
                        : "hover:bg-gray-50 border-gray-200"
                    }`}
                    onClick={() => handleAnswerSelect(choice.id)}
                    disabled={userAnswers[currentQuestionIndex] !== undefined}
                  >
                    {choice.choice_text}
                  </button>
                ))}
              </div>
            </div>

            {/* Navigation Controls */}
            <div className="p-4 bg-gray-50 flex justify-between">
              <button
                className={`px-5 py-2 rounded-lg ${
                  currentQuestionIndex === 0
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-gray-600 text-white hover:bg-gray-700"
                }`}
                onClick={handlePreviousQuestion}
                disabled={currentQuestionIndex === 0}
              >
                Previous
              </button>

              {currentQuestionIndex === totalQuestions - 1 ? (
                <button
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg"
                  onClick={calculateScore}
                >
                  Submit Quiz
                </button>
              ) : (
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
                  onClick={handleNextQuestion}
                >
                  Next Question
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizPage;