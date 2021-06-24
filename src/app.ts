import cookieParser from "cookie-parser";

import express from "express";
import routes from "./routes";
import generateDoc from "./utils/swagger";

generateDoc();

const app = express();

// Use cookies
app.use(cookieParser());
// parse requests of content-type - application/json
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// Routes

app.use(routes);

app.get("/", (req, res) => {
  res.redirect("localhost:3000/doc");
});

//Page 404
app.use((req, res, next) => {
  console.log("ROUTE : ", req.originalUrl);
  res.setHeader("Content-Type", "text/plain");
  res.status(404).send("Page introuvable !");
});

//Launching app
app.listen(3000, () => {
  console.log(`API listening at http://localhost:3000`);
});
