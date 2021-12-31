import { URL } from "url";
import express from "express";
import router from "./api/index.js"

const app = express();

const PORT = process.env.PORT || 3000;

const VIEW_PATH = new URL(".", import.meta.url).pathname + "public/index.html";

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(VIEW_PATH);
});

app.use(router)


app.listen(PORT, () => console.log("listening on " + PORT));


