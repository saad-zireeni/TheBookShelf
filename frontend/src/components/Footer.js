import { HashLink } from "react-router-hash-link";

const Footer = () => {
  return (
    <>
      <footer
        className="text-white px-4 py-5 md:px-8 border-t border-gray-700"
        style={{ backgroundColor: "#111827" }}
      >
        <div className="max-w-lg sm:mx-auto sm:text-center">
          <img
            src="https://ik.imagekit.io/pb97gg2as/E-Commerce-Assets/logo-no-background.png?updatedAt=1684597528087"
            alt="Logo"
            className="w-32 sm:mx-auto"
          />

          <p className="leading-relaxed mt-2 text-[15px]">
            we believe that books are not just a source of knowledge
            but also a gateway to limitless entertainment.Explore new worlds,
            and embark on thrilling adventures with our vast collection
            of books.Enchanting fantasies,
            thought-provoking non-fiction, or heartwarming romance, we have something for every book lover.
          </p>
        </div>

        <ul className="items-center justify-center mt-8 space-y-5 sm:flex sm:space-x-4 sm:space-y-0">
          <HashLink smooth to="/#">
            <li className="text-white-700 hover:text-white-900">Home</li>
          </HashLink>

          <li className="text-white-700 hover:text-white-900">Blog</li>

          <HashLink to="/AboutUs/#">
            <li className="text-white-700 hover:text-white-900">Who are we</li>
          </HashLink>

          <HashLink smooth to="/ContactUs/#">
            <li className="text-white-700 hover:text-white-900">
              get in touch
            </li>
          </HashLink>
        </ul>

        <div className="mt-8 items-center justify-center sm:flex">
          <div className="mt-4 sm:mt-0">
            &copy; 2023 THEBOOKSHELF All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;