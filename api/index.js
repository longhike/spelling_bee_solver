import express from "express";
import axios from "axios";
import { getLines, solver } from "../utils/index.js";

const router = express.Router();

const DICT_PATH =
  new URL(".", import.meta.url).pathname + "../lib/dictionary.txt";

const DICT_API_URL = "https://api.dictionaryapi.dev/api/v2/entries/en/"


router.post("/api/solve", async (req, res) => {
  const { requiredLetter, otherLetters } = req.body;
  const reader = getLines(DICT_PATH);
  const result = await solver(reader, requiredLetter, otherLetters);
  res.json({
    result,
    required: requiredLetter,
    others: otherLetters,
  });
});

router.get("/api/define", async (req, res) => {
  const { word } = req.query;
  try {
    const { data } = await axios.get(
      DICT_API_URL + word
    );
    const response = {
      word,
      def: [],
    };
    for (let i = 0; i < data.length; i++) {
      data[i].meanings.forEach((m) => {
        const current = {
          partOfSpeech: m.partOfSpeech,
          definitions: m.definitions.map((d) => d.definition),
        };
        response.def.push(current);
      });
    }
    res.json(response);
  } catch (err) {
    res.status(404).json({
        response: "whoops"
    })
  }
});

export default router;
