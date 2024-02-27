import React, { useState } from 'react';

const Options = ({ options, onSelect, onClear, correctAnswer, isSubmitted }) => {
  const optionLetters = ['a', 'b', 'c', 'd'];
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelectOption = (index, option) => {
    setSelectedOption(option);
    onSelect(index, option);
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <ul className="list-none pl-0">
        {options.map((option, index) => {
          const isCorrect = option === correctAnswer;
          const isSelectedCorrect = isSubmitted && isCorrect;
          const isSelectedNotCorrect = isSubmitted && option === selectedOption && !isCorrect;
          // console.log(correctAnswer, option, selectedOption, isCorrect, isSelectedCorrect, isSelectedNotCorrect)

          const optionClass = `hover:bg-gray-100 px-4 py-2 rounded-md cursor-pointer ${
            isSelectedCorrect ? 'bg-green-100 text-green-500' : isSelectedNotCorrect ? 'bg-red-100 text-red-500' : ''
          }`;

          return (
            <li
              key={index}
              className={optionClass}
              onClick={() => handleSelectOption(index, option)}
            >
              {`${optionLetters[index]}. ${option}`}
            </li>
          );
        })}
        {!isSubmitted && (
          <li
            className="hover:bg-gray-300 px-4 py-2 rounded-md cursor-pointer"
            onClick={() => {
              setSelectedOption(null);
              onClear();
            }}
          >
            Clear
          </li>
        )}
      </ul>
    </div>
  );
};

export default Options;






























// // Options.js
// import React from 'react';

// const Options = ({ options, onSelect, onClear, correctAnswer, isSubmitted }) => {
//   const optionLetters = ['a', 'b', 'c', 'd'];

//   return (
//     <div className="grid grid-cols-2 gap-4">
//       <ul className="list-none pl-0">
//         {options.map((option, index) => (
//           <li
//             key={index}
//             className="hover:bg-gray-100 px-4 py-2 rounded-md cursor-pointer"
//             onClick={() => onSelect(index, option)}
//           >
//             {`${optionLetters[index]}. ${option}`}
//           </li>
//         ))}
//                 <li
//           className="hover:bg-gray-100 px-4 py-2 rounded-md cursor-pointer"
//           onClick={() => onClear()}
//         >
//           Clear
//         </li>
//       </ul>
//     </div>
//   );
// };

// export default Options;


















// import React from 'react';

// const Options = ({ options, onSelect }) => {
//   return (
//     <div className="grid grid-cols-2 gap-4"> 
//       <ul className="list-none pl-0">
//         {options.map((option, index) => (
//           <li
//             key={index}
//             className="hover:bg-gray-100 px-4 py-2 rounded-md cursor-pointer" // Add hover effect, padding, and rounded corners
//             onClick={() => onSelect(option)}
//           >
//             {option}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Options;

