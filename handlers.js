import * as readline from "readline";
import * as fs from "fs";

export const getLines = (path) => readline.createInterface({
    input: fs.createReadStream(path)
  });

export const solver = async (reader, required, other) => {
    const result = []
    for await (const word of reader) {
      if (isValid(word, required, other)) {
        result.push(word);
      }
    }
    reader.close();
    return result;
}
  
const isValid = (word, requiredLetter, requiredLetters) => {
    if (word.indexOf(requiredLetter) === -1) return false;
    const combined = requiredLetter + requiredLetters;
    for (let i = 0; i < word.length; i++) {
      if (combined.indexOf(word[i]) === -1) return false;
    }
    return true;
  }