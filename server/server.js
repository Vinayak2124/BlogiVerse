import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./config/db.js";
import adminRouter from "./routes/routes.js";
import blogRouter from "./routes/blogRoutes.js";

const app = express();

await connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.send("API is working..!");
});

app.use("/api/admin", adminRouter)
app.use("/api/blog", blogRouter)


const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
export default app;
