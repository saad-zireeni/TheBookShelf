import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "../style/testmonial.css";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";

function Testimonial() {

  const [booksData, setBooksData] = useState([]);

  useEffect(() => {
    const fetchBooksData = async () => {
      try {
        const response = await axios.get("http://localhost:9000/books");
        setBooksData(response.data);
      } catch (error) {
        console.error("Error fetching books data:", error);
      }
    };

    fetchBooksData();
  }, []);

  // console.log(booksData);

  const rating = booksData.filter((top) => top.rating === 5);
  console.log(rating);
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 2,
      slidesToSlide: 2,
    },
    mobile: {
      breakpoint: { max: 767, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

    return (
    <>
      <div className="AA">
        <div className="parent">
          <h2 className="text-2xl font-bold mt-20 text-white"
          style={{
            color: '#fff',
            fontSize: '2rem',
            fontWeight: 'bold',
          }}
          >Top Rated</h2>
          <Carousel
            responsive={responsive}
            autoPlay={true}
            swipeable={true}
            draggable={true}
            showDots={true}
            infinite={true}
            partialVisible={false}
            arrows={false}
            dotListClass="custom-dot-list-style"
            transitionDuration={5000}
          >
            {rating.map((data, index) => {
              return (
                <div className="slider" key={index}>
                  <Link
                    to={`/ProductOverview/${data.id}`}
                    id={data.id}>
                    <button className="w-full">
                      <div className="flex flex-col items-center self-center border bg-gray-800 hover:border shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] border-gray-400 transition-all duration-200 rounded-lg cursor-pointer backdrop-filter backdrop-blur-md hover:bg-gray-600 hover:bg-opacity-95 bg-opacity-95">
                        <div className="relative">
                          <img
                            className="w-40 h-56 p-4 rounded-t-lg lg:w-56 lg:h-80"
                            src={data.imgUrl}
                            alt={data.title}/>
                        </div>
                        <div className="flex flex-col flex-wrap content-between justify-center px-5 pb-5 align-middle">
                          <h5
                            title="{book.title}"
                            className="w-32 h-12 text-base font-semibold tracking-tight text-gray-100 lg:w-48 lg:text-lg lg:h-14 line-clamp-2">
                            {data.title}
                          </h5>
                          <div className="flex flex-col space-y-2">
                            <div className="text-lg lg:text-2xl relative before:mr-1 before:content-['₹'] font-bold text-gray-100">
                              {data.price - data.discount}
                              <p className="text-xs sm:text-sm  before:mr-1 before:content-['₹'] line-through text-gray-200">
                                {data.price}
                              </p>
                            </div>
                            {/* <AddToCartButton product={product} /> */}
                          </div>
                          <div className="flex flex-col space-y-2">
                            <div className="text-lg lg:text-2xl relative before:mr-1 before:content-[''] font-bold text-gray-100">
                              <span className="absolute text-xs right-0 bottom-1.5 font-semibold px-2.5 py-0.5 rounded bg-cyan-900 bg-opacity-80 text-gray-100">
                                {data.rating}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </button>
                  </Link>
                </div>
              );
            })}
          </Carousel>
          <br />
        </div>
      </div>
    </>
  );
}

export default Testimonial;