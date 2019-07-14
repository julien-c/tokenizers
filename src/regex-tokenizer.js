// http://www.unicode.org/charts
// http://www.unicode.org/Public/12.0.0/ucd/LineBreak.txt
// https://lucene.apache.org/core/7_5_0/core/org/apache/lucene/analysis/standard/StandardTokenizer.html
const { GREEK_LETTER } = require('./regexs/greek');
const { CYRILLIC_LETTER } = require('./regexs/cyrillic');
const { NKO_DIGIT, NKO_LETTER } = require('./regexs/nko');
const { LATIN_LETTER, LATIN_DIGIT } = require('./regexs/latin');
const DIACRITICAL_MARKS = require('./regexs/diacritical_marks');
const { ARABIC_DIGIT, ARABIC_LETTER } = require('./regexs/arabic');
const { SOUTHEAST_ASIAN_DIGIT, SOUTHEAST_ASIAN_LETTER } = require('./regexs/southeast_asian');
const { CJK_DIGIT, IDEOGRAPHIC_LETTER, JAPANESE_LETTER, KATAKANA_LETTER, HANGUL_LETTER, CJK_ALPHANUM } = require('./regexs/cjk');
// TODO: add more languages

const JAPANESE = `[${JAPANESE_LETTER}]`;
const KATAKANA = `[${KATAKANA_LETTER}]+`;
const IDEOGRAPHIC = `[${IDEOGRAPHIC_LETTER}]`;
const SOUTHEAST_ASIAN = `[${SOUTHEAST_ASIAN_LETTER}]+`;

const DIGIT_REGEX = Object.values({
  LATIN_DIGIT,
  SOUTHEAST_ASIAN_DIGIT,
  ARABIC_DIGIT,
  CJK_DIGIT,
  NKO_DIGIT,
  Bengali_Digits: '\u09e6-\u09ef',
  Malayalam_Digits: '\u0d66-\u0D6F',
}).join('');

const underscore = '\u005F\uFF3F';
const LATIN_REGEX = `${underscore}${DIGIT_REGEX}${LATIN_LETTER}`;

const ALPHANUM = `[${[
  NKO_LETTER,
  LATIN_REGEX,
  CJK_ALPHANUM,
  GREEK_LETTER,
  ARABIC_LETTER,
  HANGUL_LETTER,
  CYRILLIC_LETTER,
  DIACRITICAL_MARKS,
].join('')}]+`;

const alphaNumSource = `${LATIN_LETTER}${DIGIT_REGEX}`;

const singleQuote = '\u0027';
const midNum = '\u066C\uFE50\uFE54\uFF0C\uFF1B';
const midNumLet = '\u002E\u2018\u2019\u2024\uFE52\uFF07\uFF0E';
const midLetter = '\u00B7\u0387\u05F4\u2027\u003A\uFE13\uFE55\uFF1A';
const allMidNumbers = `${singleQuote}${midNum}${midNumLet}`;
const allMidLetters = `${singleQuote}${midLetter}${midNumLet}`;

const NUM_MID_OR_APOSTROPHES = `[${alphaNumSource}]*[${DIGIT_REGEX}](?:[${allMidNumbers}][${DIGIT_REGEX}][${alphaNumSource}]*)+`;
const ALPHA_MID_OR_APOSTROPHES = `[${alphaNumSource}]*[${LATIN_LETTER}](?:[${allMidLetters}][${LATIN_LETTER}][${alphaNumSource}]*)+`;

const TOKENIZER_REGEX = new RegExp(
  [
    NUM_MID_OR_APOSTROPHES,
    ALPHA_MID_OR_APOSTROPHES,
    ALPHANUM,
    JAPANESE,
    KATAKANA,
    IDEOGRAPHIC,
    SOUTHEAST_ASIAN,
  ].join('|'),
  'ug',
);

const LETTER_REGEX = [
  LATIN_LETTER,
  SOUTHEAST_ASIAN_LETTER,
  IDEOGRAPHIC_LETTER,
  JAPANESE_LETTER,
  KATAKANA_LETTER,
  CYRILLIC_LETTER,
  HANGUL_LETTER,
  ARABIC_LETTER,
  GREEK_LETTER,
  NKO_LETTER,
  DIACRITICAL_MARKS,
].join('');

const WHITESPACE_REGEX = '\u0020\u2000-\u200A\u3000';

module.exports = {
  DIGIT_REGEX,
  LETTER_REGEX,
  TOKENIZER_REGEX,
  WHITESPACE_REGEX,
};
