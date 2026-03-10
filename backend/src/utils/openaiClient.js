const OpenAI = require('openai');

let openaiInstance;

const getOpenAIClient = () => {
  if (!openaiInstance) {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error('OPENAI_API_KEY is not set in environment variables');
    }

    openaiInstance = new OpenAI({
      apiKey
    });
  }

  return openaiInstance;
};

module.exports = getOpenAIClient;

