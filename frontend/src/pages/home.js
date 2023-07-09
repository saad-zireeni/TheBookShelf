import React from "react";
import CategoryCard from "../components/CategoryCard";
import Hero from "../components/herosection";
import Featuers from "../components/Featuers";
import Testimonial from "../components/testmonial";

function Home() {
  return (
    <>
      <div className="relative flex flex-col min-h-screen">
        <Hero />

        <div className="relative py-24 overflow-hidden bg-gray-900 isolate sm:pt-32 sm:pb-16">
          <img
            src="https://ik.imagekit.io/pb97gg2as/E-Commerce-Assets/boksbg.png?updatedAt=1684597529803"
            alt="header-books"
            className="absolute inset-0 object-cover object-right w-full h-full -z-10 md:object-center"
          />

          <div>
            <Featuers />
          </div>

          <div className="mt-20">
            <h2 className="text-2xl font-bold my-20 text-white"
              style={{
                color: '#fff',
                fontSize: '2rem',
                fontWeight: 'bold',
              }}>Categories</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 ml-12 mr-12">
              <CategoryCard />
            </div>
          </div>

          <div>
            <Testimonial />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;