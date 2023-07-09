import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function User() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleDelete = (user_id) => {
    Swal.fire({
      title: "Confirmation",
      text: "Are you sure you want to delete this user?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      dangerMode: true,
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .patch(`http://localhost:5000/users/${user_id}`, { deleted: true })
          .then((response) => {
            setUsers(users.filter((user) => user.user_id !== user_id));
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  return (
    <div className="container mx-auto py-10 md:w-4/5 w-11/12 px-1">
      <div className="w-full h-full rounded">
        <div className="py-19">
          <div className="mx-auto container bg-white dark:bg-gray-800 shadow rounded">
            <div className="w-full overflow-x-scroll xl:overflow-x-hidden">
              <table className="min-w-full bg-white dark:bg-gray-800">
                <thead>
                  <tr className="w-full h-16 border-gray-300 dark:border-gray-200 border-b py-8">
                    <th className="text-gray-600 dark:text-gray-400 font-bold pr-6 px-4 text-center text-m tracking-normal leading-4">
                      Profile Picture
                    </th>
                    <th className="text-gray-600 dark:text-gray-400 font-bold pr-6 px-4 text-center text-m tracking-normal leading-4">
                      User Name
                    </th>
                    <th className="text-gray-600 dark:text-gray-400 font-bold pr-6 px-4 text-center text-m tracking-normal leading-4">
                      Email
                    </th>
                    <th className="text-gray-600 dark:text-gray-400 font-bold pr-6 px-4 text-center text-m tracking-normal leading-4">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {users.map((user) => (
                    <tr
                      key={user.user_id}
                      className="h-24 border-gray-300 dark:border-gray-200 border-b"
                    >
                      <td className="text-sm whitespace-no-wrap text-center text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                        <div className="flex items-center justify-center">
                          <img
                            src={user.profile_picture}
                            alt="Profile"
                            className="w-8 h-8 rounded-full mr-3"
                          />
                        </div>
                      </td>
                      <td className="text-sm whitespace-no-wrap text-center text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                        <span>{user.username}</span>
                      </td>
                      <td className="text-sm whitespace-no-wrap text-center text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                        <span>{user.email}</span>
                      </td>
                      <button
                        className="mt-8 bg-red-500 hover:bg-red-600 text-white h-8 w-24 rounded-md flex items-center justify-center"
                        onClick={() => handleDelete(user.user_id)}
                      >
                        <span className="text-xs">Delete</span>
                      </button>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default User;
