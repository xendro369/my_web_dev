// Answer.js
import React from 'react';

const Answer = ({ selectedAnswer, correctAnswer, isSubmitted }) => {
  const isCorrect = selectedAnswer === correctAnswer;
  // console.log(selectedAnswer, correctAnswer, isCorrect)
  return (
    <div className="text-lg font-medium mb-4">
      {isSubmitted && (
        <p className={isCorrect ? 'text-green-500' : 'text-red-500'}>
          Answer Marked: {selectedAnswer}
        </p>
      )}
      {!isSubmitted && (
        <p className={'text-blue-500'}>
          Answer Marked: {selectedAnswer}
        </p>
      )}
    </div>
  );
};

export default Answer;
