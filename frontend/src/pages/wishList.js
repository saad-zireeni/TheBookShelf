import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import BooksCard from "../components/wishListCard";

const Wishlist = () => {
  const [user_id, setUser_id] = useState();

  useEffect(() => {
    document.title = "Wishlist | The Book Shelf";
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const id = decodedToken.user_id;
        setUser_id(id);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  // Wait for user_id to have a value before rendering the component
  if (!user_id) {
    console.log("Loading...");
    return null;
  }

  return (
    <section className="bg-white dark:bg-gray-900 my-12">
      <h1 className="mb-10 mt-40 sm:mt-32 font-bold tracking-tight text-center text-gray-100 md:text-xl lg:text-4xl">
        Wishlist
      </h1>
      <section className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 gap-2 lg:grid-cols-4 bg-transparent p-10">
          <BooksCard user_id={user_id} />
        </div>
      </section>
    </section>
  );
};

export default Wishlist;
