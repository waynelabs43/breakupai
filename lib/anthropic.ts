import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export interface Analysis {
  powerDynamic: {
    youHavePower: boolean;
    percentage: number;
    explanation: string;
  };
  situationScore: number;
  verdict: 'reach_out' | 'move_on' | 'wait';
  verdictExplanation: string;
  whatToSay: string;
  keyInsights: string[];
  redFlags: string[];
  greenFlags: string[];
}

export async function analyzeConversation(conversation: string): Promise<Analysis> {
  const prompt = `You are a brutally honest relationship analyst. Analyze this text conversation and return a JSON object.

CONVERSATION:
${conversation}

Return ONLY valid JSON in this exact format:
{
  "powerDynamic": {
    "youHavePower": true or false (does the person who shared this have more power/leverage),
    "percentage": number 0-100 (how much power the sharer has),
    "explanation": "1-2 sentence explanation of the power dynamic"
  },
  "situationScore": number 1-10 (how good the situation looks for the sharer, 10 = great, 1 = walk away),
  "verdict": "reach_out" or "move_on" or "wait",
  "verdictExplanation": "2-3 sentences explaining the verdict clearly and directly",
  "whatToSay": "The exact message they should send IF the verdict is reach_out. If move_on or wait, explain what NOT to say or do instead.",
  "keyInsights": ["insight 1", "insight 2", "insight 3"] (3-4 key observations about the dynamic),
  "redFlags": ["flag 1", "flag 2"] (concerning patterns, can be empty array),
  "greenFlags": ["flag 1", "flag 2"] (positive signs, can be empty array)
}

Be direct, honest, and specific. No fluff. Your job is to help them see reality clearly.`;

  const message = await client.messages.create({
    model: 'claude-opus-4-5',
    max_tokens: 1024,
    messages: [{ role: 'user', content: prompt }],
  });

  const raw = (message.content[0] as { text: string }).text;
  const jsonMatch = raw.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error('Failed to parse analysis response');

  return JSON.parse(jsonMatch[0]) as Analysis;
}
