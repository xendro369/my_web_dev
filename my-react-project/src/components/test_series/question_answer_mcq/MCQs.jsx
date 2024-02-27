// MCQs.js
import React, { useState } from 'react';
import Question from './Question';
import Options from './Options';
import Answer from './Answer';

const MCQs = ({ questionNumber, question, options, answer, onSelect, onClear, isSubmitted }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleSelectAnswer = (optionIndex) => {
    const newSelectedAnswer = options[optionIndex];
    setSelectedAnswer(newSelectedAnswer);
    onSelect(optionIndex, newSelectedAnswer);
  };

  const handleClearSelection = () => {
    setSelectedAnswer(null);
    onClear();
  };

  return (
    <div className="container mx-auto p-4">
      <Question text={<strong>{`Q${questionNumber}: ${question}`}</strong>} className="text-3xl font-bold mb-4" />
      <Options options={options} onSelect={handleSelectAnswer} onClear={handleClearSelection} correctAnswer={answer} isSubmitted={isSubmitted} className="grid grid-cols-2 gap-4" />
      <Answer selectedAnswer={selectedAnswer} correctAnswer={answer} isSubmitted={isSubmitted} className="mt-4" />
    </div>
  );
};

export default MCQs;
