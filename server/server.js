import express from "express";
import getCities from "./routes/getCities.js";
import getCity from "./routes/getCity.js";
import bodyParser from "body-parser";

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(express.static("public"));

// Rotas do servidor
app.use("/scrape", getCities);
app.use("/scrape", getCity);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
