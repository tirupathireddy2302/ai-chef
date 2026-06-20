import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { askChef } from "../services/aiChefApi";

import "../styles/AIChefChat.css";

function AIChefChat() {

  const navigate =
    useNavigate();

  const [message,
    setMessage] =
    useState("");

  const [loading,
    setLoading] =
    useState(false);

  const [chat,
    setChat] =
    useState([
      {
        role: "assistant",
        text:
          "👨‍🍳 Hello! I'm your AI Chef. Ask me anything about cooking."
      }
    ]);

  const sendMessage =
    async () => {

      if (!message.trim())
        return;

      const userMessage = {
        role: "user",
        text: message
      };

      setChat(prev => [
        ...prev,
        userMessage
      ]);

      try {

        setLoading(true);

        const reply =
          await askChef(
            message
          );

        setChat(prev => [
          ...prev,
          {
            role:
              "assistant",
            text: reply
          }
        ]);

      } catch (error) {

        console.error(
          error
        );

        setChat(prev => [
          ...prev,
          {
            role:
              "assistant",
            text:
              "❌ AI Chef is unavailable."
          }
        ]);

      } finally {

        setLoading(false);

      }

      setMessage("");

    };

  return (

    <div className="chef-page">

      <button
        className="chef-back-btn"
        onClick={() =>
          navigate("/")
        }
      >
        ← Back
      </button>

      <h1>
        👨‍🍳 AI Chef Chat
      </h1>

      <div className="chat-box">

        {chat.map(
          (
            msg,
            index
          ) => (

            <div
              key={index}
              className={
                msg.role ===
                "user"
                  ? "user-msg"
                  : "chef-msg"
              }
            >
              {msg.text}
            </div>

          )
        )}

        {loading && (

          <div
            className="chef-msg"
          >
            👨‍🍳 Chef is thinking...
          </div>

        )}

      </div>

      <div className="chat-input">

        <input
          type="text"
          placeholder="Ask the chef..."
          value={message}
          onChange={(e) =>
            setMessage(
              e.target.value
            )
          }
          onKeyDown={(e) => {

            if (
              e.key ===
              "Enter"
            ) {

              sendMessage();

            }

          }}
        />

        <button
          onClick={
            sendMessage
          }
        >
          Send
        </button>

      </div>

    </div>

  );
}

export default AIChefChat;