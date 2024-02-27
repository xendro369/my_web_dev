import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { fetchData } from '../datafetchapi/fetchData';
import Question from '../question_answer_mcq/Question';
import Options from '../question_answer_mcq/Options';
import Answer from '../question_answer_mcq/Answer';
import Downloadpaper from '../downloadpaper/Downloadpaper';


const ViewAnalytics = () => {
  const { link } = useParams();
  const [analyticsData, setAnalyticsData] = useState(null);
  const [questionData, setQuestionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { pathname } = useLocation();
  const pathArray = pathname.split('/');
  const lastSegment = pathArray[pathArray.length - 1];
  console.log(lastSegment);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        // Fetch data based on the link parameter
        const data = await fetchData(`analytics_endpoint`);
        setAnalyticsData(data.analytics_data);
        setQuestionData(data.question_data);
      } catch (error) {
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchAnalyticsData();
  }, [link]);

  return (
    <div className="container mx-auto p-4">
                <div className="fixed top-10 left-0 p-8">
                <Link to={`/testseries/${lastSegment.slice(0, -1)}`} className="text-blue-500 hover:underline">
              Back
            </Link>
          </div>
      <h2 className="text-2xl font-bold mb-4">View Analytics</h2>

      {loading && <p>Loading...</p>}

      {error && <p>Error: {error}</p>}
      <Downloadpaper />
      <div id='pdf-container'>
      {analyticsData && (
        <div className="mt-4 p-4 bg-gray-200 rounded">
          <p className="mb-2">Correct Answers: {analyticsData.correctAnswersCount}</p>
          <p className="mb-2">Total Questions: {analyticsData.totalQuestions}</p>
          <p className="mb-2">Accuracy: {analyticsData.accuracy}%</p>
          <p className="mb-2">Time Taken: {analyticsData.timeTaken} seconds</p>
          <p className="mb-2">Time Remaining: {analyticsData.timeRemaining} seconds</p>
        </div>
      )}
        {questionData && (
          <div>
            {questionData.map((question, index) => (
              <div key={index} className="container mx-auto p-4">
                {/* <p className="text-xl font-bold mb-4">Q{index+1}: {question.question}</p> */}
                <Question text={<strong>{`Q${index+1}: ${question.question}`}</strong>} className="text-3xl font-bold mb-4" />
                {/* Pass the Options component here */}
                <Options
                  options={question.options}
                  onSelect={question.selectedOption}
                  correctAnswer={question.answer}
                  isSubmitted={true} // Adjust as needed
                />
                {/* <p className="text-lg font-medium mb-4">Selected Option: {question.selectedOption}</p> */}
                <Answer
                  selectedAnswer={question.selectedOption}
                  correctAnswer={question.answer}
                  isSubmitted={true} // Adjust as needed
                />
              </div>
            ))}
          </div>
        )}
        </div>
      </div>      
  );
};

export default ViewAnalytics;



































// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { fetchData } from '../datafetchapi/fetchData';

// const ViewAnalytics = () => {
//   const { link } = useParams();
//   const [analyticsData, setAnalyticsData] = useState(null);
//   const [questionData, setQuestionData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchAnalyticsData = async () => {
//       try {
//         // Fetch data based on the link parameter
//         const data = await fetchData(`analytics_endpoint`);
//         setAnalyticsData(data.analytics_data);
//         setQuestionData(data.question_data);
//       } catch (error) {
//         setError('Error fetching data');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAnalyticsData();
//   }, [link]);

//   return (
//     <div className="container mx-auto p-4">
//       <h2 className="text-2xl font-bold mb-4">View Analytics</h2>

//       {loading && <p>Loading...</p>}

//       {error && <p>Error: {error}</p>}

//       {analyticsData && (
//         <div>
//           <p>Analytics for link: {link}</p>
//           <p>Correct Answers: {analyticsData.correctAnswersCount}</p>
//           <p>Total Questions: {analyticsData.totalQuestions}</p>
//           <p>Accuracy: {analyticsData.accuracy}%</p>
//           <p>Time Taken: {analyticsData.timeTaken} seconds</p>
//           <p>Time Remaining: {analyticsData.timeRemaining} seconds</p>
//         </div>
//       )}

//       {questionData && (
//         <div>
//           <h2 className="text-2xl font-bold mb-4">Questions Data</h2>
          
//             {questionData.map((question, index) => (
//               <div key={index} className="container mx-auto p-4">
//                 <p className="text-xl font-bold mb-4">Question: {question.question}</p>
//                 <p >Options: {question.options.join(', ')}</p>
//                 <p className="text-lg font-medium mb-4">Selected Option: {question.selectedOption}</p>
//                 <p className="text-lg font-medium mb-4">Answer: {question.answer}</p>
//               </div>
//             ))}
//           </div>
//       )}
//     </div>
//   );
// };

// export default ViewAnalytics;
