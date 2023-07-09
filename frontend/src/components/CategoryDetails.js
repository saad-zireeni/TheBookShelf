import React, { useState, useEffect } from "react";
import { Transition } from "@headlessui/react";
import BooksCard from "./booksCard";
import axios from "axios";
import { useParams } from "react-router-dom";

function CategoryDetails() {

    let { categoryName } = useParams();

    const [booksData, setBooksData] = useState([]);
    const [selectedRating, setSelectedRating] = useState("");

    const category = booksData.filter((type) => type.category === categoryName);

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

    const filterBooks = () => {
        let filteredBooks = category;
        if (selectedRating === "highToLow") {
            filteredBooks.sort((a, b) => b.rating - a.rating);
        } else if (selectedRating === "lowToHigh") {
            filteredBooks.sort((a, b) => a.rating - b.rating);
        }
        return filteredBooks;
    };

    const handleRatingChange = (rating) => {
        setSelectedRating(rating);
    };

    return (
        <>
            <div
                className="flex flex-col lg:flex-row"
                style={{
                    marginTop: "7rem",
                    marginBottom: "3rem",
                    justifyContent: "flex-end",
                }}>
                <div className="flex  mb-4 lg:w-1/4 lg:mx-4">
                    <label htmlFor="rating" className="ml-4 mr-2 text-gray-300">
                        Rating:
                    </label>
                    <select
                        id="rating"
                        value={selectedRating}
                        onChange={(e) => handleRatingChange(e.target.value)}
                        className="border border-gray-300 rounded-md px-2 py-1 text-gray-900 bg-white">
                        <option value="">All</option>
                        <option value="highToLow">High to Low</option>
                        <option value="lowToHigh">Low to High</option>
                    </select>
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
                leaveTo="opacity-0">
                <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 ml-12 mr-12">
                    {filterBooks().map((book) => (
                        <BooksCard key={book.id} book={book} />
                    ))}
                </div>
            </Transition>
        </>
    );
}

export default CategoryDetails;