import type { NextApiRequest, NextApiResponse } from 'next';
import openai from '../lib/openai';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { input } = req.body;

      const openaiResponse = await openai.completions.create({
        model: 'text-davinci-003',
        prompt: input,
        max_tokens: 150,
      });

      const message = openaiResponse.choices[0]?.text.trim();
      res.status(200).json({ message: message || 'No response from AI' });
    } catch (error) {
      console.error('Error fetching career advice:', error);
      res.status(500).json({ error: 'Error fetching response.' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed.' });
  }
}
