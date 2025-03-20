import React, { useState, useEffect } from "react";
import Header from "../../components/header";

const QuizPage = () => {
  const [quiz, setQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // fake data
  useEffect(() => {
    const fetchQuizData = async () => {
      // using fake data instead of the actual api call
      setTimeout(() => {
        const fakeQuizData = {
          title: "Sample Quiz",
          questions: [
            {
              question: "What is 2 + 2?",
              options: ["3", "4", "5", "6"],
              correctAnswer: "4",
            },
            {
              question: "What is the capital of France?",
              options: ["Berlin", "Madrid", "Paris", "Rome"],
              correctAnswer: "Paris",
            },
            {
              question: "What is the largest planet in the solar system?",
              options: ["Earth", "Jupiter", "Saturn", "Mars"],
              correctAnswer: "Jupiter",
            },
          ],
        };
        setQuiz(fakeQuizData);
        setIsLoading(false);
      }, 1000); // delay to show the loading screen
    };

    fetchQuizData();
  }, []);

  // Handle user answer selection
  const handleAnswerSelect = (selectedAnswer) => {
    // Update user answers
    const newUserAnswers = [...userAnswers];
    newUserAnswers[currentQuestionIndex] = selectedAnswer;
    setUserAnswers(newUserAnswers);
  };

  // navigate between the questions
  const handleNextQuestion = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  // Calculate progress for the progress bar
  const progress = ((currentQuestionIndex + 1) / quiz?.questions.length) * 100;

  // Check if the selected answer is correct
  const isAnswerCorrect = (option) => {
    const correctAnswer = quiz.questions[currentQuestionIndex].correctAnswer;
    return (
      userAnswers[currentQuestionIndex] === option && option === correctAnswer
    );
  };

  // Check if the selected answer is incorrect
  const isAnswerIncorrect = (option) => {
    const correctAnswer = quiz.questions[currentQuestionIndex].correctAnswer;
    return (
      userAnswers[currentQuestionIndex] === option && option !== correctAnswer
    );
  };

  // Check if the option is the correct answer (only after the user has selected an answer)
  const isCorrectAnswer = (option) => {
    const correctAnswer = quiz.questions[currentQuestionIndex].correctAnswer;
    return (
      userAnswers[currentQuestionIndex] !== undefined &&
      option === correctAnswer
    );
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header />
      <div className="page-content px-[64px] py-[48px]">
        {/* Quiz Title */}
        <h1 className="text-[24px] font-semibold underline mb-[36px]">
          {quiz.title}
        </h1>

        {/* Progress Bar and Counter */}
        <div className="grid grid-cols-2 mb-[36px]">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-in-out my-auto"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="text-right text-gray-600 pr-[30px]">
            {currentQuestionIndex + 1} / {quiz.questions.length}
          </div>
        </div>

        {/* Question Box */}
        <div className="question-box rounded-lg shadow-md mb-[24px]">
          <div className=" bg-[#f8fafc] py-[24px] px-[20px]">
            <p className="text-[20px] text-[#4b5768]">
              Question {currentQuestionIndex + 1}
            </p>
            <p className="text-[#2c2c2c] text-[20px] font-semibold">
              {quiz.questions[currentQuestionIndex].question}
            </p>
          </div>
          {/* Answer Options */}
          <div className="options mb-[24px]">
            {quiz.questions[currentQuestionIndex].options.map(
              (option, index) => (
                <button
                  key={index}
                  className={`block text-left w-full text-rwzr-[18px] font-normal py-[29px] px-[32px] border border-[#94a3b8] hover:bg-gray-100 cursor-pointer ${
                    isAnswerCorrect(option)
                      ? "bg-green-100 border-green-500" // Green for correct answer
                      : isAnswerIncorrect(option)
                      ? "bg-red-100 border-red-500" // Red for incorrect answer
                      : isCorrectAnswer(option)
                      ? "bg-green-100 border-green-500" // Green for correct answer (only after selection)
                      : userAnswers[currentQuestionIndex] === option
                      ? "bg-blue-100 border-blue-500" // Blue for selected but not evaluated
                      : "bg-white"
                  }`}
                  onClick={() => handleAnswerSelect(option)}
                  disabled={userAnswers[currentQuestionIndex] !== undefined} // Disable after selection
                >
                  {option}
                </button>
              )
            )}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button
            className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 disabled:bg-gray-300 cursor-pointer"
            onClick={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0} // Disable if on the first question
          >
            Previous
          </button>
          <button
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-blue-300 cursor-pointer"
            onClick={handleNextQuestion}
            disabled={currentQuestionIndex === quiz.questions.length - 1} // Disable if on the last question
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
