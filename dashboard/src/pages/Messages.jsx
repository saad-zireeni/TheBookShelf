import React, { useState, useEffect } from "react";
import axios from "axios";

function ReplySection({ messageId, email }) {
  const [reply, setReply] = useState("");

  const handleReply = async () => {
    try {
      const requestData = {
        messageId: messageId,
        reply: reply,
      };

      const response = await axios.post(
        "http://localhost:4000/sendReply",
        requestData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("Reply sent:", response.data);
      setReply("");
    } catch (error) {
      console.error("Error sending reply:", error);
    }
  };

  return (
    <div className="reply-section">
      <a href={`mailto:${email}`}>
        <button
          className="ContactMessageButton"
          style={{
            borderRadius: "50px",
            color: "white",
            padding: "10px",
            backgroundColor: "black",
          }}
          onClick={handleReply}
        >
          Reply
        </button>
      </a>
    </div>
  );
}

function Messages() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/messagesData")
      .then((response) => {
        setMessages(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="container mx-auto py-10">
      <div className="max-w-3xl mx-auto bg-white shadow p-6 rounded">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          User Messages
        </h2>
        {messages.length === 0 ? (
          <p className="text-center">No messages available</p>
        ) : (
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr>
                <th className="px-4 py-2 bg-gray-200 font-bold text-gray-700">
                  Name
                </th>
                <th className="px-4 py-2 bg-gray-200 font-bold text-gray-700">
                  Email
                </th>
                <th className="px-4 py-2 bg-gray-200 font-bold text-gray-700">
                  Message
                </th>
                <th className="px-4 py-2 bg-gray-200 font-bold text-gray-700">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {messages.map((message) => (
                <tr key={message.id} className="text-center">
                  <td className="px-4 py-2">{message.username}</td>
                  <td className="px-4 py-2">{message.email}</td>
                  <td className="px-4 py-2">{message.message}</td>
                  <td className="px-4 py-2">
                    <ReplySection
                      messageId={message.contact_id}
                      email={message.email}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Messages;
