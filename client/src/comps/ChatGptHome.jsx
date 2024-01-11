
import React, { useState, useEffect } from 'react';
  const fetch = require('node-fetch');
  const Home = () => {

const [messages, setMessages] = useState([
    { id: 1, text: 'Hello!', sender: 'user' },
  { id: 2, text: 'Hi there!', sender: 'chatbot' },
    { id: 3, text: 'Hi you!', sender: 'chatbot' }
  ]);
const [newMessage, setNewMessage] = useState('');
const [typing, setTyping] = useState(false);

  useEffect(() => {
    // Simulate previous requests as ChatGPT responses
    const previousRequests = [];
    const previousMessages = previousRequests.map((request, index) => ({
      id: messages.length + index + 1,
      text: request,
      sender: 'user',
    }));
    
    setMessages([...messages, ...previousMessages]);
  }, []); // Run once on component mount

  const handleSendMessage = async() => {
   
    if (newMessage.trim() === '') return;

    setMessages([...messages, { id: messages.length + 1, text: newMessage, sender: 'user' }]);
    setNewMessage('');

      // Simulate a delay before ChatGPT's response
    setTyping(true);
  
     // Send the prompt to OpenAI and get the response
  
  const url = 'https://chatgpt-gpt5.p.rapidapi.com/ask';
  const options = {
  method: 'POST',
  headers: {
    'content-type': 'application/json',
		'X-RapidAPI-Key': 'e2770d9862msh85d3670d1c0e954p1834a0jsn895251fcbf89',
		'X-RapidAPI-Host': 'chatgpt-gpt5.p.rapidapi.com'
  },
  body: JSON.stringify({
    query: newMessage,
  }),
    };
    
 console.log('Request Body:', options.body);
try {
  
   const response1 = await fetch(url, options);
  const jsonResponse = await response1.json();
  
 
	console.log(jsonResponse.response);
  //const res = jsonResponse.result;
 setMessages([...messages, { id: messages.length + 1, text: jsonResponse.response, sender: 'chatbot' }]); // Store only the user-friendly message
 
  const translationApiUrl = 'https://translate-all-languages.p.rapidapi.com/translate?toLang=am&text=If%20you%20don%E2%80%99t%20know%20what%20language%20the%20text%20is%20written%20in%2C%20our%20API%20will%20detect%20the%20language%20of%20the%20original%20request.&fromLang=en';
      const translationApiOptions = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'e2770d9862msh85d3670d1c0e954p1834a0jsn895251fcbf89',
		'X-RapidAPI-Host': 'translate-all-languages.p.rapidapi.com'
	}
  
};

try {
	const response = await fetch(translationApiUrl, translationApiOptions);
	const result = await response.json(); // Assuming the translation API returns JSON
  console.log(result.translatedText);
} catch (error) {
	console.error(error);
}
  // Convert the result object to a string 
  setTyping(false);

} catch (error) {
  console.error(error);
}
  // Store the response text
 
  // Add the response to the messages array
  
setTyping(false);
  // ... your existing code ...
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div className="w-1/4 bg-black p-4">
        <h1 className="text-xl font-semibold mb-4">ChatGPT</h1>
        {/* Display previous requests in the sidebar */}
        {messages.map((msg) => (
          <div key={msg.id} className="mb-2">
            <span
              className={`inline-block px-2 py-1 rounded ${
                msg.sender === 'user' ? 'bg-blue-500' : 'bg-gray-700'
              }`}
            >
              {msg.text}
            </span>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 overflow-y-scroll">
        {/* Messages */}
        <div className="mb-8">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`mb-4 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}
            >
              <span
                className={`inline-block px-4 py-2 rounded ${
                  msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-white'
                }`}
              >
                {msg.text}
              </span>
            </div>
          ))}
           {/* Display "typing" indicator when ChatGPT is typing */}
          {typing && (
           <div className="text-left text-gray-500">
              <span className="animate-pulse inline-block text-2xl transform rotate-360">🌐 Loading ...</span>
            </div>
          )}
        </div>

        {/* Input Field */}
        <div className="flex">
          <input
            type="text"
            className="flex-1 border-2 border-gray-700 p-2 mr-2 text-black"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleSendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;