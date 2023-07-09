import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const NavMenu = () => {
  const [state, setState] = useState(false);

  useEffect(() => {
    document.onclick = (e) => {
      const target = e.target;
      if (!target.closest(".menu-btn")) setState(false);
    };
  }, []);

  return (
    <nav
      className={`shadow bg-gray-900 mt-36 sm:mt-20 md:text-sm ${
        state ? "mt-24 md:mt-0" : ""
      }`}
    >
      <div className="gap-x-14 items-center max-w-screen-xl mx-auto px-4 md:flex md:px-8">
        <div className="flex items-center justify-between px-2 py-5 md:block">
          <div className="md:hidden">
            <button
              className="menu-btn text-white"
              onClick={() => setState(!state)}
            >
              {state ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
        <div
          className={`flex-1 items-center md:justify-center mb-6 md:mt-0 md:flex ${
            state ? "block" : "hidden"
          } `}
        >
          <ul className="justify-center items-center space-y-6 md:flex md:space-x-6 md:space-y-0">
            <Link to="/">
              <li className="text-white mb-4 md:mb-0">Home</li>
            </Link>
            <Link to="/Blog">
              <li className="text-white mb-4 md:mb-0">Blog</li>
            </Link>
            <Link to="/AboutUs">
              <li className="text-white mb-4 md:mb-0">Who are we</li>
            </Link>
            <Link to="/ContactUs">
              <li className="text-white">get in touch</li>
            </Link>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavMenu;