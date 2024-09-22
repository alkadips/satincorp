import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addAnswers, calculateScore, resetQuiz } from '../store/quizSlice';

const questions = [
  "Can you code in Ruby?",
  "Can you code in JavaScript?",
  "Can you code in Swift?",
  "Can you code in Java?",
  "Can you code in C#?"
];

const Quiz = () => {
  const dispatch = useDispatch();
  const { answers, totalScore, runs } = useSelector((state) => state.quiz);
  const currentQuestionIndex = answers.length;

  // Handle answer selection with useCallback for performance optimization
  const handleAnswer = useCallback((answer) => {
    try {
      dispatch(addAnswers(answer));
    } catch (error) {
      console.error("Error adding answer:", error);
    }
  }, [dispatch]);

  // Handle score submission with error handling
  const handleSubmit = useCallback(() => {
    try {
      if (currentQuestionIndex === questions.length) {
        dispatch(calculateScore());
      } else {
        console.warn("Please answer all questions before submitting.");
      }
    } catch (error) {
      console.error("Error calculating score:", error);
    }
  }, [dispatch, currentQuestionIndex]);

  // Handle quiz reset
  const handleReset = useCallback(() => {
    dispatch(resetQuiz());
  }, [dispatch]);

  // Calculate average score using useMemo for performance optimization
  const averageScore = useMemo(() => {
    return runs > 0 ? (totalScore / runs).toFixed(2) : 0;
  }, [totalScore, runs]);

  return (
    <div className="p-4 max-w-lg mx-auto bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Yes/No Quiz</h1>
      {currentQuestionIndex < questions.length ? (
        <div>
          <p className="mb-2">{questions[currentQuestionIndex]}</p>
          <div className="flex space-x-4 mb-4">
            <button
              onClick={() => handleAnswer('yes')}
              className="bg-blue-500 text-white p-2 rounded"
              aria-label="Answer Yes"
            >
              Yes
            </button>
            <button
              onClick={() => handleAnswer('no')}
              className="bg-red-500 text-white p-2 rounded"
              aria-label="Answer No"
            >
              No
            </button>
          </div>
        </div>
      ) : (
        <div>
          <p className="font-bold mb-2">Your score: {((totalScore / runs) || 0).toFixed(2)}%</p>
          <p className="mb-2">Average score over all runs: {averageScore}%</p>
          <button
            onClick={handleReset}
            className="bg-green-500 text-white p-2 rounded mt-4"
            aria-label="Restart Quiz"
          >
            Restart Quiz
          </button>
        </div>
      )}
      <button
        onClick={handleSubmit}
        className="bg-purple-500 text-white p-2 rounded mt-4"
        disabled={currentQuestionIndex < questions.length}
        aria-label="Submit Answers"
      >
        Submit Answers
      </button>
    </div>
  );
};

export default Quiz;
