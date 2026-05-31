import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import "./App.css";

const socket = io("https://collaborative-document-editorr.onrender.com");

function App() {
  const [text, setText] = useState("");

  useEffect(() => {
    socket.on("load-document", (data) => {
      setText(data);
    });

    socket.on("receive-changes", (data) => {
      setText(data);
    });
  }, []);

  const handleChange = (e) => {
    setText(e.target.value);
    socket.emit("send-changes", e.target.value);
  };

  return (
    <div className="container">
      <h1>Real-Time Collaborative Editor</h1>

      <textarea
        value={text}
        onChange={handleChange}
        placeholder="Start typing..."
      />
    </div>
  );
}

export default App;