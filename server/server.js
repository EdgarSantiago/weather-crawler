import express from "express";
import searchCity from "./routes/searchCity.js";
import getCity from "./routes/getCity.js";
import bodyParser from "body-parser";

const app = express();
const port = process.env.PORT || 5000;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(bodyParser.json());
app.use(express.static("public"));

// Rotas do servidor
app.use("/scrape", searchCity);
app.use("/scrape", getCity);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
