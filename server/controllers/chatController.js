const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.sendMessage = async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        if (!process.env.GEMINI_API_KEY) {
            return res.status(500).json({ error: 'GEMINI_API_KEY is not configured' });
        }

        // For conversational context, we might need to send history.
        // For now, simpler single-turn or we can manage history on client.
        // Let's assume single turn for simplicity or basic chat.
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const result = await model.generateContent(message);
        const response = await result.response;
        const text = response.text();

        res.json({ response: text });
    } catch (error) {
        console.error('Gemini Chat Error:', error);
        res.status(500).json({ error: 'Failed to generate response' });
    }
};
