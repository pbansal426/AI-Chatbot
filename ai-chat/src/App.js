import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");

  const sendMessage = async () => {
    if (!userInput.trim()) return;

    // Add user message to chat
    setMessages([...messages, { role: "user", content: userInput }]);
    setUserInput("");

    // Get response from backend
    const response = await axios.post("http://127.0.0.1:8000/chat", {
      message: userInput,
    });

    const aiReply = response.data.response;

    // Add AI response to chat
    setMessages([
      ...messages,
      { role: "user", content: userInput },
      { role: "ai", content: aiReply },
    ]);
  };

  return (
    <div className="App">
      <h1>Local AI Chat - Phi-3 3.8B</h1>
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.role}`}
            dangerouslySetInnerHTML={{
              __html: msg.role === "ai" && msg.content.includes("```")
                ? msg.content.replace(/```(.*?)\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>')
                : msg.content
            }}
          />
        ))}
      </div>
      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        placeholder="Type your message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default App;
