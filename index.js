import { URL } from "url";
import { getLines, solver } from "./handlers.js";
import express from "express";

const app = express();

const PORT = process.env.PORT || 3000;

const viewPath = new URL(".", import.meta.url).pathname + "public/index.html";
const dictPath = new URL(".", import.meta.url).pathname + "lib/dictionary.txt";

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(viewPath);
});

app.post("/api/solve", async (req, res) => {
  const { requiredLetter, otherLetters } = req.body;    
  const reader = getLines(dictPath);
  const result = await solver(reader, requiredLetter, otherLetters);
  res.json(result);
});

app.listen(PORT, () => console.log("listening on " + PORT));


