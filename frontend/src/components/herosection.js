import React from "react";
import { BsArrowRight } from "react-icons/bs";
import video from "../images/vedio.mp4";
import { Link } from "react-router-dom";
import "../App.css"

function Hero() {
  return (
    <>
      <div className="relative w-full h-[83vh] flex justify-start bg-gradient-to-t from-black via-transparent to-black overflow-hidden">
        <video
          src={video}
          autoPlay
          loop
          muted
          className="text-white absolute w-full h-full object-cover object-left sm:object-center opacity-70"
        />

        {/* :HERO MAIN CONTAINER */}
        <div className="relative py-10 mx-auto max-w-4xl w-full h-full flex flex-col justify-center">
          {/* ::Hero title & text */}
          <div className="mx-5 md:mx-0 p-8 rounded-xl bg-gray-800 bg-opacity-50 text-white shadow-2xl">
            <h1 className="text-xl sm:text-2xl md:text-4xl font-josefin font-extrabold">
              The Book Shelf
            </h1>
            <p className="mt-3 text-gray-100 font-firacode">
              Step into a world of captivating books and let your imagination soar
            </p>
          </div>

          {/* ::Hero button */}
          <Link to="/books">
            <button className="relative mt-5 mx-auto w-48 sm:w-56 md:w-64 border justify-center border-white rounded-lg px-4 py-2 inline-flex items-center text-lg font-firacode text-white overflow-hidden transition-all duration-300 transform hover:translate-x-4 z-40">
              <span className="relative -top-0.5 mr-2">Books</span>
              <BsArrowRight />
            </button>
          </Link>

          <div className="absolute top-0 left-0 w-full h-full">
            {Array.from({ length: 50 }).map((_, index) => (
              <div
                key={index}
                className="absolute animate-star w-2 h-2 bg-white rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 6}s`,
                }}
              />
            ))}
          </div>

        </div>
      </div>
    </>
  );
}

export default Hero;