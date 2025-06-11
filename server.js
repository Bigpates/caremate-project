require('dotenv').config();
const express = require('express');
const OpenAI = require('openai');
const cors = require('cors');

const app = express();
// Allow overriding the server port via environment variable
const port = process.env.PORT || 3001;

const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',')
  : ['http://localhost:3000'];

app.use(cors({ origin: allowedOrigins }));
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post('/api/chat', async (req, res) => {
  try {
    const { messages, role, language, tone } = req.body; // Destructure additional fields

    if (!messages) {
      return res.status(400).json({ error: 'Messages are required' });
    }

    // --- NEW: Dynamic System Prompt based on role, tone and language ---
    const systemPrompt = `You are Care Mate, a professional, supportive, and rights-based AI assistant for the Australian NDIS.
    You are currently assisting a user with the role of: ${role || 'Participant'}. You MUST tailor your tone, guidance, and language for this specific role. For Participants, use simpler language and an encouraging tone. For Support Coordinators and Plan Managers, use more professional and technical language.
    Respond in ${language || 'English (Australia)'} using a ${tone || 'Standard'} tone.
    Your job is to: Explain NDIS plans, generate structured documentation, suggest goals and services, and translate complex terms into plain language.
    Always respect participant rights, choice, and control. Never give medical advice. If you are unsure about something, say so and suggest how the user can find official clarification. Default to empathy and helpfulness.`;
    
    const messagesWithSystemPrompt = [
      { role: 'system', content: systemPrompt },
      ...messages
    ];

    const stream = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: messagesWithSystemPrompt,
      stream: true,
    });

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || '';
      if (content) {
        res.write(`data: ${JSON.stringify({ content })}\n\n`);
      }
    }
    res.end();

  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    res.status(500).json({ error: 'Failed to call OpenAI API' });
  }
});

app.listen(port, () => {
  console.log(`Care Mate backend server listening on http://localhost:${port}`);
});
