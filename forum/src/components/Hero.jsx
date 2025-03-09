import React from 'react';

const Hero = () => {
  return (
    <>
      <section className="relative">
        <div className="mx-auto w-full max-w-512pxl px-5 py-16 md:px-10 md:py-24 lg:py-32">
          <div className="mx-auto mb-12 w-full max-w-3xl text-center md:mb-16 lg:mb-20">
            <h1 className="mb-4 text-4xl font-semibold md:text-6xl">
              Welcome to{ " "}
              <span className=" bg-cover bg-center px-4 text-black">
            " वार्ता-लाप  "
              </span>
              , the place where ideas come to life!
            </h1>
            <p className="mx-auto mb-5 max-w-[528px] text-xl text-[#636262] lg:mb-8">
              Whether you're here to ask questions, share knowledge, or engage in meaningful discussions, you've found the right community.
            </p>

            <div className="flex justify-center">
          
              <a
                href="#"
                className="flex max-w-full flex-row items-center justify-center rounded-xl border border-solid border-[#000] px-6 py-3 font-semibold text-[#ff8c00] [box-shadow:rgb(0,_0,_0)_6px_6px]"
              >
                
                <p className="text-black">Get Started</p>
              </a>
            </div>
          </div>

          <div className="relative mx-auto h-[512px]">
            <img
              src="https://nighteye.app/wp-content/uploads/2022/05/dark-ui-design-best-practices-1.jpg.webp"
              alt=""
              className="inline-block h-full w-full rounded-xl object-cover sm:rounded-2xl"
            />
            <div className="absolute bottom-0 left-4 right-0 top-4 -z-10 h-full w-full rounded-2xl bg-black"></div>
          </div>
        </div>
       
       
      </section>
    </>
  );
};

export default Hero;
