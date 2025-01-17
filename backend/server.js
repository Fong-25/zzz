// At the top of your server.js
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

// // Add these lines to understand what's happening
// console.log('Looking for .env file at:', path.resolve(__dirname, '../.env'));
// console.log('Current directory:', __dirname);
// console.log('MongoDB URI exists:', !!process.env.MONGODB_URI);

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files (index.js, style.css, etc.) from the 'frontend' directory
// app.use(express.static(path.join(__dirname, '../frontend')));


// //Rendering HTML
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, '../frontend', 'index.html'));
// });

// Serve static files (index.html, style.css, etc.) from the 'frontend-react' directory
app.use(express.static(path.join(__dirname, 'frontend-react/build')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend-react/build', 'index.html'));
});

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define the Message schema
const messageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const Message = mongoose.model('Message', messageSchema);

// Routes
app.post('/api/messages', async (req, res) => {
  try {
    const { name, content } = req.body;
    const message = new Message({ name, content });
    await message.save();
    res.status(201).json({ message: 'Message saved successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error saving message' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});