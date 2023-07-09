import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { HeartIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { MdOutlineExplore } from "react-icons/md";
import { FiLogIn, FiLogOut } from "react-icons/fi";
import { set } from "date-fns";

function Nav() {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuth(true);
    }
  }, []);
  const handlelogOutBtn = () => {
    localStorage.removeItem("token");
    setAuth(false);
  };

  return (
    <header>
      <div className="fixed top-0 left-0 right-0 z-50 py-2 bg-gray-900">
        <div
          aria-label="Top"
          className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8"
        >
          <div className="sm:flex items-center sm:justify-between h-28 sm:h-16">
            <div className="sm:flex items-center sm:justify-between w-full pb-7 sm:pb-0">
              <div className="">
                <NavLink to="/">
                  <span className="sr-only">The Book Shelf</span>
                  <img
                    className="w-20 sm:w-28 mt-5 sm:mt-0"
                    src="https://ik.imagekit.io/pb97gg2as/E-Commerce-Assets/logo-no-background.png?updatedAt=1684597528087"
                    alt="THE BOOK SHELF"
                  />
                </NavLink>
              </div>

              <div className="flex items-center justify-end w-4/5 mt-10 ml-20 px-4 sm:mt-0 sm:ms-0 sm:px-0">
                <div className="flex items-center justify-end w-3/4">
                  <div>
                    <NavLink
                      to="/books"
                      className="flex items-center p-2 -m-2 text-gray-100 rounded-md hover:bg-gray-700 group"
                    >
                      Books
                      <MdOutlineExplore className="flex-shrink-0 w-6 h-6 ml-2 text-gray-100 group-hover:text-white" />
                      <span className="sr-only">products explore</span>
                    </NavLink>
                  </div>
                  <span
                    className="w-px h-6 ml-4 bg-gray-700 lg:ml-6"
                    aria-hidden="true"
                  />

                  <div className="flow-root ml-4 lg:ml-6">
                    <NavLink
                      to="/wishlist"
                      className="flex items-center p-2 -m-2 group"
                    >
                      <HeartIcon
                        className="flex-shrink-0 w-6 h-6 text-gray-100 group-hover:text-white"
                        aria-hidden="true"
                      />
                      <span className="ml-1 text-xs font-medium text-gray-100 sm:ml-2 sm:text-sm group-hover:text-gray-50">
                        {/* {wishlist.length} */}
                      </span>
                      <span className="sr-only">favorite items view</span>
                    </NavLink>
                  </div>
                  <span
                    className="w-px h-6 ml-4 bg-gray-700 lg:ml-6"
                    aria-hidden="true"
                  />

                  <div className="ml-4 md:flow-root lg:ml-6">
                    <NavLink
                      to="UserProfile"
                      className="flex items-center p-2 -m-2 group"
                    >
                      <UserCircleIcon
                        className="flex-shrink-0 w-6 h-6 text-gray-100 group-hover:text-white"
                        aria-hidden="true"
                      />
                      <span className="sr-only">user profile view</span>
                    </NavLink>
                  </div>
                  <span
                    className="w-px h-6 ml-4 bg-gray-700 lg:ml-6"
                    aria-hidden="true"
                  />

                  {auth === false ? (
                    <>
                      <div className="ml-4 md:flow-root lg:ml-6">
                        <NavLink
                          to="login"
                          className="flex items-center p-2 -m-2 group"
                        >
                          <FiLogIn
                            className="flex-shrink-0 w-6 h-6 text-gray-100 group-hover:text-white"
                            aria-hidden="true"
                          />
                          <span className="sr-only">user profile view</span>
                        </NavLink>
                      </div>
                    </>
                  ) : (
                    <>
                      {" "}
                      <div className="ml-4 md:flow-root lg:ml-6">
                        <button onClick={handlelogOutBtn}>
                          <FiLogOut
                            className="flex-shrink-0 w-6 h-6 text-gray-100 group-hover:text-white"
                            aria-hidden="true"
                          />
                        </button>
                      </div>
                    </>
                  )}
                  <span
                    className="w-px h-6 ml-4 bg-gray-700 lg:ml-6"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Nav;