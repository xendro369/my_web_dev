// GenPaper.js
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import MCQs from '../question_answer_mcq/MCQs';
import { fetchData } from '../datafetchapi/fetchData';
import SubmitButton from '../../button/SubmitButton';
import { sendData } from '../datasaveapi/sendData';
import Downloadpaper from '../downloadpaper/Downloadpaper';

const testTime = 300;
// Helper function to format time in MM:SS
const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
  return `${formattedMinutes}:${formattedSeconds}`;
};

const GenPaper = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const pathArray = pathname.split('/');
  const lastSegment = pathArray[pathArray.length - 1];

  const [mcqs, setMCQs] = useState([]);
  const [timer, setTimer] = useState(testTime); // 5 minutes in seconds
  const [timerInterval, setTimerInterval] = useState(null); // to store the timer interval ID
  const [answeredQuestions, setAnsweredQuestions] = useState([]);  // stores the selected option
  const [statistics, setStatistics] = useState(null);              // stores the statistics after submission
  const [isSubmitted, setIsSubmitted] = useState(false);              // stores the statistics after submission
  const [loading, setLoading] = useState(true); // New state for loading indicator
  const [markedForReview, setMarkedForReview] = useState([]);
  // console.log(timer, timerInterval, answeredQuestions, statistics, loading);

  useEffect(() => {
    document.title = `Test Paper - ${lastSegment}`;
    if (!isSubmitted){
    const fetchQuestionPaper = async (endpoint) => {
      console.log('MCQ paper Mounted component mounted');
      try {
        const data = await fetchData(endpoint, lastSegment);
        setMCQs(data);
        setLoading(false); // Set loading to false when data is fetched
        console.log('loaded ');
      } catch (error) {
        console.log('Not loaded');
        setLoading(false); // Set loading to false when data is fetched
      }
    };
   
    fetchQuestionPaper('load_question_paper');

    const timerIntervalId = setInterval(() => {
      setTimer((prevTimer) => {
        const newTimer = Math.max(0, prevTimer - 1);

        // Check if the timer has reached zero and automatically submit the quiz
        if (newTimer === 0) {
          clearInterval(timerIntervalId); // Stop the interval
          handleSubmit(); // Call your submit function
        }

        return newTimer;
      });
    }, 1000);

    setTimerInterval(timerIntervalId);

    return () => {
      clearInterval(timerIntervalId);
    };
  }}, [lastSegment]);

  useEffect(() => {
    console.log('tttttttttttttt');
    const handleBeforeUnload = (event) => {
      if (!isSubmitted) {
        const message = 'Are you sure you want to leave? Your progress will be lost.';
        // You can customize the message and add other conditions as needed
        event.returnValue = message;
        console.log('uuuuuuuuuuuuuuuuu');
      }
    };

    const handleUnload = () => {
      if (!isSubmitted) {
        // Additional actions on unload, if needed
        console.log('vvvvvvvvvvvvv');
      }
    };    

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('unload', handleUnload);
    console.log('wwwwwwwwwwwww');

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('unload', handleUnload);
    };
  }, [isSubmitted]);

  const handleAnswerSelection = (questionIndex, optionIndex, selectedOption) => {
    // console.log('in handle answer selection ', questionIndex+1, optionIndex+1, selectedOption);
    setAnsweredQuestions((prevAnswers) => {
      return { ...prevAnswers, [questionIndex]: selectedOption };
    });
  };

  const handleClearSelection = (questionIndex) => {
    setAnsweredQuestions((prevAnswers) => {
      const updatedAnswers = { ...prevAnswers };
      delete updatedAnswers[questionIndex];
      return updatedAnswers;
    });
    console.log('Cleared Answer : ', questionIndex);
  };

  const calculateStatistics = (timer) => {
    const correctAnswersCount = mcqs.reduce((acc, questionData, index) => {
      const selectedOption = answeredQuestions[index];
      const isCorrect = selectedOption === questionData.answer;
      return isCorrect ? acc + 1 : acc;
    }, 0);

    const accuracy = (correctAnswersCount / mcqs.length) * 100;

    const calculatedStatistics = {
      correctAnswersCount,
      totalQuestions: mcqs.length,
      accuracy: isNaN(accuracy) ? 0 : accuracy,
      timeTaken: testTime - timer,
      timeRemaining: timer
    };
    return calculatedStatistics;
  };

  const handleSubmit = () => {
    // Check if the timer has reached zero

    console.log('in line no 142 ', (testTime-timer === 0), timer);
    if ((testTime-timer === 0) || window.confirm('Are you sure you want to submit?')) {
      // Stop the timer on submit
      clearInterval(timerInterval);
  
      console.log('Submit button clicked!', answeredQuestions);
      
      // Log the answered MCQs
      const answeredMCQs = mcqs.map((questionData, index) => ({
        question: questionData.question,
        options: questionData.options,
        selectedOption: answeredQuestions[index],
        answer: questionData.answer,
      }));
  
      // Log the answered MCQs
      console.log('Answered MCQs:', answeredMCQs);
      setIsSubmitted(true);
      // Update the answered questions state
      setAnsweredQuestions(answeredMCQs);
  
      // Corrected the line here
      const statistics = calculateStatistics(timer);
      setStatistics(statistics);
        
      console.log(statistics);
      console.log(pathname);
      const sendDataToServer = async () => {
        try {
          const status = await sendData('save_response_endpoint', { answeredMCQs, statistics }, lastSegment, 'POST');
          console.log(status);
          // Handle the status or perform additional actions if needed
        } catch (error) {
          console.error('Error sending data:', error);
          // Handle the error
        }
      };
      
      // Call the async function
      sendDataToServer();
      
    } else {
      console.log('Submission canceled.');
    }
  };

  // Function to handle scrolling to a specific MCQ
  const scrollToMCQ = (mcqIndex) => {
    const mcqElement = document.getElementById(`mcq-${mcqIndex}`);
    if (mcqElement) {
      const offset = mcqElement.offsetTop;
      window.scrollTo({ top: offset, behavior: 'auto' });
    }
  };

  const [isQuestionPalletExpand, setIsQuestionPalletExpand] = useState(true);

  const toggleQuestionsExpansion = () => {
    setIsQuestionPalletExpand((prev) => !prev);
  };

  const handleMarkForReview = (questionIndex) => {
    setMarkedForReview((prevMarks) => {
      const isMarked = prevMarks.includes(questionIndex);
      if (isMarked) {
        // If already marked, unmark it
        return prevMarks.filter((index) => index !== questionIndex);
      } else {
        // If not marked, mark it
        return [...prevMarks, questionIndex];
      }
    });
  };

  const [showWarning, setShowWarning] = useState(false);

  const handleWindowClick = (event) => {
    const mainTestElement = document.getElementById('main-test');
    if (mainTestElement && !mainTestElement.contains(event.target)) {
      setShowWarning(true);
    }
  };

  useEffect(() => {
    window.addEventListener('mousedown', handleWindowClick);

    return () => {
      window.removeEventListener('mousedown', handleWindowClick);
    };
  }, []);


  return (
    <div className="container mx-auto p-4" id="main-test">
      <div className="fixed top-10 right-0 p-8">
        {!isSubmitted && (
          <div className="flex justify-end items-center mb-4">
            <p className="text-sm font-bold text-gray-700 mr-2">
              Time Left: {formatTime(timer)}
            </p>
          </div>
        )}
        <div className={`grid grid-cols-5 gap-0.5 ${isQuestionPalletExpand ? '' : 'hidden'}`}>
          {!isSubmitted && mcqs.map((_, index) => (
            <button
              key={index}
              className={`${
                answeredQuestions[index] && markedForReview.includes(index)
                  ? 'bg-gradient-to-r from-green-400 to-violet-500'
                  : answeredQuestions[index]
                  ? 'bg-gradient-to-r from-green-400 to-green-400'
                  : markedForReview.includes(index)
                  ? 'bg-gradient-to-r from-violet-500 to-violet-500'
                  : 'bg-gray-200'
              } hover:bg-gray-900 text-white font-bold py-0.5 px-1 rounded-full`}
              onClick={() => scrollToMCQ(index + 1)}
            >
              Q{index + 1}
            </button>
          ))}
        </div>
        {isSubmitted && <Downloadpaper />}
        {!isSubmitted && (
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4 right-0"
            onClick={toggleQuestionsExpansion}
          >
            {isQuestionPalletExpand ? 'Compress' : 'Expand'}
          </button>
        )}
      </div>
  
      <div id="pdf-container" className="overflow-y-auto max-h-screen-3/4">
        {loading && (
          <div className="loading-container">
            <p className="loading-text">Loading...</p>
          </div>
        )}
        {statistics && (
          <div className="mt-4 p-4 bg-gray-200 rounded">
            <h3 className="text-lg font-bold mb-2">Statistics:</h3>
            <p className="mb-2">Correct Answers: {statistics.correctAnswersCount}</p>
            <p className="mb-2">Total Questions: {statistics.totalQuestions}</p>
            <p className="mb-2">Accuracy: {statistics.accuracy.toFixed(2)}%</p>
            <p className="mb-2">Time Taken: {formatTime(statistics?.timeTaken || 0)}</p>
            <p className="mb-2">Time Remaining: {formatTime(statistics?.timeRemaining || 0)}</p>
          </div>
        )}
  
        {mcqs.map((questionData, index) => (
          <div key={index} id={`mcq-${index + 1}`}>
            <MCQs
              questionNumber={index + 1}
              question={questionData.question}
              options={questionData.options}
              answer={questionData.answer}
              onSelect={(optionIndex, selectedOption) => handleAnswerSelection(index, optionIndex, selectedOption)}
              onClear={() => handleClearSelection(index)}
              isSubmitted={isSubmitted}
            />
            {!isSubmitted && (
              <button
                className={`${
                  markedForReview.includes(index) ? 'bg-violet-500' : 'bg-gray-200'
                } hover:bg-gray-900 text-white font-bold py-0.5 px-1 rounded-full`}
                onClick={() => handleMarkForReview(index)}
              >
                Mark for Review
              </button>
            )}
          </div>
        ))}
  
        <div className="fixed bottom-20 right-0 p-8">
          {!isSubmitted && <SubmitButton label="Submit" onSubmit={handleSubmit} />}
        </div>
  
        <div className="fixed top-10 left-0 p-8">
          {isSubmitted && (
            <Link to={`/testseries/${lastSegment.slice(0, -1)}`} className="text-blue-500 hover:underline">
              Back
            </Link>
          )}
        </div>
  
        {showWarning && (
          <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded shadow-md">
              <p className="text-red-500 font-bold">
                Caution: Exiting the test may lead to forfeiting your progress. If you wish to proceed with leaving, please select the submit option.
              </p>
              <button className="bg-blue-500 text-white p-2 rounded" onClick={() => setShowWarning(false)}>
                Continue
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
  
  
  // return (
  //   <div className="container mx-auto p-4" id='main-test'>
  //           {/* Button box at the top-right corner */}      
  //     <div className="fixed top-10 right-0 p-8">
  //       {!isSubmitted && (
  //         <div className="flex justify-end items-center mb-4">
  //           <p className="text-sm font-bold text-gray-700 mr-2">
  //             Time Left: {formatTime(timer)}
  //           </p>
  //         </div>
  //         )}
  //       <div className={`grid grid-cols-5 gap-0.5 ${isQuestionPalletExpand ? '' : 'hidden'}`}>
  //         {!isSubmitted && mcqs.map((_, index) => (
  //           <button
  //           key={index}
  //           className={`${
  //             answeredQuestions[index] && markedForReview.includes(index)
  //               ? 'bg-gradient-to-r from-green-400 to-violet-500'
  //               : answeredQuestions[index]
  //               ? 'bg-gradient-to-r from-green-400 to-green-400'
  //               : markedForReview.includes(index)
  //               ? 'bg-gradient-to-r from-violet-500 to-violet-500'
  //               : 'bg-gray-200'
  //           } hover:bg-gray-900 text-white font-bold py-0.5 px-1 rounded-full`}
  //           onClick={() => scrollToMCQ(index + 1)}
  //         >
  //           Q{index + 1}
  //         </button>
  //         ))}
  //       </div>
  //       {isSubmitted && (
  //         <Downloadpaper />
  //       )}
  //       {/* Add the expand/compress button */}
  //       {!isSubmitted && (
  //         <button
  //           className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4 right-0"
  //           onClick={toggleQuestionsExpansion}
  //         >
  //           {isQuestionPalletExpand ? 'Compress' : 'Expand'}
  //         </button>
  //       )}
  //     </div>
  //     <div id="pdf-container" className='overflow-y-auto max-h-screen-3/4'>
  //     {loading && (
  //       <div className="loading-container">
  //         <p className="loading-text">Loading...</p>
  //       </div>
  //     )}
  //     {statistics && (
  //       <div className="mt-4 p-4 bg-gray-200 rounded">
  //         <h3 className="text-lg font-bold mb-2">Statistics:</h3>
  //         <p className="mb-2">Correct Answers: {statistics.correctAnswersCount}</p>
  //         <p className="mb-2">Total Questions: {statistics.totalQuestions}</p>
  //         <p className="mb-2">Accuracy: {statistics.accuracy.toFixed(2)}%</p>
  //         <p className="mb-2">Time Taken: {formatTime(statistics?.timeTaken || 0)}</p>
  //         <p className="mb-2">Time Remaining: {formatTime(statistics?.timeRemaining || 0)}</p>
  //       </div>
  //     )}
  //     {/* Use map to create MCQs components based on questionsData */}
  //     {mcqs.map((questionData, index) => (
  //       <div key={index} id={`mcq-${index + 1}`}>
  //         {/* Render the MCQ component */}
  //         <MCQs
  //           questionNumber={index + 1}
  //           question={questionData.question}
  //           options={questionData.options}
  //           answer={questionData.answer}
  //           onSelect={(optionIndex, selectedOption) => handleAnswerSelection(index, optionIndex, selectedOption)}
  //           onClear={() => handleClearSelection(index)}
  //           isSubmitted={isSubmitted}
  //         />
  //         {!isSubmitted && (
  //                 <button
  //                   className={`${
  //                     markedForReview.includes(index) ? 'bg-violet-500' : 'bg-gray-200'
  //                   } hover:bg-gray-900 text-white font-bold py-0.5 px-1 rounded-full`}
  //                   onClick={() => handleMarkForReview(index)}
  //                 >
  //                   Mark for Review
  //                 </button>
  //               )}
  //       </div>
  //     ))}  
  //         <div className="fixed bottom-20 right-0 p-8">
  //           {!isSubmitted &&
  //             <SubmitButton label="Submit" onSubmit={handleSubmit} />
  //           }   
  //         </div>   
  //         <div className="fixed top-10 left-0 p-8">
  //           {isSubmitted &&
  //     <Link to={`/testseries/${lastSegment.slice(0, -1)}`} className="text-blue-500 hover:underline">
  //     Back
  //   </Link>
  //           }   
  //         </div>   
  //     </div>
  //     {!isSubmitted && showWarning && (
  //       <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
  //         <div className="bg-white p-4 rounded shadow-md">
  //           <p className="text-red-500 font-bold">Caution: Exiting the test may lead to forfeiting your progress. If you wish to proceed with leaving, please select the submit option.</p>
  //           <button className="bg-blue-500 text-white p-2 rounded" onClick={() => setShowWarning(false)}>
  //             Continue
  //           </button>
  //         </div>
  //       </div>
  //     )}
  //   </div>
  // );
};

export default GenPaper;
