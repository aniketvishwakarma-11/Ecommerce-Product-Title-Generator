
# SEO Product Title Generator

Generate AI-powered, SEO-optimized product titles for eCommerce platforms (Amazon, Flipkart, etc.).

## Features

✅ **AI-Powered**: Uses Groq LLM (llama-3.1-8b-instant) for ultra-fast generation  
✅ **SEO-Optimized**: Follows eCommerce best practices for Amazon, Flipkart, etc.  
✅ **Conversion-Focused**: Engaging, keyword-rich, under 80 characters  
✅ **Fast**: <1 second response time with Groq API  
✅ **User-Friendly**: Beautiful, responsive web interface  
✅ **Free**: Uses free Groq API tier (9,000 requests/day)  

## Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript (responsive design)
- **Backend**: Node.js + Express (with validation & error handling)
- **LLM**: Groq API (llama-3.1-8b-instant model)
- **No Database**: Stateless, lightweight, scalable

## About This Project

**SEO Product Title Generator** is a lightweight, AI-powered web application that automatically creates optimized product titles for eCommerce platforms. Using Groq's fast language models, it generates 5 unique, keyword-rich titles under 80 characters—perfect for Amazon, Flipkart, eBay, and other marketplaces.

### The Problem It Solves

- ⏱️ **Time-consuming**: Writing SEO titles manually takes hours for large product catalogs
- 🎯 **Inconsistent**: Different sellers use different formats, missing keywords
- 📊 **Underperforming**: Poor titles = lower search rankings and fewer conversions
- 💰 **Costly**: Hiring copywriters for bulk title creation is expensive

### The Solution

This project uses AI to intelligently analyze product details and generate titles that:
- Include high-value keywords naturally
- Stay within platform character limits (Amazon: 200 chars, most titles <80)
- Use conversion-focused language
- Match marketplace best practices

### How It Works

1. **Input**: User provides product name, category, features, and audience
2. **Analysis**: System extracts keywords and understands product context
3. **Generation**: Groq LLM generates 5 diverse, optimized title variations
4. **Output**: User copies preferred title directly to marketplace

**Performance**: <1 second per request with Groq API

## Architecture & Design

### How It's Built

The project uses a **simple, stateless architecture**:

- **Frontend**: Clean, responsive HTML/CSS/JS form—no frameworks, no build step
- **Backend**: Express.js server that validates input and calls the LLM API
- **LLM Integration**: Groq API with OpenAI-compatible format for reliability
- **No Database**: Titles are generated on-demand; no storage required

### Request Flow

```
User Form Input
    ↓
Frontend Validation
    ↓
POST /api/generate-titles
    ↓
Backend Input Validation
    ↓
Groq API Call (llama-3.1-8b-instant)
    ↓
Parse LLM Response
    ↓
Return 5 Titles
    ↓
Display & Copy to Clipboard
```

### Why Groq?

- **Speed**: <1 second response (other free APIs take 5-10+ seconds)
- **Reliability**: Consistent, predictable responses
- **Cost**: 9,000 free requests/day (perfect for testing & small-scale use)
- **API Format**: OpenAI-compatible (easy to switch providers)

### Project Structure

```
.
├── server/
│   ├── app.js              # Express server & routes
│   └── utils/
│       ├── llmService.js   # LLM API integration
│       └── validator.js    # Input validation
├── public/
│   ├── index.html          # Frontend UI
│   ├── style.css           # Styling
│   └── script.js           # Client-side logic
├── package.json
├── .env.example
└── README.md
```

## API Reference

### POST /api/generate-titles

Generate 5 SEO-optimized product titles (typically <1 second response).

**Request Body:**
```json
{
  "product_name": "Wireless Headphones",
  "category": "Audio",
  "features": "Noise cancellation, 30-hour battery, Bluetooth 5.0",
  "audience": "Music lovers and professionals",
  "brand": "BrewMaster"
}
```

**Successful Response (200 OK):**
```json
{
  "success": true,
  "titles": [
    "Noise Cancelling Wireless Headphones with 30H Battery Life",
    "Bluetooth 5.0 Wireless Headphones for Music Lovers",
    "Long Lasting Noise Cancellation Wireless Headphones",
    "30H Battery Wireless Noise Cancelling Headphones",
    "Wireless Noise Cancelling Headphones with Advanced Bluetooth"
  ],
  "timestamp": "2026-05-01T10:00:00.000Z"
}
```

**Error Response:**
```json
{
  "error": "Failed to generate titles",
  "details": "error message here"
}
```

---
**Built with ❤️ for eCommerce professionals**

---

## 👨‍💻 Author

**Aniket Vishwakarma**
- Student | Full-Stack Developer | Machine Learning Enthusiast

📌 This project is built for learning, real-world application, and academic demonstration.

⭐ If you like this project, don’t forget to star the repository!

## License

MIT