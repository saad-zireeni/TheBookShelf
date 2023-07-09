import React, { useState, useEffect } from "react";
import { Transition } from "@headlessui/react";
import BooksCard from "../components/booksCard";
import SearchBar from "../components/search";
import axios from "axios";

function Books() {
  const [booksData, setBooksData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedRating, setSelectedRating] = useState("");
  const [searchData, setSearchData] = useState([]);

  useEffect(() => {
    const fetchBooksData = async () => {
      try {
        const response = await axios.get("http://localhost:9000/books");
        setBooksData(response.data);
        setSearchData(response.data);
      } catch (error) {
        console.error("Error fetching books data:", error);
      }
    };

    fetchBooksData();
  }, []);

  const filterBooks = () => {
    let filteredBooks = [...searchData];

    if (selectedCategory !== "") {
      filteredBooks = filteredBooks.filter(
        (book) => book.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (selectedRating === "highToLow") {
      filteredBooks.sort((a, b) => b.rating - a.rating);
    } else if (selectedRating === "lowToHigh") {
      filteredBooks.sort((a, b) => a.rating - b.rating);
    }

    return filteredBooks;
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleRatingChange = (rating) => {
    setSelectedRating(rating);
  };

  const searchProductsHandler = (searchTerm) => {
    // Filter the products based on the search term

    if (!searchTerm) {
      setSearchData(booksData);
    } else {
      const dataAfterFilter = booksData.filter((product) =>
        product.title?.toLowerCase().includes(searchTerm?.toLowerCase())
      );

      setSearchData(dataAfterFilter);
    }
  };

  return (
    <>
      <div
        className="flex flex-col lg:flex-row"
        style={{
          marginTop: "7rem",
          marginBottom: "3rem",
          justifyContent: "flex-end",
        }}
      >
        <div className="flex  mb-4 lg:w-1/4 lg:mx-4">
          <label htmlFor="category" className="mr-2 text-gray-300">
            Category:
          </label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="border border-gray-300 rounded-md px-2 py-1 text-gray-900 bg-white"
          >
            <option value="">All</option>
            <option value="Biography">Biography</option>
            <option value="Classic">Classic</option>
            <option value="Drama">Drama</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Fiction">Fiction</option>
            <option value="Horror">Horror</option>
            <option value="Non-Fiction">Non-Fiction</option>
            <option value="Thriller">Thriller</option>
          </select>
          <label htmlFor="rating" className="ml-4 mr-2 text-gray-300">
            Rating:
          </label>
          <select
            id="rating"
            value={selectedRating}
            onChange={(e) => handleRatingChange(e.target.value)}
            className="border border-gray-300 rounded-md px-2 py-1 text-gray-900 bg-white"
          >
            <option value="">All</option>
            <option value="highToLow">High to Low</option>
            <option value="lowToHigh">Low to High</option>
          </select>
        </div>
        <div className="flex mb-4 lg:w-1/4 lg:px-4">
          <div>
            <SearchBar
              products={searchData}
              searchProductsHandler={searchProductsHandler}
            />
          </div>
        </div>
      </div>

      <Transition
        appear={true}
        enter="transition-all ease-in-out duration-500 delay-[100ms]"
        show={true}
        enterFrom="opacity-0 translate-y-6"
        enterTo="opacity-100 translate-y-0"
        leave="transition-all ease-in-out duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
          {filterBooks().map((book) => (
            <BooksCard key={book.id} book={book} />
          ))}
        </div>
      </Transition>
    </>
  );
}

export default Books;
