// src/Messages.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Messages.css';


function Messages() {
    const [messages, setMessages] = useState([]);
    const { password } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        // Verify password
        if (password !== '1234') {
            navigate('/');
            return;
        }

        // Fetch messages
        fetch('http://localhost:5000/api/messages/all')
            .then(response => response.json())
            .then(data => setMessages(data))
            .catch(error => console.error('Error:', error));
    }, [password, navigate]);

    return (
        <div className="messages-container">
            <div className="messages-grid">
                {messages.map((message) => (
                    <div key={message._id} className="message-card">
                        <h3>{message.name}</h3>
                        <p>{message.content}</p>
                        <small>{new Date(message.timestamp).toLocaleString()}</small>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Messages;