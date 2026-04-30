const axios = require('axios');

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_MODEL = process.env.GROQ_MODEL || 'mixtral-8x7b-32768';
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

/**
 * Generate SEO-optimized product titles using Hugging Face LLM
 * @param {Object} productData - Product information
 * @returns {Promise<Array>} Array of 5 optimized titles
 */
async function generateTitles(productData) {
  if (!GROQ_API_KEY) {
    throw new Error('Missing GROQ_API_KEY in environment variables');
  }

  const { product_name, category, features, audience, brand } = productData;

  // Build the prompt based on the SEO template
  const systemPrompt = `You are an expert eCommerce SEO specialist. Generate exactly 5 SEO-optimized product titles (one per line, numbered 1-5). Each title should be:
- Clear, concise, and keyword-rich
- SEO-friendly for Amazon/Flipkart
- Under 80 characters
- Engaging and conversion-focused
Do NOT include explanations, just the 5 numbered titles.`;

  const userPrompt = `Product Name: ${product_name}
Category: ${category}
Key Features: ${features}
Target Audience: ${audience}
Brand: ${brand || 'Not specified'}

Generate 5 SEO-optimized product titles:`;

  try {
    const response = await axios.post(
      GROQ_API_URL,
      {
        model: GROQ_MODEL,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        max_tokens: 200,
        temperature: 0.7,
        top_p: 0.9
      },
      {
        headers: {
          Authorization: `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        },
        timeout: 30000
      }
    );

    // Parse response - Groq returns chat completion format
    const generatedText = response.data.choices?.[0]?.message?.content || '';
    const titles = parseTitles(generatedText);

    if (titles.length === 0) {
      throw new Error('No titles generated from LLM response');
    }

    return titles;
  } catch (error) {
    if (error.response?.status === 503) {
      throw new Error('LLM model is loading. Please try again in a moment.');
    }
    
    // Log detailed error information
    const errorDetails = error.response?.data || error.message;
    console.error('Groq API Error Details:', errorDetails);
    
    throw new Error(`LLM API Error: ${error.response?.status || 'Unknown'} - ${JSON.stringify(errorDetails)}`);
  }
}

/**
 * Parse titles from LLM response
 * @param {String} text - Raw text response from LLM
 * @returns {Array} Array of parsed titles
 */
function parseTitles(text) {
  // Remove system prompt and extract only the numbered titles
  const lines = text.split('\n');
  const titles = [];

  for (const line of lines) {
    // Match patterns like "1. Title", "1) Title", "1- Title"
    const match = line.match(/^\d+[\.\)\-]\s*(.+)/);
    if (match && match[1]) {
      const title = match[1].trim();
      // Ensure title is not too long
      if (title.length < 150) {
        titles.push(title);
      }
    }
  }

  return titles.slice(0, 5); // Return only first 5 titles
}

module.exports = {
  generateTitles
};
