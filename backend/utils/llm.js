const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

//const GROQ_API_KEY = process.env.GROQ_API_KEY;

const askLLM = async (prompt) => {
  try {
    const res = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama3-8b-8192",
        messages: [{ role: "user", content: prompt }],
      },
      {
        headers: {
          "Content-Type": "application/json",
          //Authorization: `Bearer ${GROQ_API_KEY}`,
        },
      }
    );

    return res.data.choices[0].message.content.trim();
  } catch (error) {
    console.error("LLM API Error:", error.response?.data || error.message);
    return "Sorry, I'm having trouble thinking right now.";
  }
};

module.exports = askLLM;
