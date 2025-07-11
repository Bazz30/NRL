const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = 5000;

app.use(bodyParser.json());

app.post('/api/lineup-advice', async (req, res) => {
  const { teamData } = req.body;

  const prompt = `
You are an expert in NRL Fantasy. Your task is to optimise the user's team for this round by:
- Setting the best possible starting 13
- Selecting a bench for looping and AE (auto emergency) exploitation
- Noting which players are unavailable or risky
Here is the team data:
${JSON.stringify(teamData, null, 2)}
Please return a structured lineup suggestion, with bench usage notes and reasoning.
`;

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4',
        messages: [
          { role: 'system', content: 'You are a helpful NRL Fantasy expert.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const reply = response.data.choices[0].message.content;
    res.json({ advice: reply });
  } catch (error) {
    console.error('OpenAI error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to get advice from GPT.' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
