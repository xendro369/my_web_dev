import React from 'react';

const SocialMediaButton = ({ icon, label, onClick }) => {
  return (
    <button
      type="button"
      className="w-full py-2 px-4 bg-gray-200 text-gray-700 font-medium rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      onClick={onClick}
    >
      <span className="sr-only">{label}</span>
      <i className={`fab ${icon}`}></i>
    </button>
  );
};

const SocialMediaComponent = () => {
  const handleFacebookClick = () => {
    // Handle Facebook click
  };

  const handleLinkedInClick = () => {
    // Handle LinkedIn click
  };

  const handleInstagramClick = () => {
    // Handle Instagram click
  };

  const handleTwitterClick = () => {
    // Handle Twitter click
  };

  return (
    <div>
      <div className="flex justify-center space-x-4">
        <SocialMediaButton icon="fa-facebook-f" label="Facebook" onClick={handleFacebookClick} />
        <SocialMediaButton icon="fa-linkedin" label="LinkedIn" onClick={handleLinkedInClick} />
        <SocialMediaButton icon="fa-instagram" label="Instagram" onClick={handleInstagramClick} />
        <SocialMediaButton icon="fa-twitter" label="Twitter" onClick={handleTwitterClick} />
      </div>
    </div>
  );
};

export default SocialMediaComponent;
