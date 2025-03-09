import React from "react";

const Features = () => {
  return (
    <section className="text-black bg-white bg-white/80 py-24">
      <div className="max-w-6xl mx-auto px-5">
        <div className="text-center mb-20">
          <h1 className="text-4xl font-extrabold leading-10 sm:text-5xl md:text-6xl">
            Features
          </h1>
          <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto">
            Discover the key features that make our platform powerful and engaging.
          </p>
          <div className="flex mt-6 justify-center">
            <div className="w-16 h-1 rounded-full bg-white inline-flex"></div>
          </div>
        </div>
        <div className="flex flex-wrap -mx-4">
          <div className="p-6 md:w-1/2 lg:w-1/3 flex flex-col">
            <div className="rounded-lg bg-white hover:bg-blue-500 hover:text-white text-black p-6 border border-gray-300 shadow-lg">
              <div className="flex p-2 gap-1">
                <span className="bg-blue-500 inline-block w-3 h-3 rounded-full"></span>
                <span className="bg-purple-500 inline-block w-3 h-3 rounded-full"></span>
                <span className="bg-pink-500 inline-block w-3 h-3 rounded-full"></span>
              </div>
              <h2 className="text-xl font-medium mb-3">User Authentication</h2>
              <ul className="list-disc list-inside">
                <li>Sign up & Log in (Email/Password, Google OAuth, etc.)</li>
                <li>Profile management (Profile picture, bio, badges, reputation, etc.)</li>
                <li>Role-based access (Admin, Moderator, Regular User)</li>
              </ul>
            </div>
          </div>
          <div className="p-6 md:w-1/2 lg:w-1/3 flex flex-col">
            <div className="rounded-lg bg-white hover:bg-purple-500 hover:text-white text-black p-6 border border-gray-300 shadow-lg">
              <div className="flex p-2 gap-1">
                <span className="bg-blue-500 inline-block w-3 h-3 rounded-full"></span>
                <span className="bg-purple-500 inline-block w-3 h-3 rounded-full"></span>
                <span className="bg-pink-500 inline-block w-3 h-3 rounded-full"></span>
              </div>
              <h2 className="text-xl font-medium mb-3">Question & Answer System</h2>
              <ul className="list-disc list-inside">
                <li>Users can ask questions with title, description, and tags</li>
                <li>Other users can answer questions</li>
                <li>Mark an answer as 'Accepted'</li>
                <li>Threaded replies (nested comments on answers)</li>
              </ul>
            </div>
          </div>
          <div className="p-6 md:w-1/2 lg:w-1/3 flex flex-col">
            <div className="rounded-lg bg-white hover:bg-pink-500 hover:text-white text-black p-6 border border-gray-300 shadow-lg">
              <div className="flex p-2 gap-1">
                <span className="bg-blue-500 inline-block w-3 h-3 rounded-full"></span>
                <span className="bg-purple-500 inline-block w-3 h-3 rounded-full"></span>
                <span className="bg-pink-500 inline-block w-3 h-3 rounded-full"></span>
              </div>
              <h2 className="text-xl font-medium mb-3">Forum Features</h2>
              <ul className="list-disc list-inside">
                <li>Users can create discussion threads</li>
                <li>Categorized topics (Technology, Health, Education, etc.)</li>
               
                <li>Sticky/Featured posts by moderators</li>
                <li>User mentions (@username) and notifications</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
