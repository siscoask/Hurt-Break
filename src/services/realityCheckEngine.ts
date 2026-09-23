import { RealityCheckAnswers, RealityCheckBreakdown } from '../types';

/**
 * Generates The Breakdown from the 6-step Reality Check session.
 * Built with future AI architecture in mind (returns structured breakdown).
 * Uses careful, dignified, mirror-like language rather than pretending to be a judge.
 */
export function generateBreakdown(answers: RealityCheckAnswers): RealityCheckBreakdown {
  const { story, userAction, theirAction, theirAccusation, userSelfBlame, friendAdvice } = answers;

  const yourPartItems: string[] = [];
  const theirPartItems: string[] = [];
  const bothItems: string[] = [];
  const unclearItems: string[] = [];

  // YOUR PART: Focus on specific behavior they admitted to
  if (userAction.trim().length > 0) {
    yourPartItems.push(
      `From what you've shared, your specific choice to ${userAction.trim().replace(/\.$/, '')} is yours to hold honestly. Owning this gives you your integrity back.`
    );
  } else {
    yourPartItems.push(
      `From what you've shared, any specific words or reactions you chose in heat are yours to own — cleanly, without making them an excuse for the rest.`
    );
  }

  // Check self-blame vs reality
  if (userSelfBlame.trim().length > 0) {
    yourPartItems.push(
      `You are currently carrying: “${userSelfBlame.trim().replace(/\.$/, '')}”. Notice whether this is genuine responsibility for an action, or guilt you picked up because the situation hurt.`
    );
  }

  // THEIR PART: Focus on what the other person did
  if (theirAction.trim().length > 0) {
    theirPartItems.push(
      `Their decision to ${theirAction.trim().replace(/\.$/, '')} was an independent choice made by an adult. That belongs entirely to them.`
    );
  } else {
    theirPartItems.push(
      `Their choices, their emotional withdrawal, or their reactions belong to their agency. You cannot author someone else’s decisions.`
    );
  }

  if (theirAccusation.trim().length > 0) {
    theirPartItems.push(
      `What they accused you of (“${theirAccusation.trim().replace(/\.$/, '')}”) may reflect their own discomfort or deflection. An accusation is not a legal fact.`
    );
  }

  // BOTH: Relational dynamics & friction
  bothItems.push(
    `The communication breakdown and the atmosphere between you two was a shared dance. Misaligned expectations and unspoken hurt rarely happen in a vacuum.`
  );

  if (story.toLowerCase().includes('fight') || story.toLowerCase().includes('argue') || story.toLowerCase().includes('yell')) {
    bothItems.push(
      `Escalation usually takes two participants feeding the cycle. You are responsible for your side of the volume; they are responsible for theirs.`
    );
  } else {
    bothItems.push(
      `The timing, unresolved tension, and emotional fatigue were dynamic forces that both of you were navigating.`
    );
  }

  // UNCLEAR: What cannot honestly be proven from one side
  unclearItems.push(
    `We can't know their secret internal intentions or what they were feeling in their private moments from this alone.`
  );

  if (theirAccusation.trim().length > 0) {
    unclearItems.push(
      `Whether they truly believe “${theirAccusation.trim().slice(0, 80)}” or said it out of fear, guilt, or defense cannot be confirmed from one perspective.`
    );
  }

  unclearItems.push(
    `Whether things could have ended differently if one sentence had changed is impossible to know — do not torturously simulate alternate timelines.`
  );

  // READ THIS AGAIN: Tailored emotional focal statement
  let readThisAgain = 'You can admit where you went wrong without turning yourself into the villain of the whole story.';
  
  if (friendAdvice.trim().length > 20) {
    readThisAgain = `If your best friend wouldn't deserve to be sentenced for this, neither do you. Remember what you told them: “${friendAdvice.trim()}”`;
  } else if (userSelfBlame.toLowerCase().includes('everything') || userSelfBlame.toLowerCase().includes('all')) {
    readThisAgain = 'You were half of a relationship, not the sole architect of its collapse. Own your half. Refuse the other.';
  } else if (theirAccusation.trim().length > 0) {
    readThisAgain = 'Their reaction was their choice. You can take responsibility for your actions without inheriting their blame.';
  }

  const reminderQuote = 'Own what was yours. Let go of what wasn’t.';

  return {
    yourPart: yourPartItems,
    theirPart: theirPartItems,
    both: bothItems,
    unclear: unclearItems,
    readThisAgain,
    reminderQuote
  };
}
