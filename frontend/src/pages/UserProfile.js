/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactDOM from "react-dom";
import {
  Card,
  Input,
  Button,
  Typography,
  Avatar,
} from "@material-tailwind/react";
import jwtDecode from "jwt-decode";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

const Modal = ({ children }) => {
  const modalRoot = document.getElementById("modal-root");
  const el = document.createElement("div");

  React.useEffect(() => {
    modalRoot.appendChild(el);
    return () => {
      modalRoot.removeChild(el);
    };
  }, [el, modalRoot]);

  return ReactDOM.createPortal(children, el);
};

const avatars = [
  {
    id: 0,
    img: "https://cdn.discordapp.com/attachments/1106603223458000987/1127311855585603584/3d-rendering-zoom-call-avatar.jpg",
  },
  {
    id: 1,
    img: "https://cdn.discordapp.com/attachments/1106603223458000987/1127306179723399308/3d-rendering-zoom-call-avatar_1.jpg",
  },
  {
    id: 2,
    img: "https://cdn.discordapp.com/attachments/1106603223458000987/1127306180126048256/3d-rendering-zoom-call-avatar.jpg",
  },
  {
    id: 3,
    img: "https://cdn.discordapp.com/attachments/1106603223458000987/1127306180620980224/3d-rendering-zoom-call-avatar_3.jpg",
  },
  {
    id: 4,
    img: "https://cdn.discordapp.com/attachments/1106603223458000987/1127306181141069914/3d-rendering-zoom-call-avatar_2.jpg",
  },
];

const UserProfile = () => {
  const [user_id, setUser_id] = useState();
  const [showForm, setShowForm] = useState(false);
  const [avatarImg, setAvatarImg] = useState("");

  useEffect(() => {
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

  const [userData, setUserData] = useState({
    username: "",
    email: "",
    profile_picture: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/getUserById/${user_id}`
        );
        const userData = response.data;
        setUserData((prevData) => ({
          ...prevData,
          username: userData[0].username,
          email: userData[0].email,
          profile_picture: userData[0].profile_picture,
        }));
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };

    fetchUserData();
  }, [user_id]);

  const handleCloseBtn = () => {
    setShowForm(false);
  };
  const handleEditbtn = () => {
    setShowForm(true);
  };

  const handleSelectedAvatar = (avatarUrl) => {
    setAvatarImg(avatarUrl);
  };

  const [updatedInfo, setUpdatedInfo] = useState({
    username: "",
    email: "",
    profile_picture: "",
  });

  useEffect(() => {
    setUpdatedInfo((prevData) => ({
      ...prevData,
      username: userData.username,
      email: userData.email,
      profile_picture: avatarImg,
    }));
  }, [userData, avatarImg]);


  const changeHandlerInputFields = (event) => {
    setUpdatedInfo({ ...updatedInfo, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    setUpdatedInfo((prevData) => ({
      ...prevData,
      username: userData.username,
      email: userData.email,
      profile_picture: avatarImg === "" ? avatars[0].img : avatarImg,
    }));
  }, [userData, avatarImg]);

  const HandleUpateUserInfo = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:5000/UpdateUser/${user_id}`,
        updatedInfo
      );
      setUserData(updatedInfo);
      console.log("data Sent Successfully");
      toast.success("Your info is Updated Successfully");
      setShowForm(false);
    } catch (error) {
      toast.error("Error While Update your data");
      console.log(error);
    }
  };

  return (
    <>
      <link
        rel="stylesheet"
        href="https://demos.creative-tim.com/notus-js/assets/styles/tailwind.css"
      />
      <link
        rel="stylesheet"
        href="https://demos.creative-tim.com/notus-js/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css"
      />
      <main className="profile-page">
        <section className="relative block h-500-px">
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage:
                'url("https://static-cse.canva.com/blob/921439/ImagebyStanislavKondratievviaUnsplash.jpg")',
            }}
          ></div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
            style={{ transform: "translateZ(0px)" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x={0}
              y={0}
            >
              <polygon
                className="text-brown-100 fill-current"
                points="2560 0 2560 100 0 100"
              />
            </svg>
          </div>
        </section>
        <section className="relative py-16 bg-brown-100">
          <div className="container mx-auto px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
              <div className="px-6">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                    <div className="relative">
                      <img
                        alt="..."
                        src={
                          userData.profile_picture === "" ||
                            userData.profile_picture === null ||
                            userData.profile_picture === undefined
                            ? avatars[0].img
                            : userData.profile_picture
                        }
                        className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                    <div className="py-6 px-3 mt-32 sm:mt-0">
                      <button
                        to="/editForm"
                        className="bg-gray-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={handleEditbtn}
                      >
                        Edit Profile
                      </button>
                      <Link to={`/UserPosts/${user_id}`}>
                        <button
                          className="bg-gray-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                          type="button"
                        >
                          My Posts
                        </button>
                      </Link>

                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-1"></div>
                </div>
                <div className="text-center mt-12 mb-20">
                  <h3 className="text-4xl font-semibold leading-normal text-blueGray-700 mb-2">
                    {userData.username}
                  </h3>
                  <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                    <i className="fas fa-envelope mr-2 text-lg text-blueGray-400" />
                    {userData.email}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {showForm === true && (
          <>
            <Modal>
              <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-opacity-50">
                <Card
                  shadow={false}
                  style={{ backgroundColor: "#111827e3", padding: "2rem" }}
                >
                  <div className="flex justify-between">
                    <Typography variant="h4" color="white">
                      Edit Your Profile
                    </Typography>
                    <button
                      type="button"
                      class=" rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500  focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                      onClick={handleCloseBtn}
                    >
                      <span class="sr-only">Close menu</span>
                      <svg
                        class="h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                  <div className="flex justify-center my-6">
                    <Typography className="text-gray-400">
                      Choose your Avatar
                    </Typography>
                  </div>
                  <div className="flex gap-5 justify-center">
                    {avatars?.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => handleSelectedAvatar(item.img)}
                      >
                        <Avatar
                          src={item.img}
                          alt="avatar"
                          className="rounded-full"
                        />
                      </button>
                    ))}
                  </div>
                  <form
                    onSubmit={HandleUpateUserInfo}
                    className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
                  >
                    <div className="mb-4 flex flex-col gap-6">
                      <Input
                        size="lg"
                        placeholder="Edit your name"
                        color="white"
                        name="username"
                        id="username"
                        defaultValue={updatedInfo.username}
                        onBlur={changeHandlerInputFields}
                      />
                      <Input
                        size="lg"
                        placeholder="Edit your email"
                        color="white"
                        name="email"
                        id="email"
                        defaultValue={updatedInfo.email}
                        onBlur={changeHandlerInputFields}
                      />
                    </div>
                    <Button
                      className="mt-6  text-gray-100 rounded-lg bg-cyan-900 focus:ring-4 focus:outline-none hover:bg-cyan-950 focus:ring-cyan-950"
                      fullWidth
                      type="submit"
                    >
                      Update
                    </Button>
                  </form>
                </Card>
              </div>
            </Modal>
          </>
        )}
      </main>
    </>
  );
};

export default UserProfile;