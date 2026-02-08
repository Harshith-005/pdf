function toSentences(text) {
  return text
    .replace(/\s+/g, ' ')
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 45);
}

function scoreSentence(sentence) {
  const words = sentence.split(' ');
  const uniqueWords = new Set(words.map((w) => w.toLowerCase()));
  return uniqueWords.size + Math.min(words.length, 30) * 0.2;
}

function summarizeIntoFiveBullets(text) {
  const sentences = toSentences(text);
  if (!sentences.length) {
    return ['Could not find enough readable text in this file. Try uploading a clearer PDF.'];
  }

  const ranked = sentences
    .map((sentence) => ({ sentence, score: scoreSentence(sentence) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map((item) => item.sentence);

  return ranked.map((line) => line.replace(/^[-•\d.\s]+/, ''));
}

module.exports = { summarizeIntoFiveBullets };
