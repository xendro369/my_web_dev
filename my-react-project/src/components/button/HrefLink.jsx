// HrefLink.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function HrefLink({ to, fieldTxt, onClick }) {
  const handleClick = (e) => {
    e.preventDefault();
    if (onClick) {
      onClick();
    }
  };

  return (
    <div className="mt-6 text-center">
      <p>
        <Link to={to} onClick={handleClick} className="underline text-blue-600 hover:text-blue-800">
          {fieldTxt}
        </Link>
      </p>
    </div>
  );
}

export default HrefLink;




















// // HrefLink.jsx
// import React from 'react';
// import { Link } from 'react-router-dom';

// function HrefLink({ to, fieldTxt }) {
//   return (
//     <div className="mt-6 text-center">
//       <p>
//         <Link to={to} className="underline text-blue-600 hover:text-blue-800">{fieldTxt}</Link>
//       </p>
//     </div>
//   );
// }

// export default HrefLink;
