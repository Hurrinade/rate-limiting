import express from "express";
import ratelimiters from "./routes/ratelimiters";

const app = express();
const port = process.env.PORT || 3000;

app.use("/api/v1", ratelimiters);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
