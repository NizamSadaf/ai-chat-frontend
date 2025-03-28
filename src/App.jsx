
// // Websocket


// import React, { useState, useEffect, useRef } from 'react';
// import { io } from 'socket.io-client';
// import './App.css';

// // const socket = io('http://localhost:3001');
// const socket_url = "wss://ai-chat-backend-2o2f.onrender.com"
// const socket = io(socket_url, {
//   transports: ["websocket"], // Ensure it uses WebSocket protocol
// });

// function App() {
//   const [input, setInput] = useState('');
//   const [messages, setMessages] = useState([]);
//   const [username, setUsername] = useState('');
//   const [isConnected, setIsConnected] = useState(false);
//   const messagesEndRef = useRef(null);

//   useEffect(() => {
//     socket.on('message', (data) => {
//       setMessages((prevMessages) => [...prevMessages, data]);
//     });

//     return () => {
//       socket.off('message');
//     };
//   }, []);

//   const sendMessage = (e) => {
//     e.preventDefault();
//     if (!input.trim()) return;

//     socket.emit('message', { username, message: input });
//     setInput('');
//   };

//   const handleJoin = () => {
//     if (username.trim()) setIsConnected(true);
//   };

//   return (
//     <div className="App">
//       {!isConnected ? (
//         <div className="login-screen">
//           <h2>Enter your name</h2>
//           <input
//             type="text"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             placeholder="Your name..."
//           />
//           <button onClick={handleJoin}>Join Chat</button>
//         </div>
//       ) : (
//         <div className="chat-container">
//           <h1>AI Chatroom</h1>
//           <div className="messages-container">
//             {messages.map((msg, index) => (
//               <div key={index} className={`message ${msg.isBot ? 'bot' : 'user'}`}>
//                 <strong>{msg.username}:</strong> {msg.message}
//               </div>
//             ))}
//             <div ref={messagesEndRef} />
//           </div>
//           <form onSubmit={sendMessage} className="input-form">
//             <input
//               type="text"
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               placeholder="Type your message..."
//             />
//             <button type="submit">Send</button>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;


import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import './App.css';

const socket_url = "wss://ai-chat-backend-2o2f.onrender.com"
const socket = io(socket_url, {
  transports: ["websocket"], // Ensure it uses WebSocket protocol
});

function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [isShortResponse, setIsShortResponse] = useState(true); // Control for short/long response
  const messagesEndRef = useRef(null);

  useEffect(() => {
    socket.on('message', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.off('message');
    };
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    socket.emit('message', { username, message: input, isShortResponse });
    setInput('');
  };

  const handleJoin = () => {
    if (username.trim()) setIsConnected(true);
  };

  return (
    <div className="App">
      {!isConnected ? (
        <div className="login-screen">
          <h2>Enter your name</h2>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Your name..."
          />
          <button onClick={handleJoin}>Join Chat</button>
        </div>
      ) : (
        <div className="chat-container">
          <h1>AI Chatroom</h1>
          <div className="response-options">
            <label>
              Short Answer
              <input
                type="radio"
                name="responseLength"
                checked={isShortResponse}
                onChange={() => setIsShortResponse(true)}
              />
            </label>
            <label>
              Long Answer
              <input
                type="radio"
                name="responseLength"
                checked={!isShortResponse}
                onChange={() => setIsShortResponse(false)}
              />
            </label>
          </div>
          <div className="messages-container">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.isBot ? 'bot' : 'user'}`}>
                <strong>{msg.username}:</strong> {msg.message}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={sendMessage} className="input-form">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
            />
            <button type="submit">Send</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default App;
