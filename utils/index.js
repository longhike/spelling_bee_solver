import * as readline from "readline";
import * as fs from "fs";

const isValid = (word, requiredLetter, otherLetters) => {
  if (word.indexOf(requiredLetter) === -1) return false;
  const combined = requiredLetter + otherLetters;
  for (let i = 0; i < word.length; i++) {
    if (combined.indexOf(word[i]) === -1) return false;
  }
  return true;
};

const getLines = (path) =>
  readline.createInterface({
    input: fs.createReadStream(path),
  });

const solver = async (reader, required, other) => {
  const result = [];
  for await (const word of reader) {
    if (word.length > 3) {
      if (isValid(word, required, other)) {
        result.push(word);
      }
    }
  }
  result.sort();
  return result;
};

export {
  getLines,
  solver
}

