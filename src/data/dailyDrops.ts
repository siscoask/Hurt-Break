import { DailyReminder } from '../types';

export const DAILY_DROPS: DailyReminder[] = [
  {
    id: 'drop-1',
    text: 'You can own your mistake without carrying theirs.',
    subtext: 'Responsibility has edges. Know where yours ends.'
  },
  {
    id: 'drop-2',
    text: 'Feeling guilty doesn\'t automatically mean you\'re guilty.',
    subtext: 'Your nervous system feels the fracture, not just the cause.'
  },
  {
    id: 'drop-3',
    text: 'You don\'t have to hate someone to stop choosing them.',
    subtext: 'Walking away can be an act of quiet self-preservation.'
  },
  {
    id: 'drop-4',
    text: 'Your mistake does not erase theirs.',
    subtext: 'Two realities can exist without canceling each other.'
  },
  {
    id: 'drop-5',
    text: 'Missing someone doesn\'t mean you should return to them.',
    subtext: 'Longing is just memory adjusting to the quiet.'
  },
  {
    id: 'drop-6',
    text: 'You can regret your reaction without taking responsibility for their choice.',
    subtext: 'They chose their response as an adult. So did you.'
  },
  {
    id: 'drop-7',
    text: 'Sometimes moving on starts with admitting that you were never responsible for fixing everything.',
    subtext: 'You were a partner, not a construction project.'
  },
  {
    id: 'drop-8',
    text: 'You don\'t need to prove you\'re a good person to someone committed to misunderstanding you.',
    subtext: 'Save the energy you use defending yourself.'
  },
  {
    id: 'drop-9',
    text: 'Being imperfect doesn\'t mean you deserved mistreatment.',
    subtext: 'Basic respect is not a performance prize.'
  },
  {
    id: 'drop-10',
    text: 'Closure is an internal settlement, not a conversation with them.',
    subtext: 'Their silence is an answer. Take it and go.'
  },
  {
    id: 'drop-11',
    text: 'You are allowed to remember someone without returning to them.',
    subtext: 'Respect the chapter without reopening the book.'
  },
  {
    id: 'drop-12',
    text: 'Their anger isn\'t automatic proof you\'re wrong.',
    subtext: 'Volume does not make an accusation true.'
  },
  {
    id: 'drop-13',
    text: 'You can admit where you went wrong without making everything your fault.',
    subtext: 'Be fair to yourself. Even in your regret.'
  },
  {
    id: 'drop-14',
    text: 'A boundary isn\'t controlling. It is the cost of your presence.',
    subtext: 'People who enjoyed your lack of limits will call it cold.'
  },
  {
    id: 'drop-15',
    text: 'Regret and responsibility are different things.',
    subtext: 'Grief is sorrow for what happened. Guilt is answering for the crime.'
  },
  {
    id: 'drop-16',
    text: 'You don\'t have to become the villain just because the relationship needed one.',
    subtext: 'Let them write their script. Keep your integrity.'
  },
  {
    id: 'drop-17',
    text: 'You are allowed to move on without getting the perfect explanation.',
    subtext: 'Some puzzles were never meant to be solved.'
  },
  {
    id: 'drop-18',
    text: 'Do not text them to cure the silence they deliberately created.',
    subtext: 'Give the silence back to them.'
  },
  {
    id: 'drop-19',
    text: 'You can be sad and relieved at the exact same time.',
    subtext: 'Grief and peace are not enemies.'
  },
  {
    id: 'drop-20',
    text: 'You don\'t have to figure everything out tonight.',
    subtext: 'Just go to sleep with clean hands.'
  },
  {
    id: 'drop-21',
    text: 'Crying over someone doesn\'t mean they were right for you.',
    subtext: 'Tears measure love and loss, not compatibility.'
  },
  {
    id: 'drop-22',
    text: 'Stop asking what you could have done differently to make a brick softer.',
    subtext: 'Some people were never ready to handle tenderness.'
  },
  {
    id: 'drop-23',
    text: 'Your worth was not negotiated when they decided to walk away.',
    subtext: 'Their departure is their narrative, not your price tag.'
  },
  {
    id: 'drop-24',
    text: 'Forgiving yourself is harder than forgiving them. Start there.',
    subtext: 'You did what you knew how to do with the tools you had.'
  },
  {
    id: 'drop-25',
    text: 'Peace is not the absence of memory. It is the absence of blame.',
    subtext: 'Notice the memory, put down the shame.'
  },
  {
    id: 'drop-26',
    text: 'You are allowed to grieve the person they pretended to be.',
    subtext: 'It is okay to mourn the illusion without inviting it back.'
  },
  {
    id: 'drop-27',
    text: 'When someone shows you they cannot protect your feelings, believe them.',
    subtext: 'Repetition is clarity.'
  },
  {
    id: 'drop-28',
    text: 'The best apology you will ever give is changed behavior to yourself.',
    subtext: 'Never abandon your own instincts again.'
  },
  {
    id: 'drop-29',
    text: 'You didn\'t lose the best thing that ever happened to you. You survived the hardest.',
    subtext: 'Look at the ground you\'ve gained.'
  },
  {
    id: 'drop-30',
    text: 'I know what was mine. I\'m not carrying the rest.',
    subtext: 'Say it out loud before you rest.'
  },
  {
    id: 'drop-31',
    text: 'One day you will look back and be glad you didn\'t beg for what should have been given freely.',
    subtext: 'Dignity is a quiet reward.'
  }
];

export function getTodayDrop(): DailyReminder {
  const now = new Date();
  const dayOfYear = Math.floor(
    (now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24
  );
  const index = Math.abs(dayOfYear) % DAILY_DROPS.length;
  return DAILY_DROPS[index];
}
