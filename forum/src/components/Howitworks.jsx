import React from "react";

const Howitworks = () => {
  return (
    <section className="py-12 bg-white">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-black sm:text-4xl xl:text-5xl">
            How does Vaarta Laab work?
          </h2>
          <p className="max-w-md mx-auto mt-5 text-base font-normal text-black">
            Vaarta Laab is a dynamic platform for Q&A and discussions, connecting users through insightful conversations and community-driven forums.
          </p>
        </div>

        <div className="flex flex-col items-center max-w-md mx-auto mt-8 lg:mt-20 lg:flex-row lg:max-w-none">
          {/* Step 1 */}
          <div className="relative flex-1 w-full bg-white border border-gray-200 rounded-2xl shadow-lg">
            <div className="py-8 px-9">
              <div className="inline-flex items-center justify-center w-10 h-10 text-base font-bold text-black bg-white border border-gray-300 rounded-xl">
                1
              </div>
              <h3 className="text-lg font-semibold text-black mt-2">Ask or Answer Questions</h3>
              <p className="mt-4 text-xl font-medium text-black">
                Post your queries and get expert answers or contribute by sharing your knowledge with others.
              </p>
            </div>
          </div>

          {/* Arrow */}
          <div className="hidden lg:block lg:-mx-2">
            <svg className="w-auto h-4 text-gray-300" viewBox="0 0 81 16" fill="none">
              <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 11 1)" stroke="currentColor" />
              <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 46 1)" stroke="currentColor" />
            </svg>
          </div>

          {/* Step 2 */}
          <div className="relative flex-1 w-full mt-8 lg:mt-0 bg-white border border-gray-200 rounded-2xl shadow-lg">
            <div className="py-8 px-9">
              <div className="inline-flex items-center justify-center w-10 h-10 text-base font-bold text-black bg-white border border-gray-300 rounded-xl">
                2
              </div>
              <h3 className="text-lg font-semibold text-black mt-2">Engage in Forums</h3>
              <p className="mt-4 text-xl font-medium text-black">
                Participate in topic-based discussions, share ideas, and collaborate with like-minded individuals.
              </p>
            </div>
          </div>

          {/* Arrow */}
          <div className="hidden lg:block lg:-mx-2">
            <svg className="w-auto h-4 text-gray-300" viewBox="0 0 81 16" fill="none">
              <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 11 1)" stroke="currentColor" />
              <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 46 1)" stroke="currentColor" />
            </svg>
          </div>

          {/* Step 3 */}
          <div className="relative flex-1 w-full mt-8 lg:mt-0 bg-white border border-gray-200 rounded-2xl shadow-lg">
            <div className="py-8 px-9">
              <div className="inline-flex items-center justify-center w-10 h-10 text-base font-bold text-black bg-white border border-gray-300 rounded-xl">
                3
              </div>
              <h3 className="text-lg font-semibold text-black mt-2">Stay Updated & Grow</h3>
              <p className="mt-4 text-xl font-medium text-black">
                Follow discussions, receive notifications on trending topics, and enhance your knowledge through the community.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Howitworks;
