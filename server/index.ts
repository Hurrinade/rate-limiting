import express from "express";
import ratelimiters from "./routes/ratelimiters";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use("/api/v1", ratelimiters);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
