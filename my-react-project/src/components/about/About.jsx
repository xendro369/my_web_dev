import React from 'react';

export default function About() {
  return (
    <>
      <section className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">About Us</h1>

        <p className="mb-4">Welcome to [Your Company/Project Name]</p>

        <p className="mb-4">
          At [Your Company/Project Name], we [provide a brief description of your mission or purpose].
          Whether it's [mention key services or features], we are dedicated to [highlight your commitment, values, or goals].
        </p>

        <h3 className="mt-4 mb-4">Our Mission</h3>

        <p className="mb-4">[Clearly articulate your mission statement.]</p>

        <h3 className="mt-4 mb-4">What Sets Us Apart</h3>

        <ul className="flex flex-col list-none">
          <li className="px-4 py-2">
            - Quality: [Highlight what makes your products or services unique or of high quality.]
          </li>
          <li className="px-4 py-2">
            - Innovation: [Emphasize any innovative approaches, technologies, or strategies you employ.]
          </li>
          <li className="px-4 py-2">
            - Customer Satisfaction: [Discuss your commitment to customer satisfaction and how you go the extra mile.]
          </li>
        </ul>

        {/* ... remaining sections with Tailwind classes applied ... */}
                {/* Our Story */}
                <h4 className="mt-8 mb-4">Our Story</h4>
        <p className="prose text-base mb-8">
          *[Share the story of how your company or project began. Include key milestones, challenges, and successes. Make it relatable and engaging for your audience.]
        </p>

        {/* Meet the Team */}
        <h4 className="mt-8 mb-4">Meet the Team</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {/* Team member cards go here */}
        </div>

        {/* Contact Information */}
        <h4 className="mt-8 mb-4">Contact Information</h4>
        <div className="flex flex-col items-center justify-center space-y-4">
          <p>For any inquiries, you can reach us at <a href="mailto:[your email address]">[your email address]</a>.</p>
          <p>We value your feedback and look forward to hearing from you.</p>
        </div>

        {/* Connect With Us */}
        <h4 className="mt-8 mb-4">Connect With Us</h4>
        <div className="flex flex-col items-center justify-center space-y-4">
          {/* Social media links go here */}
        </div>

        {/* Join Our Community */}
        <h4 className="mt-8 mb-4">Join Our Community</h4>
        <div className="flex items-center justify-center mt-4">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Join Now
          </button>
        </div>

        {/* Thank You */}
        <h4 className="mt-8 mb-4 text-center">Thank You for Your Support</h4>
        <h5 className="text-center mt-2">We appreciate your interest in [Your Company/Project Name]. Thank you for being a part of our journey.</h5>

      </section>
    </>
  );
}
