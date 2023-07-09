import React from "react";
import { GiBookshelf } from "react-icons/gi";
import { BsStars } from "react-icons/bs";
import { FaLightbulb } from "react-icons/fa";

function Featuers() {
  return (
    <>
      <section className="-mt-20 px-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-20 mt-10 text-white"
            style={{
              color: '#fff',
              fontSize: '2rem',
              fontWeight: 'bold',
            }}>Features</h2>        </div>

        <div className="flex-wrap items-center justify-center gap-8 text-center sm:flex">
          <div className="w-full px-4 py-4 mt-6 bg-white rounded-lg shadow-lg sm:w-1/2 md:w-1/2 lg:w-1/4 dark:bg-gray-800">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center w-12 h-12 mx-auto text-white bg-indigo-500 rounded-md">
                <FaLightbulb className="w-6 h-6" />
              </div>
            </div>
            <h3 className="py-4 text-2xl font-semibold text-gray-700 sm:text-xl dark:text-white">
              Book Recommendations
            </h3>
            <p className="py-4 text-gray-500 text-md dark:text-gray-300">
              Get personalized book recommendations based on your preferences,
              interests, and reading history. Discover new titles and genres
              that align with your tastes.
            </p>
          </div>
          <div className="w-full px-4 py-4 mt-6 bg-white rounded-lg shadow-lg sm:w-1/2 md:w-1/2 lg:w-1/4 sm:mt-16 md:mt-20 lg:mt-24 dark:bg-gray-800">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center w-12 h-12 mx-auto text-white bg-indigo-500 rounded-md">
                <BsStars className="w-6 h-6" />
              </div>
            </div>
            <h3 className="py-4 text-2xl font-semibold text-gray-700 sm:text-xl dark:text-white">
              Book Reviews and Ratings
            </h3>
            <p className="py-4 text-gray-500 text-md dark:text-gray-300">
              Read and contribute book reviews to help others make informed
              decisions. Rate and review books you've read, and browse reviews
              from fellow readers to find the next great read.
            </p>
          </div>
          <div className="w-full px-4 py-4 mt-6 bg-white rounded-lg shadow-lg sm:w-1/2 md:w-1/2 lg:w-1/4 dark:bg-gray-800">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center w-12 h-12 mx-auto text-white bg-indigo-500 rounded-md">
                <GiBookshelf className="w-6 h-6" />
              </div>
            </div>
            <h3 className="py-4 text-2xl font-semibold text-gray-700 sm:text-xl dark:text-white">
              Bookshelf and Collections
            </h3>
            <p className="py-4 text-gray-500 text-md dark:text-gray-300">
              Create and organize your virtual bookshelf, curate collections,
              and showcase your favorite books. Explore diverse collections from
              other users.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Featuers;