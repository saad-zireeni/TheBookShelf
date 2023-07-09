import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import { addUser } from "../reducers/index";
import { createUsersAsync } from "../reducers/index";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signupState, setSignupState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    birthdate: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

  useEffect(() => {
    document.title = "Sign Up | The Book Shelf";
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (signupState.password !== signupState.confirmPassword) {
      toast.error("Password and Confirm password do not match");
      return;
    }

    if (!passwordRegex.test(signupState.password)) {
      toast.error(
        "Password should be 8 to 24 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one special character (!@#$%)."
      );
      return;
    }
    try {
      dispatch(
        addUser({
          username: signupState.firstName + " " + signupState.lastName,
          email: signupState.email,
          password: signupState.password,
        })
      );
      dispatch(
        createUsersAsync({
          username: signupState.firstName + " " + signupState.lastName,
          email: signupState.email,
          password: signupState.password,
          dateofbirth: signupState.birthdate,
        })
      );
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const changeHandlerFn = (e) => {
    setSignupState({ ...signupState, [e.target.name]: e.target.value });
  };

  console.log(signupState);

  return (
    <div className="relative py-24 overflow-hidden bg-gray-900 lg:mt-0 isolate sm:pt-32 sm:pb-16">
      <img
        src="https://w0.peakpx.com/wallpaper/4/328/HD-wallpaper-beautiful-bookworm-short-hair-pretty-reading-girl-books-library-anime.jpg"
        alt="header-books"
        className="absolute inset-0 object-cover object-right w-full h-50 -z-10 md:object-center"
      />

      <div className="flex flex-col items-center my-12 px-4 sm:px-6 lg:px-8 mx-auto sm:mt-32 md:mt-0 md:h-screen lg:py-0 text-left">
        <div className="w-full max-w-md bg-gray-800 border border-gray-700 rounded-lg shadow md:mt-0 xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-100 md:text-2xl text-center mb-5">
              Create an Account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="firstName"
                  className="block mb-2 text-sm font-medium text-gray-100"
                >
                  First Name
                </label>
                <input
                  onChange={changeHandlerFn}
                  value={signupState.firstName}
                  type="text"
                  name="firstName"
                  id="firstName"
                  className="border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-gray-100 focus:ring-cyan-800 focus:border-cyan-800"
                  placeholder="Jon"
                  required={true}
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block mb-2 text-sm font-medium text-gray-100"
                >
                  Last Name
                </label>
                <input
                  onChange={changeHandlerFn}
                  value={signupState.lastName}
                  type="text"
                  name="lastName"
                  id="lastName"
                  className="border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-gray-100 focus:ring-cyan-800 focus:border-cyan-800"
                  placeholder="Watts"
                  required={true}
                />
              </div>
              <div>
                <label
                  htmlFor="birthdate"
                  className="block mb-2 text-sm font-medium text-gray-100"
                >
                  Birth Date
                </label>
                <input
                  onChange={changeHandlerFn}
                  value={signupState.birthdate}
                  type="date"
                  name="birthdate"
                  id="birthdate"
                  className="border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-gray-100 focus:ring-cyan-800 focus:border-cyan-800"
                  required={true}
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-100"
                >
                  Your email
                </label>
                <input
                  onChange={changeHandlerFn}
                  value={signupState.email}
                  type="email"
                  name="email"
                  id="email"
                  className="border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-gray-100 focus:ring-cyan-800 focus:border-cyan-800"
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
                  value={signupState.password}
                  onChange={changeHandlerFn}
                  placeholder="••••••••"
                  className="border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-gray-100 focus:ring-cyan-800 focus:border-cyan-800"
                  required={true}
                />
              </div>
              <div className="relative">
                <label
                  htmlFor="confirmPassword"
                  className="block mb-2 text-sm font-medium text-gray-100"
                >
                  Confirm password
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
                  onChange={changeHandlerFn}
                  value={signupState.confirmPassword}
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  minLength="6"
                  id="confirmPassword"
                  placeholder="••••••••"
                  className="border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-gray-100 focus:ring-cyan-800 focus:border-cyan-800"
                  required={true}
                />
              </div>
              <button
                type="submit"
                className="w-full px-5 py-2.5 text-xs lg:text-sm font-medium text-center text-gray-100 rounded-lg bg-cyan-900 focus:ring-4 focus:outline-none hover:bg-cyan-950 focus:ring-cyan-950"
              >
                Create Account
              </button>

              <p className="text-sm font-light text-gray-400">
                Already have an account?
                <Link
                  to="/login"
                  className="ml-1 font-medium text-gray-100 hover:underline"
                >
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
