require('dotenv').config();
const express = require('express');
const path = require('path');
const { generateTitles } = require('./utils/llmService');
const { validateProductInput } = require('./utils/validator');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// API endpoint for generating titles
app.post('/api/generate-titles', async (req, res) => {
  try {
    // Validate input
    const validation = validateProductInput(req.body);
    if (!validation.isValid) {
      return res.status(400).json({ error: validation.error });
    }

    // Generate titles using LLM
    const titles = await generateTitles(req.body);
    
    res.json({
      success: true,
      titles: titles,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error generating titles:', error.message);
    res.status(500).json({
      error: 'Failed to generate titles. Please try again.',
      details: error.message
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal server error',
    message: err.message
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`SEO Title Generator running on http://localhost:${PORT}`);
});
