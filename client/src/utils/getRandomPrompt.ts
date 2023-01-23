import { surpriseMePrompts } from '../constants';

function getRandomPrompt(prompt: string): string {
  const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);
  const randomPrompt = surpriseMePrompts[randomIndex];

  // ensure we don't get the same random prompt again
  if (randomPrompt === prompt) return getRandomPrompt(prompt);

  return randomPrompt;
}

export default getRandomPrompt;
