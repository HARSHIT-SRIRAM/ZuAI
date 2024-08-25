const express = require("express");
const cors = require("cors");
const connectToDatabase = require("./Database/db");
const userRoutes = require("./Routes/usersRoutes");
const postRoutes = require("./Routes/postsRoutes");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

const corsOptions = {
  origin: "https://zu-ai-vlm5.vercel.app" || "http://localhost:3000",
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};

app.use(cors(corsOptions));

let db;

app.use("/users", userRoutes);
app.use("/posts", postRoutes);

const startServer = async () => {
  try {
    db = await connectToDatabase();
    app.locals.db = db;

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error.message);
    process.exit(1);
  }
};

startServer();
