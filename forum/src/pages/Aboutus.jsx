import React from 'react';

const Aboutus = () => {
  return (
    <div   style={{
      backgroundImage:
        "url('https://nighteye.app/wp-content/uploads/2022/05/dark-ui-design-best-practices-1.jpg.webp')",
    }}
    className="bg-white text-white min-h-screen py-12 px-6 md:px-16 lg:px-24">
      <div className="max-w-4xl mx-auto bg-white/20  shadow-lg rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-center text-white mb-6">About वार्ता-लाप</h1>
        <p className="text-white text-lg leading-relaxed text-center mb-6">
          Welcome to <span className="font-semibold">वार्ता-लाप</span>, a dynamic and engaging online platform designed to foster knowledge-sharing, meaningful discussions, and community-driven conversations.
        </p>
        
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-white border-b-2 border-blue-500 pb-2">What We Offer</h2>
            <ul className="list-disc list-inside mt-3 text-white space-y-2">
              <li>Secure sign-up and login with Email/Password, Google OAuth, and more.</li>
              <li>Personalized user profiles including profile pictures, bios, badges, and reputation scores.</li>
              <li>Role-based access system ensuring structured moderation (Admin, Moderator, Regular User).</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-white border-b-2 border-blue-500 pb-2">Question & Answer System</h2>
            <ul className="list-disc list-inside mt-3 text-white space-y-2">
              <li>Post questions with detailed descriptions and relevant tags.</li>
              <li>Markdown & Rich Text Editor support for enhanced readability.</li>
              <li>Interactive upvote/downvote system to highlight the best answers.</li>
              <li>Threaded replies for in-depth discussions.</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-white border-b-2 border-blue-500 pb-2">Community Engagement & Recognition</h2>
            <ul className="list-disc list-inside mt-3 text-white space-y-2">
              <li>Reputation system rewarding participation.</li>
              <li>Unlock badges and achievements.</li>
              <li>Follow topics and users to stay updated.</li>
            </ul>
          </section>
        </div>

        <div className="mt-10 text-center">
          <p className="text-lg text-white font-medium">
            Join us and be a part of the dialogue that drives innovation and learning!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Aboutus;