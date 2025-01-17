// src/App.js
import React, { useState } from 'react';
import './style.css';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    content: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:5000/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        alert('Mesasge sent successfully!');
        // Clear form
        setFormData({
          name: '',
          content: ''
        });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      alert('Error sending message: ' + error.message);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [id]: value
    }));
  };

  return (
    <div id="container">
      <div id="form">
        <h1 id="header">Lorem, ipsum.</h1>
        <input
          type="text"
          placeholder="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
        />
        <textarea
          id="content"
          cols="30"
          rows="10"
          placeholder="lorem"
          value={formData.content}
          onChange={handleChange}
        />
        <button id="send" onClick={handleSubmit}>
          Send
        </button>
        <h1 id="footer">Thank you.</h1>
      </div>
    </div>
  );
}

export default App;