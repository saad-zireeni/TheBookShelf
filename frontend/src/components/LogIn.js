import { useLayoutEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import { checkUsersAsync } from "../reducers/index";

const LogIn = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [loginState, setLoginState] = useState({
    email: "",
    password: "",
  });

  useLayoutEffect(() => {
    document.title = "Login | The Book Shelf";
  });

  const submitHandlerFn = async (e) => {
    e.preventDefault();

    let error = {};
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

    if (loginState.email === "") {
      error.email = "Email should not be empty.";
    } else if (!email_pattern.test(loginState.email)) {
      error.email = "Email is not valid";
    } else {
      error.email = "";
    }

    if (loginState.password === "") {
      error.password = "Password should not be empty";
    } else if (!passwordRegex.test(loginState.password)) {
      error.password =
        "Password must be 8 to 24 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one special character (!@#$%).";
    } else {
      error.password = "";
    }

    try {
      dispatch(
        checkUsersAsync({
          email: loginState.email,
          password: loginState.password,
        })
      );
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const changeHandlerFn = (e) => {
    setLoginState({ ...loginState, [e.target.name]: e.target.value });
  };

  return (
    <>
      <section>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto mt-32 overflow-hidden md:mt-0 md:h-screen lg:py-0 text-left">
          <div className="w-full bg-gray-800 border border-gray-700 rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <img
                src="https://wallpapersworld.org/wp-content/uploads/2023/02/%D8%AE%D9%84%D9%81%D9%8A%D8%A7%D8%AA-%D8%A7%D9%86%D9%85%D9%8A-%D8%A8%D9%86%D8%A7%D8%AA-%D9%83%D9%8A%D9%88%D8%AA-2-768x480.jpg"
                alt="header-books"
                className="absolute inset-0 object-cover object-right w-full h-50 -z-10 md:object-center"
              />

              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-100 md:text-2xl">
                Sign in to your account
              </h1>
              <form
                onSubmit={submitHandlerFn}
                className="space-y-4 md:space-y-6"
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-100"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={loginState.email}
                    onChange={changeHandlerFn}
                    className="border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-gray-100 focus:ring-cyan-800 focus:border-cyan-800"
                    placeholder="abc@email.com"
                    required={true}
                  />
                </div>
                <div className="relative">
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-100"
                  >
                    Password
                  </label>

                  {showPassword ? (
                    <EyeIcon
                      onClick={() => setShowPassword(false)}
                      className="absolute w-6 h-6 text-gray-500 cursor-pointer right-2 bottom-2"
                    />
                  ) : (
                    <EyeSlashIcon
                      onClick={() => setShowPassword(true)}
                      className="absolute w-6 h-6 text-gray-500 cursor-pointer right-2 bottom-2"
                    />
                  )}
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    minLength="6"
                    value={loginState.password}
                    onChange={changeHandlerFn}
                    placeholder="••••••••"
                    className="border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-gray-100 focus:ring-cyan-800 focus:border-cyan-800"
                    required={true}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-5 py-2.5 text-xs lg:text-sm font-medium text-center text-gray-100 rounded-lg bg-cyan-900 focus:ring-4 focus:outline-none hover:bg-cyan-950 focus:ring-cyan-950"
                >
                  Sign in
                </button>

                <p className="text-sm font-light text-gray-400">
                  Don't have an account yet?
                  <Link
                    to="/SignUp"
                    className="ml-1 font-medium text-gray-100 hover:underline"
                  >
                    Create Account
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LogIn;
